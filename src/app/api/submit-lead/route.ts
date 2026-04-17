import { NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Risk scoring
// ---------------------------------------------------------------------------
const HIGH_RISK_CASES = [
  "code generation",
  "workflow automation",
  "data analysis",
];
const MEDIUM_RISK_CASES = [
  "customer support",
  "content generation",
  "document processing",
];
const TECHNICAL_ROLES = [
  "cto",
  "vp engineering",
  "cto/vp engineering",
  "engineering manager",
  "solutions architect",
  "vp product",
];
const EXECUTIVE_ROLES = ["ceo", "founder", "ceo/founder", "vp sales"];

function calcRiskScore(role: string, aiUseCase: string): number {
  let score = 50;
  const uc = aiUseCase.toLowerCase();
  const r = role.toLowerCase();

  if (HIGH_RISK_CASES.some((k) => uc.includes(k))) score += 30;
  else if (MEDIUM_RISK_CASES.some((k) => uc.includes(k))) score += 15;

  if (TECHNICAL_ROLES.some((k) => r.includes(k))) score += 20;
  else if (EXECUTIVE_ROLES.some((k) => r.includes(k))) score += 10;

  return Math.min(score, 100);
}

// ---------------------------------------------------------------------------
// Simple in-memory rate limiter (resets on cold start — good enough for edge)
// ---------------------------------------------------------------------------
const emailHits = new Map<string, { count: number; resetAt: number }>();
const ipHits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(
  key: string,
  store: Map<string, { count: number; resetAt: number }>,
  limit: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const entry = store.get(key);
  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

// ---------------------------------------------------------------------------
// CORS helpers
// ---------------------------------------------------------------------------
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

// ---------------------------------------------------------------------------
// POST /api/submit-lead
// ---------------------------------------------------------------------------
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      firstName?: string;
      lastName?: string;
      email?: string;
      company?: string;
      role?: string;
      aiUseCase?: string;
      hearAboutUs?: string;
      currency?: string;
      additionalDetails?: string;
      phone?: string;
    };

    // -- Validate required fields ------------------------------------------
    const firstName = (body.firstName ?? "").trim();
    const email = (body.email ?? "").trim().toLowerCase();
    const company = (body.company ?? "").trim();

    // -- Rate limiting -----------------------------------------------------
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";
    if (!checkRateLimit(email, emailHits, 5, 24 * 60 * 60 * 1000)) {
      console.warn(`[SECURITY] Email rate limit hit: ${email}`);
      return NextResponse.json(
        { success: false, message: "You've already submitted a request. We'll be in touch within 24 hours." },
        { status: 429, headers: corsHeaders() }
      );
    }
    if (!checkRateLimit(ip, ipHits, 20, 60 * 60 * 1000)) {
      console.warn(`[SECURITY] IP rate limit hit: ${ip}`);
      return NextResponse.json(
        { success: false, message: "Too many requests. Please try again later." },
        { status: 429, headers: corsHeaders() }
      );
    }

    if (!firstName) {
      return NextResponse.json(
        { success: false, message: "First name is required." },
        { status: 400, headers: corsHeaders() }
      );
    }
    // Structural email check — O(n), immune to ReDoS (no backtracking quantifiers).
    // Equivalent to the original regex without the polynomial backtracking risk.
    const atIdx = email.indexOf("@");
    const validEmailShape =
      atIdx > 0 &&
      atIdx === email.lastIndexOf("@") &&
      email.indexOf(".", atIdx) > atIdx + 1 &&
      !email.endsWith(".") &&
      !/\s/.test(email);
    if (!email || !validEmailShape) {
      return NextResponse.json(
        { success: false, message: "A valid email is required." },
        { status: 400, headers: corsHeaders() }
      );
    }
    if (!company) {
      return NextResponse.json(
        { success: false, message: "Company is required." },
        { status: 400, headers: corsHeaders() }
      );
    }

    const lastName = (body.lastName ?? "").trim();
    const role = (body.role ?? "").trim();
    const aiUseCase = (body.aiUseCase ?? "").trim();
    const hearAboutUs = (body.hearAboutUs ?? "").trim();
    const additionalDetails = (body.additionalDetails ?? "").trim();
    const phone = (body.phone ?? "").trim();

    const riskScore = calcRiskScore(role, aiUseCase);
    const name = [firstName, lastName].filter(Boolean).join(" ");

    // -- Supabase service-role insert into leads table ----------------------
    const supabaseUrl =
      process.env.SUPABASE_URL ??
      process.env.VITE_SUPABASE_URL ??
      process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ??
      process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

    let leadId: string | undefined;

    if (supabaseUrl && serviceKey) {
      const leadPayload = {
        name,
        email,
        company,
        phone,
        industry: "",
        ai_tools: aiUseCase,
        stage: "New",
        value: 0,
        risk_score: riskScore,
        source: "priority_access",
        notes: additionalDetails,
        log: [
          {
            action: "Priority access form submitted",
            time: new Date().toISOString(),
            color: "#0ea5e9",
            detail: `Role: ${role || "—"} | How heard: ${hearAboutUs || "—"}`,
          },
        ],
      };

      const insertRes = await fetch(`${supabaseUrl}/rest/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify(leadPayload),
      });

      if (insertRes.ok) {
        const rows = (await insertRes.json()) as { id?: string }[];
        leadId = rows?.[0]?.id;
      } else {
        const errText = await insertRes.text();
        console.error("Supabase leads insert error:", insertRes.status, errText);
        // Non-fatal — continue to send email
      }
    } else {
      console.warn("Supabase service role key not configured — skipping leads insert.");
    }

    // -- Send confirmation email to user via Brevo --------------------------
    const brevoKey =
      process.env.BREVO_API_KEY ??
      process.env.VITE_BREVO_API_KEY;
    const fromEmail =
      process.env.VITE_BREVO_FROM_EMAIL ?? "company@atlassynapseai.com";
    const fromName =
      process.env.VITE_BREVO_FROM_NAME ?? "Atlas Synapse";

    if (brevoKey) {
      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1.0" />
<title>Priority Access Request Received</title>
</head>
<body style="margin:0;padding:0;background-color:#0A0E17;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0A0E17;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="580" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;width:100%;">

          <!-- HEADER GRADIENT CARD -->
          <tr>
            <td style="border-radius:20px 20px 0 0;background:linear-gradient(135deg,#2D1B69 0%,#1C1658 40%,#0F0B3A 100%);padding:48px 40px 36px;text-align:center;">
              <!-- Logo -->
              <img src="https://atlassynapseai.com/logo.png" alt="Atlas Synapse" width="64" height="64" style="display:block;margin:0 auto 20px;border-radius:14px;" />
              <h1 style="margin:0 0 6px;font-size:30px;font-weight:900;color:#FFFFFF;letter-spacing:-0.5px;line-height:1.2;">
                You&rsquo;re in the queue,<br /><span style="color:#A78BFA;">${firstName}.</span>
              </h1>
              <p style="margin:12px 0 0;font-size:14px;color:#C4B5FD;letter-spacing:0.5px;text-transform:uppercase;font-weight:600;">
                Priority Access &mdash; Atlas Synapse
              </p>
            </td>
          </tr>

          <!-- ACCENT BAR -->
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,#818CF8,#A78BFA,#C4B5FD,#818CF8);"></td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background-color:#12103A;padding:36px 40px;">

              <!-- Message -->
              <p style="margin:0 0 24px;font-size:16px;line-height:1.7;color:#D4C9F0;">
                Thanks for applying — we&rsquo;re reviewing priority access on a rolling basis and will reach out within
                <strong style="color:#FFFFFF;background-color:#2D1B69;padding:2px 8px;border-radius:6px;">24 hours</strong>
                to schedule a quick call.
              </p>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0;">
                <tr><td style="height:1px;background-color:#2D2566;"></td></tr>
              </table>

              <!-- Details heading -->
              <p style="margin:0 0 16px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#6D63B0;">
                Your Submission
              </p>

              <!-- Details table -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:10px 14px;background-color:#1A1750;border-radius:10px 10px 0 0;border-bottom:1px solid #2D2566;">
                    <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#818CF8;">Name</span><br />
                    <span style="font-size:15px;color:#FFFFFF;font-weight:600;">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;background-color:#1A1750;border-bottom:1px solid #2D2566;">
                    <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#818CF8;">Company</span><br />
                    <span style="font-size:15px;color:#FFFFFF;font-weight:600;">${company}</span>
                  </td>
                </tr>
                ${role ? `<tr>
                  <td style="padding:10px 14px;background-color:#1A1750;border-bottom:1px solid #2D2566;">
                    <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#818CF8;">Role</span><br />
                    <span style="font-size:15px;color:#FFFFFF;font-weight:600;">${role}</span>
                  </td>
                </tr>` : ""}
                ${aiUseCase ? `<tr>
                  <td style="padding:10px 14px;background-color:#1A1750;border-radius:0 0 10px 10px;">
                    <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#818CF8;">Use Case</span><br />
                    <span style="font-size:15px;color:#FFFFFF;font-weight:600;">${aiUseCase}</span>
                  </td>
                </tr>` : ""}
              </table>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0;">
                <tr><td style="height:1px;background-color:#2D2566;"></td></tr>
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <a href="https://atlassynapseai.com" style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#2D1B69,#818CF8);color:#FFFFFF;font-size:15px;font-weight:700;text-decoration:none;border-radius:12px;letter-spacing:0.3px;">
                      Visit Atlas Synapse &rarr;
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#0D0B2A;border-radius:0 0 20px 20px;padding:20px 40px;text-align:center;border-top:1px solid #1E1B4B;">
              <p style="margin:0;font-size:12px;color:#4B4680;">
                Atlas Synapse LLC &nbsp;&middot;&nbsp;
                <a href="https://atlassynapseai.com" style="color:#6D63B0;text-decoration:none;">atlassynapseai.com</a>
                &nbsp;&middot;&nbsp;
                <a href="https://atlassynapseai.com/privacy" style="color:#6D63B0;text-decoration:none;">Privacy Policy</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();

      const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key": brevoKey,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: { name: fromName, email: fromEmail },
          to: [{ email, name }],
          subject: "Priority Access Request Received - Atlas Synapse",
          htmlContent,
        }),
      });

      if (!emailRes.ok) {
        const err = await emailRes.text();
        console.error("Brevo confirmation email error:", emailRes.status, err);
        // Non-fatal
      }
    } else {
      console.warn("Brevo API key not configured — skipping confirmation email.");
    }

    return NextResponse.json(
      { success: true, message: "Lead created successfully.", leadId, riskScore },
      { status: 200, headers: corsHeaders() }
    );
  } catch (error) {
    console.error("submit-lead error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process request." },
      { status: 500, headers: corsHeaders() }
    );
  }
}
