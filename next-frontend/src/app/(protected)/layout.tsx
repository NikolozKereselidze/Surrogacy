"use client";
import "@/app/[locale]/globals.css";
import DonorsNavigation from "@/components/Navigation/DonorsNavigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await checkAuth();

      if (error) {
        router.push("/login");
        return;
      }

      setSuccess(true);
    })();
  }, [router]);

  if (!success) {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  return (
    <>
      <DonorsNavigation />
      {children}
    </>
  );
}

async function checkAuth() {
  try {
    const res = await fetch(`/api/auth/check`, {
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      return {
        data: null,
        error: data.error,
      };
    }

    return {
      data,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: err,
    };
  }
}
