import { NextResponse } from "next/server";

interface EmailData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
  roleOther: string;
  howHeardAboutUs: string;
  howHeardAboutUsOther: string;
  monthlySpending: string;
  aiTasksPrimary: string;
  aiTasks: string;
  aiTasksOther: string;
  phone?: string;
}

function buildInternalEmail(body: EmailData, roleDisplay: string, howHeardDisplay: string, aiUseDisplay: string): string {
  const rows: { label: string; value: string }[] = [
    { label: "Name", value: `${body.firstName} ${body.lastName}` },
    { label: "Email", value: body.email },
    { label: "Company", value: body.company },
    { label: "Role", value: roleDisplay || "—" },
    { label: "Phone", value: body.phone || "—" },
    { label: "How Heard", value: howHeardDisplay || "—" },
    { label: "Monthly Spend", value: body.monthlySpending || "—" },
    { label: "Primary Use Case", value: aiUseDisplay || "—" },
  ];

  const rowsHtml = rows.map((r, i) => `
    <tr>
      <td style="padding:10px 16px;background-color:${i % 2 === 0 ? "#1A1750" : "#161340"};border-bottom:1px solid #2D2566;vertical-align:top;width:130px;">
        <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#818CF8;">${r.label}</span>
      </td>
      <td style="padding:10px 16px;background-color:${i % 2 === 0 ? "#1A1750" : "#161340"};border-bottom:1px solid #2D2566;vertical-align:top;">
        <span style="font-size:14px;color:#E8D5F5;font-weight:500;">${r.value}</span>
      </td>
    </tr>`).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>New Priority Access Request</title>
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
              <h1 style="margin:0 0 6px;font-size:22px;font-weight:800;color:#FFFFFF;letter-spacing:-0.3px;">New Priority Access Request</h1>
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
                    <span style="font-size:13px;font-weight:700;color:#818CF8;">&#128276; Action Required — Review &amp; Follow Up</span>
                  </td>
                </tr>
              </table>

              <!-- Details table -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-radius:12px;overflow:hidden;border:1px solid #2D2566;margin-bottom:24px;">
                ${rowsHtml}
              </table>

              <!-- AI Details -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                <tr>
                  <td style="padding:0 0 10px;">
                    <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#818CF8;">AI Setup &amp; Goals</span>
                  </td>
                </tr>
                <tr>
                  <td style="background-color:#1A1750;border:1px solid #2D2566;border-radius:10px;padding:16px;">
                    <span style="font-size:14px;line-height:1.7;color:#D4C9F0;">${body.aiTasks.replace(/\n/g, "<br/>")}</span>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${body.email}" style="display:inline-block;padding:13px 32px;background:linear-gradient(135deg,#2D1B69,#818CF8);color:#FFFFFF;font-size:14px;font-weight:700;text-decoration:none;border-radius:10px;letter-spacing:0.2px;">
                      Reply to ${body.firstName} &rarr;
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#0D0B2A;border-radius:0 0 20px 20px;padding:18px 40px;text-align:center;border-top:1px solid #1E1B4B;">
              <p style="margin:0;font-size:12px;color:#4B4680;">Sent automatically from <a href="https://atlassynapseai.com" style="color:#6D63B0;text-decoration:none;">atlassynapseai.com</a> &mdash; Priority Access Form</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as EmailData;
    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) {
      console.error("BREVO_API_KEY not configured");
      return NextResponse.json(
        { ok: false, error: "Email service not configured" },
        { status: 500 }
      );
    }

    const roleDisplay = body.role === "Other" ? body.roleOther : body.role;
    const howHeardDisplay = body.howHeardAboutUs === "Other" ? body.howHeardAboutUsOther : body.howHeardAboutUs;
    const aiUseDisplay = body.aiTasksPrimary === "Other" ? body.aiTasksOther : body.aiTasksPrimary;

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Atlas Synapse", email: "company@atlassynapseai.com" },
        to: [{ email: "company@atlassynapseai.com", name: "Atlas Synapse Team" }],
        subject: `🚀 Priority Access: ${body.firstName} ${body.lastName} — ${body.company}`,
        htmlContent: buildInternalEmail(body, roleDisplay, howHeardDisplay, aiUseDisplay),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Brevo API error:", error);
      return NextResponse.json(
        { ok: false, error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to process request" },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  try {
    const body = (await req.json()) as EmailData;
    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) {
      console.error("BREVO_API_KEY not configured");
      return NextResponse.json(
        { ok: false, error: "Email service not configured" },
        { status: 500 }
      );
    }

    const roleDisplay = body.role === "Other" ? body.roleOther : body.role;
    const howHeardDisplay = body.howHeardAboutUs === "Other" ? body.howHeardAboutUsOther : body.howHeardAboutUs;
    const aiUseDisplay = body.aiTasksPrimary === "Other" ? body.aiTasksOther : body.aiTasksPrimary;

    const emailContent = `
<h2>New Priority Access Request</h2>
<p><strong>Name:</strong> ${body.firstName} ${body.lastName}</p>
<p><strong>Email:</strong> ${body.email}</p>
<p><strong>Company:</strong> ${body.company}</p>
<p><strong>Role:</strong> ${roleDisplay}</p>
<p><strong>How they heard about us:</strong> ${howHeardDisplay}</p>
<p><strong>Monthly AI Spending:</strong> ${body.monthlySpending}</p>
<p><strong>Primary AI Use Case:</strong> ${aiUseDisplay}</p>
<p><strong>AI Setup & Goals:</strong></p>
<p>${body.aiTasks.replace(/\n/g, "<br>")}</p>
<hr>
<p>Follow up with: <a href="mailto:${body.email}">${body.email}</a></p>
    `.trim();

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Atlas Synapse",
          email: "company@atlassynapseai.com",
        },
        to: [
          {
            email: "company@atlassynapseai.com",
            name: "Atlas Synapse Team",
          },
        ],
        subject: `Priority Access Request: ${body.firstName} ${body.lastName} - ${body.company}`,
        htmlContent: emailContent,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Brevo API error:", error);
      return NextResponse.json(
        { ok: false, error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to process request" },
      { status: 500 }
    );
  }
}
