import { NextResponse } from "next/server";

interface EmailData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
  howHeardAboutUs: string;
  monthlySpending: string;
  aiTasks: string;
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

    const emailContent = `
<h2>New Priority Access Request</h2>
<p><strong>Name:</strong> ${body.firstName} ${body.lastName}</p>
<p><strong>Email:</strong> ${body.email}</p>
<p><strong>Company:</strong> ${body.company}</p>
<p><strong>Role:</strong> ${body.role}</p>
<p><strong>How they heard about us:</strong> ${body.howHeardAboutUs}</p>
<p><strong>Monthly AI Spending:</strong> ${body.monthlySpending}</p>
<p><strong>AI Tasks/Use Cases:</strong></p>
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
