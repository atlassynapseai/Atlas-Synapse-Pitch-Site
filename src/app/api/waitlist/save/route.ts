import { NextResponse } from "next/server";

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

    console.log("Saving waitlist signup:", body.email);

    // Use REST API directly with anon key
    const response = await fetch(`${supabaseUrl}/rest/v1/waitlist_signups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseAnonKey,
      },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        created_at: new Date().toISOString(),
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
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Waitlist save error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to process request" },
      { status: 500 }
    );
  }
}
