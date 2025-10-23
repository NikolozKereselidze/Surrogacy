"use client";

import { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    checkAuth().then(({ error }) => {
      if (error) {
        router.push("/login/admin");
      } else {
        setSuccess(true);
      }
    });
  }, [router]);

  if (!success) {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  return <AdminNav>{children}</AdminNav>;
}

async function checkAuth() {
  try {
    const res = await fetch(`/api/admin-auth/check`, {
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
