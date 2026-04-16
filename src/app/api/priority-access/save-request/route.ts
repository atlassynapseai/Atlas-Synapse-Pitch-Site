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

    console.log("Calling insert_priority_access function");

    // Call the stored function via RPC
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/insert_priority_access`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseAnonKey,
      },
      body: JSON.stringify({
        p_first_name: body.first_name,
        p_last_name: body.last_name,
        p_email: body.email,
        p_company: body.company,
        p_role: body.role,
        p_how_heard_about_us: body.how_heard_about_us,
        p_monthly_spending: body.monthly_spending,
        p_ai_tasks: body.ai_tasks,
      }),
    });

    const responseText = await response.text();
    console.log("Supabase RPC response:", response.status, responseText);

    if (!response.ok) {
      let errorMsg = "Failed to save";
      try {
        const errorData = JSON.parse(responseText);
        errorMsg = errorData.message || errorData.error_description || errorMsg;
      } catch (e) {
        errorMsg = responseText || errorMsg;
      }
      console.error("RPC error:", errorMsg);
      return NextResponse.json(
        { ok: false, error: errorMsg },
        { status: response.status }
      );
    }

    console.log("Successfully saved data via function");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Save request error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to process request" },
      { status: 500 }
    );
  }
}
