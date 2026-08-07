import { Reveal } from "./ui/Reveal";
import { Orbs } from "./ui/Orbs";
import { Button } from "./ui/Button";
import { site } from "@/lib/site";

export function FinalCTA() {
  return (
    <section id="book" className="relative overflow-hidden py-24 wide:py-32">
      <Orbs variant="dawn" />
      <div className="relative mx-auto max-w-content px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Pick a time</span>
          <h2 className="display mt-4 text-4xl leading-tight sm:text-6xl">
            15 minutes.
            <br />
            <span className="dawn-text">Then your front office runs itself.</span>
          </h2>
          <p className="mt-6 text-lg text-muted">
            We&rsquo;ll map your inbound, show you exactly what we&rsquo;d automate first, and give
            you the flat monthly number. No pitch deck, no pressure.
          </p>

          {/* Booking embed slot — drop a Cal.com / Calendly inline embed here,
              or keep the button pointing at site.bookingUrl. */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href={site.bookingUrl} variant="dawn" className="!px-8 !py-4 text-base">
              Book a 15-min call
            </Button>
            <Button href="#try" variant="outline" className="!px-8 !py-4 text-base">
              Or test the qualifier again
            </Button>
          </div>

          <p className="mt-8 font-mono text-xs tracking-wide text-muted">{site.promise}</p>
        </Reveal>
      </div>
    </section>
  );
}
