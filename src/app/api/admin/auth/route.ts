import { NextRequest, NextResponse } from "next/navigation";
import {
  verifyCredentials,
  createSessionToken,
  getAdminSession,
  ADMIN_COOKIE_NAME,
} from "@/lib/auth/adminAuth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const admin = verifyCredentials(email, password);
    if (!admin) {
      return NextResponse.json(
        { error: "Invalid administrator credentials. Please check your credentials." },
        { status: 401 }
      );
    }

    const token = createSessionToken(admin);
    const response = NextResponse.json({
      success: true,
      user: admin,
      message: "Administrator session authenticated successfully.",
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json(
      { error: "Internal server error during authentication." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: "Administrator logged out successfully.",
  });

  response.cookies.delete(ADMIN_COOKIE_NAME);
  return response;
}

export async function GET() {
  const session = getAdminSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, user: session });
}
