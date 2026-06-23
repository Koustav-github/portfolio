import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import MotionProvider from "@/components/MotionProvider";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Koustav Manna — Software Engineer",
  description:
    "Koustav Manna — software engineer working across three disciplines: full-stack web, Ethereum / smart contracts, and agentic AI systems. Mechanical Engineering at Jadavpur University.",
  keywords: [
    "Koustav Manna",
    "Software Engineer",
    "Full Stack Developer",
    "Blockchain",
    "Ethereum",
    "Smart Contracts",
    "Agentic AI",
    "RAG",
    "Next.js",
    "Jadavpur University",
  ],
  icons: "/avatar.png",
  authors: [{ name: "Koustav Manna" }],
  openGraph: {
    title: "Koustav Manna",
    description:
      "Full-stack web, Ethereum smart contracts, and agentic AI systems. One engineer, three disciplines.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-bg text-fg antialiased">
        <Loader />
        <Cursor />
        <MotionProvider>
          <SmoothScroll>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="relative flex-1">{children}</main>
              <SiteFooter />
            </div>
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
