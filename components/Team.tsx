"use client";

import { useState } from "react";
import { Reveal } from "./ui/Reveal";
import { team } from "@/lib/site";

function Portrait({
  photo,
  initials,
  name,
}: {
  photo: string;
  initials: string;
  name: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line bg-nightsoft">
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          alt={`${name} — MenteAI`}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
          loading="lazy"
        />
      ) : (
        // Styled placeholder slot — drop the real photo at the path in lib/site.ts.
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-2"
          style={{ background: "radial-gradient(120% 120% at 30% 20%, #241f30, #14121C)" }}
        >
          <span className="display text-4xl dawn-text">{initials}</span>
          <span className="font-mono text-[0.58rem] uppercase tracking-widest text-muted">
            photo slot
          </span>
        </div>
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(180deg, transparent 60%, rgba(20,18,28,0.55))" }}
      />
    </div>
  );
}

export function Team() {
  return (
    <section id="team" className="relative py-20 wide:py-28">
      <div className="mx-auto max-w-content px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Operator-led · async-first</span>
          <h2 className="display mt-3 text-3xl sm:text-4xl">
            Why <span className="dawn-text">MenteAI</span>
          </h2>
          <p className="mt-4 text-muted">
            We build systems that replace busywork, not hours. Two operators who&rsquo;d rather ship
            a machine that runs your front office than sell you a retainer of meetings.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {team.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div className="card h-full p-5">
                <Portrait photo={p.photo} initials={p.initials} name={p.name} />
                <h3 className="mt-4 text-lg font-semibold text-ink">{p.name}</h3>
                <p className="font-mono text-[0.68rem] uppercase tracking-widest text-cool">
                  {p.role}
                </p>
                <p className="mt-3 text-sm text-muted">{p.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
