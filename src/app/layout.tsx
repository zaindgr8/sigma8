import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sigma 8 — Where Verified Investors Meet Exceptional Founders",
  description:
    "The private, invitation-only matchmaking platform connecting authentic GCC capital with vetted startup founders on equal footing. Based in Dubai.",
  keywords: [
    "Sigma 8",
    "GCC Venture Capital",
    "Dubai Startups",
    "Angel Investors Dubai",
    "DIFC Tech",
    "Saudi Arabia Startups",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} dark antialiased`}
    >
      <body className="bg-[#0B0B0D] text-[#F4F1EA] min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
