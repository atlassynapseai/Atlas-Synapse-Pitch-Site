import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      company,
      role,
      howHeardAboutUs,
      monthlySpending,
      aiTasks,
    } = body;

    // Send email using a service (using Resend as example, or configure your provider)
    // For now, this is a placeholder - you'll need to configure your email service

    const emailContent = `
Priority Access Request Received

Name: ${firstName} ${lastName}
Email: ${email}
Company: ${company}
Role: ${role}
How they heard about us: ${howHeardAboutUs}
Monthly AI Spending: ${monthlySpending}
AI Tasks/Use Cases:
${aiTasks}

---
You can follow up with this person at: ${email}
    `.trim();

    console.log("Priority access request:", {
      firstName,
      lastName,
      email,
      company,
      role,
      howHeardAboutUs,
      monthlySpending,
      aiTasks,
    });

    // TODO: Implement actual email sending
    // Example with Resend (install: npm install resend):
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "noreply@atlassynapseai.com",
    //   to: "company@atlassynapseai.com",
    //   subject: `Priority Access Request: ${firstName} ${lastName}`,
    //   html: emailContent,
    // });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
