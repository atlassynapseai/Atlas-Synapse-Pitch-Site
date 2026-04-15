import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    // Handle Supabase errors
    if (error) {
      console.error("Supabase auth error:", error, errorDescription);
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(error)}`, request.url)
      );
    }

    // No code provided
    if (!code) {
      console.error("No authorization code provided");
      return NextResponse.redirect(
        new URL("/login?error=no_code", request.url)
      );
    }

    // Exchange code for session
    const { data, error: exchangeError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error("Code exchange error:", exchangeError);
      return NextResponse.redirect(
        new URL(
          `/login?error=${encodeURIComponent(exchangeError.message)}`,
          request.url
        )
      );
    }

    if (!data.session) {
      console.error("No session returned from code exchange");
      return NextResponse.redirect(
        new URL("/login?error=no_session", request.url)
      );
    }

    const userEmail = data.session.user?.email;
    console.log("Auth successful for:", userEmail);

    // Determine redirect based on email
    let redirectUrl = "/";
    if (userEmail === "gloriabarsoum@atlassynapseai.com") {
      redirectUrl = "/Atlas-Synapse-CRM";
    }

    // Create response with redirect
    const response = NextResponse.redirect(new URL(redirectUrl, request.url));

    // Set secure cookies for the session
    if (data.session.access_token) {
      response.cookies.set("sb-access-token", data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    if (data.session.refresh_token) {
      response.cookies.set("sb-refresh-token", data.session.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return response;
  } catch (err) {
    console.error("Auth callback error:", err);
    return NextResponse.redirect(
      new URL("/login?error=callback_error", request.url)
    );
  }
}
