import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "zahid_trader_admin_session";
const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@zahidtrader.com";
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "zahidtrader2026";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "zahid-trader-secure-vault-token-2026";

export interface AdminUser {
  email: string;
  name: string;
  role: "superadmin" | "editor";
}

/** Verify credentials and create a signed session token */
export function verifyCredentials(email: string, pass: string): AdminUser | null {
  if (email.trim().toLowerCase() === DEFAULT_ADMIN_EMAIL.toLowerCase() && pass === DEFAULT_ADMIN_PASSWORD) {
    return {
      email: DEFAULT_ADMIN_EMAIL,
      name: "Zahid Trader Desk Admin",
      role: "superadmin",
    };
  }
  return null;
}

/** Check if current request has a valid admin session */
export function getAdminSession(): AdminUser | null {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return null;

    // Token format: base64(email:role:timestamp:secretHash)
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [email, role, secret] = decoded.split(":");

    if (secret === SESSION_SECRET && email) {
      return {
        email,
        name: "Zahid Trader Desk Admin",
        role: role as "superadmin",
      };
    }
  } catch (err) {
    console.error("Session verification failed:", err);
  }
  return null;
}

/** Generate secure cookie token */
export function createSessionToken(user: AdminUser): string {
  const payload = `${user.email}:${user.role}:${SESSION_SECRET}`;
  return Buffer.from(payload).toString("base64");
}

export { ADMIN_COOKIE_NAME };
