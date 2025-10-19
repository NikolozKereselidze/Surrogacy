import { redirect } from "next/navigation";

export default function RootPage() {
  // Get the user's preferred language from Accept-Language header
  // For now, redirect to English as fallback
  redirect("/en");
}
