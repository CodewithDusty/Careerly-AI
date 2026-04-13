import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

// ============================================
// Inter font — clean, modern, highly legible
// ============================================
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// ============================================
// SEO Metadata
// ============================================
export const metadata: Metadata = {
  title: {
    default: "Careerly AI — Build Your Dream Career with AI",
    template: "%s | Careerly AI",
  },
  description:
    "AI-powered career guidance platform that generates personalized roadmaps, tracks progress, and discovers opportunities tailored to your goals.",
  keywords: [
    "career",
    "AI",
    "roadmap",
    "job search",
    "career guidance",
    "personalized learning",
  ],
  authors: [{ name: "Careerly AI" }],
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

// ============================================
// Root Layout
// ============================================
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
