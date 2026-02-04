import { redirect } from "next/navigation";
import { RedirectPageClient } from "@/lib/redirectPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ACEM Seminar Registration | LeapCrest",
  description: "Register for the ACEM Seminar on February 26th. Join us to learn about innovative solutions for employability and skills development.",
};

const REDIRECT_URL = "https://forms.gle/ewiyUDKktsuum9Kd9";

export default function ACEMSeminarPage() {
  // Server-side redirect (primary mechanism)
  redirect(REDIRECT_URL);

  // This code won't execute due to redirect(), but TypeScript needs it
  // Client component will handle fallback if needed
  return (
    <RedirectPageClient
      url={REDIRECT_URL}
      title="ACEM Seminar Registration"
      description="Register for the ACEM Seminar on February 26th"
    />
  );
}
