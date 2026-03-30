import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Koustav Manna — Portfolio",
  description:
    "Koustav Manna — Mechanical Engineering student at Jadavpur University. Blockchain Developer, Full Stack Engineer, and AI Engineer specializing in Ethereum, Web Development, and Agentic AI.",
  keywords: [
    "Koustav Manna",
    "Portfolio",
    "Blockchain",
    "Ethereum",
    "Full Stack Developer",
    "Agentic AI",
    "RAG",
    "Jadavpur University",
    "Next.js",
    "Web Development",
  ],
  authors: [{ name: "Koustav Manna" }],
  openGraph: {
    title: "Koustav Manna — Portfolio",
    description:
      "Blockchain Developer, Full Stack Engineer & AI Engineer. Building the decentralized future.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {/* Scan line effect - dark mode only */}
          <div className="dark:block hidden scan-line" />

          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="relative flex-1">{children}</main>
            <footer className="border-t border-[var(--border-color)] py-8 mt-20">
              <div className="max-w-7xl mx-auto px-6 text-center space-y-2">
                <p className="font-mono text-xs text-[var(--text-muted)]">
                  <span className="text-[var(--accent-cyan)]">$</span>{" "}
                  echo &quot;built with Next.js + FastAPI by{" "}
                  <span className="text-[var(--accent-green)]">Koustav Manna</span>&quot;
                </p>
                <p className="font-mono text-xs text-[var(--text-muted)] opacity-50">
                  © {new Date().getFullYear()} — All rights reserved
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
