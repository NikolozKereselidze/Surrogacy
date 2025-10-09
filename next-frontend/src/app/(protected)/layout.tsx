import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import "@/app/globals.css";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const donorTokenCookie = cookieStore.get("donorToken");

  // Check if we have the donor token cookie
  if (!donorTokenCookie) {
    redirect("/login");
  }

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/auth/check`, {
      headers: {
        Cookie: `donorToken=${donorTokenCookie.value}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      redirect("/login");
    }
  } catch (error) {
    console.error("Auth check failed:", error);
    redirect("/login");
  }

  return (
    <html lang="en">
      <head>
        <meta
          name="description"
          content="Compassionate surrogacy and egg donation services tailored to your journey. Expert guidance for intended parents, surrogates, and egg donors worldwide."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
