import Link from "next/link";
import { Mail, Linkedin, ArrowUpRight, Github } from "lucide-react";

function XIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.632L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

const socials = [
  { label: "Email", href: "mailto:koustav.2005.manna@gmail.com", icon: Mail },
  { label: "Github", href: "https://github.com/Koustav-github", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/koustav-manna-b6a64330b/", icon: Linkedin },
  { label: "X", href: "https://x.com/KoustavMan51112", icon: XIcon },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto max-w-shell wrap-gutter py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-3">Currently — open to work</p>
            <Link
              href="/#contact"
              className="font-display text-2xl text-fg transition-colors hover:text-fg-mute"
            >
              Let&apos;s build something.
            </Link>
          </div>
          <div className="flex items-center gap-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-[3px] border border-line text-fg-mute transition-colors hover:border-fg hover:text-fg"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 font-mono text-xs text-fg-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} Koustav Manna — Jadavpur University</span>
          <span className="inline-flex items-center gap-1.5">
            Built with Next.js
            <ArrowUpRight size={12} />
          </span>
          <span>Trying to to be legitimate...</span>
        </div>
      </div>
    </footer>
  );
}
