import type { Metadata, Viewport } from "next";
import { body, display, mono } from "./fonts";
import "./globals.css";

const SITE_URL = "https://mente-ai.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MenteAI — Your front office runs itself, day and night",
    template: "%s · MenteAI",
  },
  description:
    "MenteAI builds the AI systems that run the inbound side of your business around the clock — capture, answer, qualify, and book — so nothing gets missed. One flat monthly fee. Pause anytime.",
  keywords: [
    "AI automation agency",
    "AI receptionist",
    "AI lead qualifier",
    "inbound automation",
    "coaches",
    "consultants",
    "B2B founders",
  ],
  openGraph: {
    title: "MenteAI — Your front office runs itself, day and night",
    description:
      "The AI systems that capture, answer, qualify, and book your inbound — 24/7. One flat monthly fee. Pause anytime.",
    url: SITE_URL,
    siteName: "MenteAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MenteAI — Your front office runs itself, day and night",
    description:
      "The AI systems that capture, answer, qualify, and book your inbound — 24/7.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#14121C",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="bg-night text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-cool focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-night"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
