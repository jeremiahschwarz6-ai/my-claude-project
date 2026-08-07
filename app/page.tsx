import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Qualifier } from "@/components/Qualifier";
import { SystemFlow } from "@/components/SystemFlow";
import { VideoThatSells } from "@/components/VideoThatSells";
import { Proof } from "@/components/Proof";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { Team } from "@/components/Team";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Qualifier />
        <SystemFlow />
        <VideoThatSells />
        <Proof />
        <HowItWorks />
        <Pricing />
        <Team />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
