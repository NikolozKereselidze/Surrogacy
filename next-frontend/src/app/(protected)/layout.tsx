import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import "@/app/[locale]/globals.css";
import DonorsNavigation from "@/components/Navigation/DonorsNavigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const donorTokenCookie = cookieStore.get("donorToken");

  let redirectPath: string | null = null;

  try {
    // Check if we have the donor token cookie
    if (!donorTokenCookie) {
      redirectPath = "/login";
    } else {
      const res = await fetch(`${process.env.API_BASE_URL}/api/auth/check`, {
        headers: {
          Cookie: `donorToken=${donorTokenCookie.value}`,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        redirectPath = "/login";
      }
    }
  } catch (error) {
    console.error("Auth check failed:", error);
    redirectPath = "/login";
  } finally {
    // Clear resources
    if (redirectPath) {
      redirect(redirectPath);
    }
  }

  return (
    <>
      <DonorsNavigation />
      {children}
    </>
  );
}
