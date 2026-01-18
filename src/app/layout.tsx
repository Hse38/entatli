import type { Metadata } from "next";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { ChatbotProvider } from "../contexts/ChatbotContext";
import { NavProvider } from "../contexts/NavContext";
import { IntroVideoOverlay } from "../components/IntroVideoOverlay";
import { PageTransition } from "../components/PageTransition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://entatlitelasim.com"),
  title: "Enta Litle Asim | Premium Dessert & Catering Logistics",
  description:
    "Premium dessert and catering solutions for corporate organizations and large-scale events. Flawless logistics, zero-risk execution, absolute reliability.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  keywords: [
    "premium dessert catering",
    "corporate catering",
    "large scale event desserts",
    "event logistics",
    "Istanbul catering",
  ],
  alternates: {
    canonical: "https://entatlitelasim.com",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Enta Litle Asim | Premium Dessert & Catering Logistics",
    description:
      "Premium dessert and catering solutions for corporate organizations and large-scale events. Flawless logistics, zero-risk execution, absolute reliability.",
    url: "https://entatlitelasim.com",
    siteName: "Enta Litle Asim",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Enta Litle Asim premium dessert catering",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enta Litle Asim | Premium Dessert & Catering Logistics",
    description:
      "Premium dessert and catering solutions for corporate organizations and large-scale events. Flawless logistics, zero-risk execution, absolute reliability.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
        suppressHydrationWarning
      >
        <ChatbotProvider>
          <NavProvider>
            <PageTransition>
              {children}
            </PageTransition>
            <IntroVideoOverlay />
          </NavProvider>
        </ChatbotProvider>
      </body>
    </html>
  );
}
