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
    };

    // -- Validate required fields ------------------------------------------
    const firstName = (body.firstName ?? "").trim();
    const email = (body.email ?? "").trim().toLowerCase();
    const company = (body.company ?? "").trim();

    if (!firstName) {
      return NextResponse.json(
        { success: false, message: "First name is required." },
        { status: 400, headers: corsHeaders() }
      );
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
        phone: "",
        industry: "",
        ai_tools: aiUseCase,
        stage: "New",
        value: 0,
        risk_score: riskScore,
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
      const htmlContent = `
<!DOCTYPE html>
<html>
<body style="font-family:Inter,sans-serif;background:#0A0E17;color:#E8D5F5;margin:0;padding:40px 20px;">
  <div style="max-width:560px;margin:0 auto;background:#1C1658;border-radius:16px;padding:40px;border:1px solid rgba(255,255,255,0.08);">
    <h2 style="font-size:24px;font-weight:800;margin:0 0 8px;color:#fff;">
      You&rsquo;re in the queue, ${firstName}.
    </h2>
    <p style="color:#A78BFA;font-size:15px;margin:0 0 24px;">
      Priority Access Request Received &mdash; Atlas Synapse
    </p>
    <p style="font-size:15px;line-height:1.6;color:#E8D5F5/80;margin:0 0 16px;">
      We received your request and are reviewing applications on a rolling basis. We'll reach out within <strong style="color:#fff;">24 hours</strong> to schedule a quick call.
    </p>
    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:24px 0;" />
    <table style="width:100%;font-size:14px;border-collapse:collapse;">
      <tr><td style="padding:6px 0;color:#A78BFA;width:120px;">Name</td><td style="color:#fff;">${name}</td></tr>
      <tr><td style="padding:6px 0;color:#A78BFA;">Company</td><td style="color:#fff;">${company}</td></tr>
      ${role ? `<tr><td style="padding:6px 0;color:#A78BFA;">Role</td><td style="color:#fff;">${role}</td></tr>` : ""}
      ${aiUseCase ? `<tr><td style="padding:6px 0;color:#A78BFA;">Use Case</td><td style="color:#fff;">${aiUseCase}</td></tr>` : ""}
    </table>
    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:24px 0;" />
    <p style="font-size:13px;color:rgba(232,213,245,0.4);margin:0;">
      Atlas Synapse LLC &middot; <a href="https://atlassynapseai.com" style="color:#A78BFA;text-decoration:none;">atlassynapseai.com</a>
    </p>
  </div>
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
