import { NextResponse } from "next/server";

function buildConfirmationEmail(name: string, email: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're on the Atlas Synapse Waitlist!</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(129,140,248,0.5); }
      50%       { box-shadow: 0 0 0 18px rgba(129,140,248,0); }
    }
    @keyframes shimmer {
      0%   { background-position: -400px 0; }
      100% { background-position: 400px 0; }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }

    body {
      margin: 0; padding: 0;
      background-color: #0B0A1E;
      font-family: 'Inter', Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 16px;
      animation: fadeInDown 0.6s ease both;
    }
    .card {
      background: linear-gradient(160deg, #1C1658 0%, #0F0C2E 100%);
      border-radius: 20px;
      overflow: hidden;
      border: 1px solid rgba(129,140,248,0.15);
      box-shadow: 0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06);
    }

    /* ── Header ── */
    .header {
      background: linear-gradient(135deg, #2D1B69 0%, #1C1658 50%, #0F0C2E 100%);
      padding: 40px 40px 32px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .header::before {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(ellipse at 50% 0%, rgba(129,140,248,0.18) 0%, transparent 70%);
      pointer-events: none;
    }
    .header-ring {
      position: absolute;
      width: 300px; height: 300px;
      border-radius: 50%;
      border: 1px solid rgba(129,140,248,0.12);
      top: -120px; left: 50%;
      transform: translateX(-50%);
      animation: spin 20s linear infinite;
    }
    .logo-wrap {
      display: inline-block;
      margin-bottom: 20px;
      animation: fadeInDown 0.7s 0.1s ease both;
    }
    .logo-wrap img {
      height: 52px;
      width: auto;
      display: block;
    }
    .header h1 {
      margin: 0 0 8px;
      font-size: 26px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.5px;
      line-height: 1.2;
      animation: fadeInDown 0.7s 0.2s ease both;
    }
    .header p {
      margin: 0;
      font-size: 15px;
      color: rgba(232,213,245,0.65);
      animation: fadeInDown 0.7s 0.3s ease both;
    }

    /* ── Check badge ── */
    .check-wrap {
      text-align: center;
      padding: 36px 40px 0;
      animation: fadeInUp 0.6s 0.3s ease both;
    }
    .check-circle {
      display: inline-flex;
      align-items: center; justify-content: center;
      width: 72px; height: 72px;
      border-radius: 50%;
      background: linear-gradient(135deg, #4F46E5, #818CF8);
      box-shadow: 0 8px 32px rgba(129,140,248,0.35);
      animation: pulse 2.4s 1s ease-in-out infinite;
    }
    .check-circle svg { display: block; }

    /* ── Body ── */
    .body {
      padding: 28px 40px 36px;
      animation: fadeInUp 0.6s 0.4s ease both;
    }
    .greeting {
      font-size: 20px;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 12px;
    }
    .body-text {
      font-size: 15px;
      line-height: 1.7;
      color: rgba(232,213,245,0.7);
      margin: 0 0 28px;
    }

    /* ── Detail card ── */
    .detail-card {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(129,140,248,0.15);
      border-radius: 12px;
      padding: 20px 24px;
      margin-bottom: 28px;
    }
    .detail-card table { width: 100%; border-collapse: collapse; }
    .detail-card td {
      padding: 7px 0;
      font-size: 14px;
      vertical-align: top;
    }
    .detail-card td:first-child {
      color: rgba(129,140,248,0.9);
      font-weight: 600;
      width: 80px;
      padding-right: 12px;
    }
    .detail-card td:last-child {
      color: rgba(232,213,245,0.85);
    }

    /* ── What's next ── */
    .steps-title {
      font-size: 13px;
      font-weight: 700;
      color: rgba(129,140,248,0.8);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin: 0 0 14px;
    }
    .steps { list-style: none; margin: 0 0 32px; padding: 0; }
    .steps li {
      display: flex; align-items: flex-start; gap: 12px;
      font-size: 14px; line-height: 1.6;
      color: rgba(232,213,245,0.7);
      margin-bottom: 10px;
    }
    .step-dot {
      flex-shrink: 0;
      width: 22px; height: 22px;
      border-radius: 50%;
      background: linear-gradient(135deg, #2D1B69, #4F46E5);
      border: 1px solid rgba(129,140,248,0.3);
      font-size: 11px; font-weight: 700;
      color: #818CF8;
      display: flex; align-items: center; justify-content: center;
      margin-top: 1px;
    }

    /* ── CTA ── */
    .cta-wrap { text-align: center; margin-bottom: 32px; }
    .cta-btn {
      display: inline-block;
      padding: 14px 40px;
      background: linear-gradient(135deg, #2D1B69, #818CF8);
      color: #ffffff !important;
      font-size: 15px; font-weight: 700;
      text-decoration: none;
      border-radius: 10px;
      box-shadow: 0 6px 24px rgba(129,140,248,0.3);
      letter-spacing: 0.2px;
    }

    /* ── Shimmer divider ── */
    .shimmer-line {
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, rgba(129,140,248,0.5) 50%, transparent 100%);
      background-size: 400px 1px;
      animation: shimmer 2.5s linear infinite;
      margin-bottom: 24px;
    }

    /* ── Footer ── */
    .footer {
      text-align: center;
      padding: 0 40px 36px;
    }
    .footer p {
      font-size: 12px;
      color: rgba(232,213,245,0.3);
      margin: 4px 0;
      line-height: 1.6;
    }
    .footer a { color: rgba(129,140,248,0.6); text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">

      <!-- Header -->
      <div class="header">
        <div class="header-ring"></div>
        <div class="logo-wrap">
          <img src="https://atlassynapseai.com/logo.png" alt="Atlas Synapse" />
        </div>
        <h1>You're on the waitlist 🎉</h1>
        <p>We'll be in touch the moment your spot opens.</p>
      </div>

      <!-- Check badge -->
      <div class="check-wrap">
        <div class="check-circle">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M8 16.5 L13.5 22 L24 11" stroke="#ffffff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <!-- Body -->
      <div class="body">
        <p class="greeting">Hey ${name},</p>
        <p class="body-text">
          Thanks for joining the Atlas Synapse waitlist! We're building the AI observability platform
          that helps teams monitor, audit, and optimise every AI agent and LLM call in their stack.
          You're in early — that means you'll be among the first to get access.
        </p>

        <!-- Detail card -->
        <div class="detail-card">
          <table>
            <tr>
              <td>Name</td>
              <td>${name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>${email}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td><span style="color:#818CF8;font-weight:700;">&#10003; Confirmed</span></td>
            </tr>
          </table>
        </div>

        <!-- What's next -->
        <p class="steps-title">What happens next</p>
        <ul class="steps">
          <li>
            <span class="step-dot">1</span>
            <span>We review applications in batches — you'll hear from us within a few days.</span>
          </li>
          <li>
            <span class="step-dot">2</span>
            <span>Founding beta members get hands-on onboarding, priority support, and locked-in pricing.</span>
          </li>
          <li>
            <span class="step-dot">3</span>
            <span>Want to jump the queue? Request priority access for a faster review.</span>
          </li>
        </ul>

        <!-- CTA -->
        <div class="cta-wrap">
          <a href="https://atlassynapseai.com/priority-access" class="cta-btn">Request Priority Access</a>
        </div>

        <div class="shimmer-line"></div>

        <!-- Footer text -->
        <div class="footer">
          <p>Atlas Synapse &mdash; AI Observability Platform</p>
          <p><a href="https://atlassynapseai.com">atlassynapseai.com</a></p>
          <p style="margin-top:10px;">You're receiving this because you signed up at atlassynapseai.com.<br/>
          If this wasn't you, you can safely ignore this email.</p>
        </div>
      </div>

    </div>
  </div>
</body>
</html>`;
}

async function sendEmail(to: { email: string; name: string }[], subject: string, html: string): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn("BREVO_API_KEY not set — skipping email");
    return;
  }
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Atlas Synapse", email: "company@atlassynapseai.com" },
      to,
      subject,
      htmlContent: html,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error("Brevo email error:", res.status, err);
  }
}

function buildInternalNotification(name: string, email: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>New Waitlist Signup</title>
</head>
<body style="margin:0;padding:0;background-color:#0B0A1E;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0B0A1E;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="580" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="border-radius:20px 20px 0 0;background:linear-gradient(135deg,#2D1B69 0%,#1C1658 50%,#0F0B3A 100%);padding:36px 40px 28px;text-align:center;">
              <img src="https://atlassynapseai.com/logo.png" alt="Atlas Synapse" width="56" height="56" style="display:block;margin:0 auto 16px;border-radius:12px;" />
              <h1 style="margin:0 0 6px;font-size:22px;font-weight:800;color:#FFFFFF;letter-spacing:-0.3px;">New Waitlist Signup</h1>
              <p style="margin:0;font-size:13px;color:#A78BFA;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;">Atlas Synapse CRM Alert</p>
            </td>
          </tr>

          <!-- ACCENT BAR -->
          <tr>
            <td style="height:3px;background:linear-gradient(90deg,#818CF8,#A78BFA,#C4B5FD,#818CF8);"></td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background-color:#12103A;padding:32px 40px;">

              <!-- Alert badge -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                <tr>
                  <td style="background:rgba(129,140,248,0.12);border:1px solid rgba(129,140,248,0.3);border-radius:20px;padding:6px 16px;">
                    <span style="font-size:13px;font-weight:700;color:#818CF8;">&#128276; Someone just joined the waitlist</span>
                  </td>
                </tr>
              </table>

              <!-- Details table -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-radius:12px;overflow:hidden;border:1px solid #2D2566;margin-bottom:28px;">
                <tr>
                  <td style="padding:10px 16px;background-color:#1A1750;border-bottom:1px solid #2D2566;vertical-align:top;width:130px;">
                    <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#818CF8;">Name</span>
                  </td>
                  <td style="padding:10px 16px;background-color:#1A1750;border-bottom:1px solid #2D2566;vertical-align:top;">
                    <span style="font-size:14px;color:#E8D5F5;font-weight:500;">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;background-color:#161340;border-bottom:1px solid #2D2566;vertical-align:top;">
                    <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#818CF8;">Email</span>
                  </td>
                  <td style="padding:10px 16px;background-color:#161340;border-bottom:1px solid #2D2566;vertical-align:top;">
                    <a href="mailto:${email}" style="font-size:14px;color:#818CF8;font-weight:500;text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;background-color:#1A1750;vertical-align:top;">
                    <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#818CF8;">Status</span>
                  </td>
                  <td style="padding:10px 16px;background-color:#1A1750;vertical-align:top;">
                    <span style="font-size:14px;color:#818CF8;font-weight:700;">&#10003; Saved to Supabase</span>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}" style="display:inline-block;padding:13px 32px;background:linear-gradient(135deg,#2D1B69,#818CF8);color:#FFFFFF;font-size:14px;font-weight:700;text-decoration:none;border-radius:10px;letter-spacing:0.2px;">
                      Reply to ${name} &rarr;
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#0D0B2A;border-radius:0 0 20px 20px;padding:18px 40px;text-align:center;border-top:1px solid #1E1B4B;">
              <p style="margin:0;font-size:12px;color:#4B4680;">Sent automatically from <a href="https://atlassynapseai.com" style="color:#6D63B0;text-decoration:none;">atlassynapseai.com</a> &mdash; Waitlist Form</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

async function sendWaitlistEmails(name: string, email: string): Promise<void> {
  await Promise.all([
    sendEmail([{ email, name }], "You're on the Atlas Synapse waitlist 🎉", buildConfirmationEmail(name, email)),
    sendEmail(
      [{ email: "company@atlassynapseai.com", name: "Atlas Synapse Team" }],
      `🔔 New Waitlist Signup: ${name} (${email})`,
      buildInternalNotification(name, email)
    ),
  ]);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Supabase credentials missing");
      return NextResponse.json(
        { ok: false, error: "Database not configured" },
        { status: 500 }
      );
    }

    console.log("Calling insert_waitlist_signup function:", body.email);

    // Call the stored function via RPC
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/insert_waitlist_signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseAnonKey,
      },
      body: JSON.stringify({
        p_name: body.name,
        p_email: body.email,
      }),
    });

    const responseText = await response.text();
    console.log("Supabase REST response:", response.status, responseText);

    if (!response.ok) {
      let errorMsg = "Failed to save";
      try {
        const errorData = JSON.parse(responseText);
        errorMsg = errorData.message || errorData.error_description || errorMsg;
      } catch (e) {
        errorMsg = responseText || errorMsg;
      }
      console.error("REST API error:", errorMsg);
      return NextResponse.json(
        { ok: false, error: errorMsg },
        { status: response.status }
      );
    }

    console.log("Successfully saved waitlist signup");
    // Await emails before returning — fire-and-forget is killed by Vercel before completing
    try {
      await sendWaitlistEmails(body.name ?? "", body.email ?? "");
    } catch (e) {
      console.error("Waitlist email error:", e);
      // Non-fatal — signup succeeded even if email fails
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Waitlist save error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to process request" },
      { status: 500 }
    );
  }
}
