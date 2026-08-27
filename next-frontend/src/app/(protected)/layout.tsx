import type { Metadata } from "next";
import "@/app/[locale]/globals.css";
import DonorsNavigation from "@/components/Navigation/DonorsNavigation";

export const metadata: Metadata = {
    robots: { index: false, follow: false },
};

export default function ProtectedLayout({ children, }: {
    children: React.ReactNode;
}) {
    return (<>
      <DonorsNavigation />
      {children}
    </>);
}
