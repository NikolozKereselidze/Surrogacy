import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import AdminNav from "./AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const adminTokenCookie = cookieStore.get("adminToken");

  let redirectPath: string | null = null;

  try {
    // Check if we have the admin token cookie
    if (!adminTokenCookie) {
      redirectPath = "/login/admin";
    } else {
      const res = await fetch(`${process.env.API_BASE_URL}/api/admin-auth/check`, {
        headers: {
          Cookie: `adminToken=${adminTokenCookie.value}`,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        redirectPath = "/login/admin";
      }
    }
  } catch (error) {
    console.error("Admin auth check failed:", error);
    redirectPath = "/login/admin";
  } finally {
    // Clear resources
    if (redirectPath) {
      redirect(redirectPath);
    }
  }

  return <AdminNav>{children}</AdminNav>;
}
