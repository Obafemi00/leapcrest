import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: [
    {
      path: "../fonts/inter/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/inter/Inter-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/inter/Inter-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/inter/Inter-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Leapcrest Workforce Solutions | Career Accelerator Program",
  description:
    "Elevating Skills. Accelerating Careers. Bridge the employability gap with Leapcrest CAP© - a structured, year-long program embedded within your academic calendar.",
  keywords: [
    "career accelerator program",
    "employability",
    "workforce solutions",
    "placement readiness",
    "institutional training",
  ],
  openGraph: {
    title: "Leapcrest Workforce Solutions | Career Accelerator Program",
    description:
      "Elevating Skills. Accelerating Careers. Bridge the employability gap with Leapcrest CAP©.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
