import { Hero } from "@/components/Hero";
import { MetricsBar } from "@/components/MetricsBar";
import { PillarCards } from "@/components/PillarCard";
import { FlowDiagram } from "@/components/FlowDiagram";
import { UseCasePreview } from "@/components/UseCasePreview";
import { CTASection } from "@/components/CTASection";

export default function Home() {
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
