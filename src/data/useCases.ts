export interface UseCase {
  industry: string;
  headline: string;
  problem: string;
  scenario: string;
  benefits: string[];
  tech: string;
  icon: string;
}

export const useCases: UseCase[] = [
  {
    industry: "Legal",
    headline: "Every precedent. Every clause. Instantly.",
    problem:
      "Case files scattered across document management systems, email archives, and partners' personal knowledge. Junior associates spend hours searching for precedents that senior partners recall from memory. When a partner leaves, decades of institutional knowledge walk out the door.",
    scenario:
      "A lawyer begins drafting a response letter. Betty surfaces relevant case files, precedents, and related documents automatically — from across all the firm's databases. The exact argument used successfully three years ago appears before the lawyer finishes their first paragraph.",
    benefits: [
      "Instant access to the firm's complete institutional knowledge",
      "No more searching — Betty brings the right documents to you",
      "Complete audit trail for every knowledge access and decision",
    ],
    tech: "Self-hosted deployment with full data sovereignty. Comprehensive audit logging for regulatory compliance. Zero data leaves your infrastructure.",
    icon: "Scale",
  },
  {
    industry: "Medical & Healthcare",
    headline: "Patient context without the compliance risk.",
    problem:
      "Patient data regulations create necessary but burdensome access barriers. Knowledge silos between departments mean specialists don't see the full picture. Documentation overhead steals time from patient care.",
    scenario:
      "A doctor checking a patient's treatment history gets full context instantly — previous treatments, specialist notes, relevant research — all while maintaining strict regulatory compliance. Betty knows what you're allowed to see and serves only that.",
    benefits: [
      "Compliance-safe access to cross-department knowledge",
      "Full patient context without regulatory risk",
      "Reduced documentation time — Betty remembers so you don't have to",
    ],
    tech: "Confidential Computing with Trusted Execution Environments. Hardware-level data protection ensures patient data is encrypted even during processing.",
    icon: "Heart",
  },
  {
    industry: "Software & Technology",
    headline: "The decision from six months ago — and why.",
    problem:
      "Context lost across teams and sprints. The same architectural mistakes repeated because the original reasoning was never captured. Documentation rots the moment it's written. Onboarding takes months because knowledge lives in people's heads.",
    scenario:
      "A developer asks about the authentication flow. Betty provides the exact decision, the rationale from six months ago, who made it, what alternatives were considered, and the Slack thread where it was debated. No more archaeology.",
    benefits: [
      "No reinventing the wheel — every past decision is accessible",
      "Cross-team knowledge sharing without meetings",
      "90% cost savings through intelligent routing",
    ],
    tech: "E2B/Daytona isolated containers for secure code execution. Self-hosted with full API integration into your existing development stack.",
    icon: "Code",
  },
  {
    industry: "Energy & Field Service",
    headline: "The repair manual that already exists — found instantly.",
    problem:
      "Field workers disconnected from company knowledge. Equipment issues require calls back to the office, waiting for experts, or returning to base. The solution to today's problem was documented two years ago by a technician who has since retired.",
    scenario:
      "An electrician photographs a broken component at a wind turbine. BettyGo identifies it, finds the complete repair history, and provides step-by-step instructions — all from the field. Someone already solved this exact problem two years ago.",
    benefits: [
      "Full company knowledge accessible in the field",
      "Instant diagnosis with visual identification",
      "Reduced downtime and eliminated repeat site visits",
    ],
    tech: "BettyGo mobile app with Tailscale VPN for secure remote access. Offline-capable for locations without connectivity.",
    icon: "Zap",
  },
];
