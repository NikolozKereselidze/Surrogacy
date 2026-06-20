"use client";
import "@/app/[locale]/globals.css";
import DonorsNavigation from "@/components/Navigation/DonorsNavigation";
export default function ProtectedLayout({ children, }: {
    children: React.ReactNode;
}) {
    return (<>
      <DonorsNavigation />
      {children}
    </>);
}
