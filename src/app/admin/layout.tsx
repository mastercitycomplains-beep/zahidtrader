import React from "react";
import type { Metadata } from "next";
import { getAdminSession } from "@/lib/auth/adminAuth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  title: "Admin CMS Dashboard | Zahid Trader",
  description: "Secure editorial management console for Zahid Trader market intelligence.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = getAdminSession();
  const headerList = headers();
  const pathname = headerList.get("x-pathname") || "";

  // The login page itself doesn't require session check
  // Note: /admin/login handles its own layout
  return (
    <div className="min-h-screen bg-page text-foreground flex flex-col">
      <AdminNav user={session} />
      <div className="flex-1">{children}</div>
    </div>
  );
}
