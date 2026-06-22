"use client";

import { useMemo } from "react";

type Lang = "ts" | "sol" | "py";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Lightweight, dependency-free line highlighter. Order matters. */
function highlight(line: string, lang: Lang): string {
  let h = escapeHtml(line);
  const wrap = (cls: string) => `<span class="${cls}">$1</span>`;

  if (lang === "ts") {
    h = h
      .replace(/(\/\/.*)/g, wrap("syntax-comment"))
      .replace(/(&quot;(?:[^&]|&(?!quot;))*?&quot;|&#39;[^&]*?&#39;|`[^`]*`)/g, wrap("syntax-string"))
      .replace(/\b(import|export|async|await|const|let|from|return|new|function|type|interface)\b/g, wrap("syntax-keyword"))
      .replace(/\b(FormData|Date|string|boolean|number|Promise)\b/g, wrap("syntax-type"));
  } else if (lang === "sol") {
    h = h
      .replace(/(\/\/.*|\/\/\/.*)/g, wrap("syntax-comment"))
      .replace(/(&quot;(?:[^&]|&(?!quot;))*?&quot;)/g, wrap("syntax-string"))
      .replace(/\b(pragma|solidity|import|contract|function|mapping|event|constructor|emit|require|returns|return|external|public|view|internal|uint256|address|bool|string|bytes32|memory|storage|immutable|indexed|msg|block)\b/g, wrap("syntax-keyword"))
      .replace(/\b(\d+e?\d*)\b/g, wrap("syntax-number"))
      .replace(/\b(IERC20|ReentrancyGuard|Ownable|SimpleStaking)\b/g, wrap("syntax-type"));
  } else {
    h = h
      .replace(/(#.*)/g, wrap("syntax-comment"))
      .replace(/(&quot;(?:[^&]|&(?!quot;))*?&quot;|&#39;[^&]*?&#39;)/g, wrap("syntax-string"))
      .replace(/@(\w+)/g, '<span class="syntax-function">@$1</span>')
      .replace(/\b(from|import|def|class|return|if|else|elif|for|in|and|or|not|with|as|lambda)\b/g, wrap("syntax-keyword"))
      .replace(/\b(\d+)\b/g, wrap("syntax-number"))
      .replace(/\b(ChatOpenAI|StateGraph|ToolNode|TypedDict|Annotated|AgentState|END|str)\b/g, wrap("syntax-type"));
  }
  return h;
}

export default function CodeBlock({
  code,
  filename,
  lang,
  label,
  maxHeight,
}: {
  code: string;
  filename: string;
  lang: Lang;
  label: string;
  maxHeight?: number;
}) {
  const lines = useMemo(() => code.split("\n"), [code]);

  return (
    <div className="overflow-hidden rounded-[4px] border border-line bg-raised">
      {/* tab bar */}
      <div className="flex items-center border-b border-line bg-surface">
        <div className="flex items-center gap-2 border-r border-line px-4 py-2.5">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
          <span className="font-mono text-xs text-fg">{filename}</span>
        </div>
        <span className="ml-auto px-4 font-mono text-[11px] uppercase tracking-widest text-fg-faint">
          {label}
        </span>
      </div>

      {/* code */}
      <div className="overflow-auto p-4" style={maxHeight ? { maxHeight } : undefined}>
        <pre className="font-mono text-[12.5px] leading-relaxed">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="group flex">
                <span className="mr-4 w-7 shrink-0 select-none text-right text-fg-faint/70 tabular-nums">
                  {i + 1}
                </span>
                <span
                  className="text-fg-mute"
                  dangerouslySetInnerHTML={{ __html: highlight(line, lang) || "&nbsp;" }}
                />
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
