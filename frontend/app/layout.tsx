import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import MotionProvider from "@/components/MotionProvider";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Koustav Manna — Software Developer",
  description:
    "Koustav Manna — software developer working across three disciplines: full-stack web, AI / ML & deep learning, and systems (system design, HFT, blockchain). Jadavpur University.",
  keywords: [
    "Koustav Manna",
    "Software Developer",
    "Full Stack Developer",
    "Machine Learning",
    "Deep Learning",
    "PyTorch",
    "System Design",
    "HFT",
    "Blockchain",
    "Next.js",
    "Jadavpur University",
  ],
  icons: "/avatar.png",
  authors: [{ name: "Koustav Manna" }],
  openGraph: {
    title: "Koustav Manna",
    description:
      "Full-stack web, AI / ML, and systems — system design, HFT, and blockchain. One engineer, three disciplines.",
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
              <main className="relative flex-1 overflow-x-clip">{children}</main>
              <SiteFooter />
            </div>
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
