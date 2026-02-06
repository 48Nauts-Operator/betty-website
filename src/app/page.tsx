import { Hero } from "@/components/Hero";
import { MetricsBar } from "@/components/MetricsBar";
import { PillarCards } from "@/components/PillarCard";
import { FlowDiagram } from "@/components/FlowDiagram";
import { UseCasePreview } from "@/components/UseCasePreview";
import { CTASection } from "@/components/CTASection";
import { ComingSoon } from "@/components/ComingSoon";

const isComingSoon = process.env.NEXT_PUBLIC_COMING_SOON === "true";

export default function Home() {
  if (isComingSoon) {
    return <ComingSoon />;
  }

  return (
    <>
      <Hero />
      <div id="metrics">
        <MetricsBar />
      </div>
      <PillarCards />
      <FlowDiagram />
      <UseCasePreview />
      <CTASection />
    </>
  );
}
