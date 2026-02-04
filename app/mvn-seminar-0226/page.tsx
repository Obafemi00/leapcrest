import { redirect } from "next/navigation";
import { RedirectPageClient } from "@/lib/redirectPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MVN Seminar Registration | LeapCrest",
  description: "Register for the MVN Seminar on February 26th. Join us to learn about innovative solutions for employability and skills development.",
};

const REDIRECT_URL = "https://forms.gle/Ap2vhBWbDsdtLtgB9";

export default function MVNSeminarPage() {
  // Server-side redirect (primary mechanism)
  redirect(REDIRECT_URL);

  // This code won't execute due to redirect(), but TypeScript needs it
  // Client component will handle fallback if needed
  return (
    <RedirectPageClient
      url={REDIRECT_URL}
      title="MVN Seminar Registration"
      description="Register for the MVN Seminar on February 26th"
    />
  );
}
