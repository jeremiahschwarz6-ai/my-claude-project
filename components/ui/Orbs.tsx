// Ambient night → dawn orbs. Purely decorative; hidden from a11y tree.
// Drift animation is disabled under prefers-reduced-motion (see globals.css).

type OrbsProps = {
  variant?: "hero" | "cool" | "dawn" | "mixed";
  className?: string;
};

export function Orbs({ variant = "mixed", className = "" }: OrbsProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {(variant === "hero" || variant === "mixed" || variant === "cool") && (
        <span
          className="orb animate-orb-drift"
          style={{
            width: 520,
            height: 520,
            left: "-8%",
            top: "-10%",
            background:
              "radial-gradient(circle at 30% 30%, #6EA8FF55, transparent 70%)",
          }}
        />
      )}
      {(variant === "hero" || variant === "mixed" || variant === "dawn") && (
        <span
          className="orb animate-orb-drift"
          style={{
            width: 620,
            height: 620,
            right: "-12%",
            bottom: "-18%",
            animationDelay: "-6s",
            background:
              "radial-gradient(circle at 60% 40%, #F5B54944, #FF9E6D22 45%, transparent 72%)",
          }}
        />
      )}
    </div>
  );
}
