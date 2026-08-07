import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "dawn" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cool";

const variants: Record<Variant, string> = {
  dawn:
    "bg-dawn-gradient text-night shadow-[0_8px_30px_-8px_rgba(245,181,73,0.6)] hover:brightness-110 hover:-translate-y-0.5",
  outline:
    "border border-line bg-nightsoft/60 text-ink hover:border-cool/60 hover:text-white hover:-translate-y-0.5",
  ghost: "text-muted hover:text-ink",
};

export function Button({
  href,
  children,
  variant = "dawn",
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const external = href.startsWith("http");
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
