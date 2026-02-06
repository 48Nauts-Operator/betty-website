import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Betty — Organizational Intelligence",
  description:
    "AI-powered organizational intelligence. Unify your company's knowledge. Self-hosted. Swiss-made. 100% private.",
  keywords: [
    "organizational intelligence",
    "enterprise AI",
    "knowledge management",
    "self-hosted AI",
    "Swiss AI",
    "data sovereignty",
    "confidential computing",
  ],
  openGraph: {
    title: "Betty — Organizational Intelligence",
    description:
      "Unify your company's knowledge. Always accessible. Always private.",
    url: "https://betty.swiss",
    siteName: "Betty",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          src="https://wave.21nauts.com/script.js"
          data-website-id="c458a3e1-8bd9-4538-8712-896ca944b0c1"
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
