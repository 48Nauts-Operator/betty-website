# Betty Website — Build Prompt

Feed this entire document to the coding agent.

---

## Role & Mindset

You are a **world-class enterprise web designer and frontend engineer**, trained in editorial design, information architecture, and premium B2B product websites.

You think in **hierarchy, clarity, trust signals, and narrative flow**. Every pixel must earn the trust of a CTO, a managing partner, or a hospital IT director.

You are allergic to:
- Dark mode SaaS templates
- Startup landing page aesthetics
- Emoji as icons
- Glassmorphism-heavy dark themes
- Generic "AI assistant" marketing
- Component sameness (identical cards stacked)
- Anything that screams "we made this in a weekend"

Your goal is to build a website that a Swiss private bank partner would feel comfortable sharing with their board. Not flashy. Not trendy. **Trustworthy, intelligent, and deep.**

---

## Project: betty.swiss

### What Is Betty?

Betty is an **AI-powered organizational intelligence platform**. She unifies a company's entire knowledge — across databases, divisions, sites, and countries — and makes it accessible to every employee, from the floor to the C-suite.

Betty is NOT a chatbot. NOT a search engine. NOT a wrapper around ChatGPT.

Betty IS:
- **Institutional memory** that never forgets and actively intervenes ("You solved this a year ago — here's how")
- **An active assistant** that does the work — research, drafting, analysis, catching mistakes
- **100% private** — self-hosted, TEEs, Confidential Computing, Swiss data centers, data never leaves your infrastructure
- **47K+ knowledge items** indexed, 50ms response time, 90% cost savings via intelligent routing

### Built By
**Andre Wolke** — solo founder. 30+ years building technology. Blockchain pioneer (2011). Built backbone for Sygnum Bank, Swiss Stablecoin CHFD architecture. 15+ months deep in AI. One person built this.

### Target Audience
Enterprise SMEs: law firms, medical organizations, software companies, energy/field service companies. Decision makers: CTOs, managing partners, VP Engineering, compliance officers. Swiss and DACH market. They care about data sovereignty, compliance, and ROI.

**NOT targeting:** individual developers, consumers, startups wanting a chatbot.

---

## Design Principles (NON-NEGOTIABLE)

### 1. LIGHT THEME — Always
White and warm grey backgrounds. Dark text. No dark mode. No theme toggle. Knowledge and trust = light. This is enterprise, not a developer tool.

### 2. White Space Is Trust
Enterprise buyers associate generous whitespace with quality and authority. Wide margins (120px+ between sections). No cramming. Let content breathe. A law firm partner should feel the site respects their time.

### 3. Information Hierarchy Is Everything
Every page has a clear reading path: headline → subheadline → body → CTA. Visual weight guides the eye naturally. Never compete for attention. One focal point per viewport.

### 4. Substance Over Flash
No gratuitous animations. Every motion must serve comprehension — reveal, flow, or state change. Real numbers > marketing superlatives. Say "50ms response time", not "blazing fast".

### 5. Icons Over Emoji
**Lucide React icons exclusively.** Clean, consistent 1.5px stroke weight. No emoji anywhere. Icons should feel medical-grade precise.

### 6. No Component Sameness
Each section has a different layout rhythm. Don't stack identical cards 3x. Alternate white/grey backgrounds. Vary card sizes. Break visual monotony deliberately.

### 7. Self-Critique (MANDATORY)
Before finalizing ANY section, answer:
- Would a Swiss enterprise CTO screenshot this for their board?
- Does this look like it cost CHF 50K to build?
- What did you REMOVE that a weaker designer would have kept?
- If you squint, can you still understand the hierarchy?

**If the result looks "startup-y", "AI wrapper-y", or "template-y" — delete it and start over.**

---

## Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS 4
- **Animation:** Framer Motion (subtle, purposeful — scroll reveals only)
- **Fonts:** Inter (all weights), JetBrains Mono (code/technical)
- **Icons:** Lucide React (ONLY — no emoji, no other icon libraries)
- **No dark mode.** No theme toggle. Light only.

### Install
```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir
npm install framer-motion lucide-react
```

### next.config.ts
```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
}

export default nextConfig
```

---

## Color System

```css
:root {
  /* Backgrounds */
  --bg-white: #FFFFFF;
  --bg-surface: #F5F7FA;        /* Alternating sections */
  --bg-surface-blue: #F0F4FF;   /* Blue-tinted surface for emphasis */
  
  /* Primary — Muted Navy */
  --primary: #2B4C7E;
  --primary-dark: #1E3A5F;
  --primary-light: #3D6098;
  
  /* Accent — Sage Mint */
  --accent: #7FB5B0;
  --accent-light: #A3CEC9;
  --accent-subtle: rgba(127, 181, 176, 0.1);
  
  /* CTA — Deep Teal */
  --cta: #3A8F85;
  --cta-hover: #2D7A71;
  --cta-light: rgba(58, 143, 133, 0.08);
  
  /* Text */
  --text-primary: #1E293B;       /* Dark slate — body text */
  --text-secondary: #64748B;     /* Cool grey — captions, secondary */
  --text-tertiary: #94A3B8;      /* Light grey — labels */
  
  /* Borders */
  --border-light: #E5E9F0;
  --border-default: #D1D9E6;
  --border-accent: rgba(43, 76, 126, 0.15);
  
  /* Status */
  --status-done: #22C55E;
  --status-progress: #F59E0B;
  --status-planned: #94A3B8;
}
```

### Rules
- NEVER use pure black (#000) — use `#1E293B` for darkest text
- NEVER use neon colors, gradients across the rainbow, or crypto aesthetics
- Blue and teal are the ONLY accent colors — everything else is grey
- Backgrounds alternate between `#FFFFFF` and `#F5F7FA`
- Cards use subtle borders and shadows, NOT bold outlines

---

## Typography System

```css
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace'],
}
```

### Scale
```
Hero headline     → text-5xl md:text-6xl lg:text-7xl font-bold     (48-72px)
Section headline  → text-3xl md:text-4xl font-bold                  (30-36px)
Subheadline       → text-xl md:text-2xl font-semibold               (20-24px)
Body large        → text-lg leading-relaxed text-secondary           (18px)
Body              → text-base leading-relaxed text-secondary         (16px)
Mono label        → font-mono text-xs uppercase tracking-wider       (12px)
```

### Rules
- Body text max-width: 680px (optimal reading line length)
- Headlines: bold, tight line-height (1.1-1.15)
- Body: generous line-height (1.75) — readability for long content
- `font-mono` for all technical labels: metrics, status tags, code references

---

## Component Patterns

### Enterprise Card
```tsx
// Light theme card — subtle, not glassmorphic
<div className="bg-white rounded-xl border border-[#E5E9F0] p-8 
  shadow-sm hover:shadow-md transition-shadow duration-300">
  {/* icon + content */}
</div>
```

### Surface Card (on white backgrounds)
```tsx
<div className="bg-[#F5F7FA] rounded-xl p-8">
  {/* No border needed — background contrast is enough */}
</div>
```

### Metric Block
```tsx
<div className="text-center">
  <div className="font-mono text-4xl font-bold text-[#2B4C7E]">47K+</div>
  <div className="text-sm text-[#64748B] mt-1">Knowledge Items</div>
</div>
```

### CTA Button
```tsx
<button className="bg-[#3A8F85] hover:bg-[#2D7A71] text-white 
  font-semibold px-8 py-3 rounded-lg transition-colors duration-200">
  Request a Demo
</button>
```

### Secondary Button
```tsx
<button className="border border-[#2B4C7E] text-[#2B4C7E] 
  hover:bg-[#2B4C7E] hover:text-white
  font-semibold px-8 py-3 rounded-lg transition-colors duration-200">
  Learn More
</button>
```

---

## Navigation (Fixed Top)

```
┌──────────────────────────────────────────────────────────┐
│  [Betty Logo]    Product   Use Cases   Technology   About│
│                                              [Contact →] │
└──────────────────────────────────────────────────────────┘
```

- Fixed position, white background, subtle bottom border (`1px solid #E5E9F0`)
- Logo: "Betty" in Inter Bold, navy color, with a small mint dot (●) after the name
- 4 nav links + 1 CTA button (teal, filled)
- Mobile: hamburger menu, slide-in drawer
- No dropdowns — each link goes to a page
- Active page: underline or navy text (vs grey for inactive)

---

## Pages to Build

### 1. HOME — "The Promise"

A clean, confident scroll. Each section earns the next.

**Section 1 — Hero** (full viewport, white bg)
```
                Your organization's knowledge.
                Always accessible. Always private.

   Betty unifies your company's entire knowledge and makes it
   available to every employee — from the field to the boardroom.

           [ Request a Demo ]    [ Learn More ↓ ]
```
- Centered text. Navy headline. Grey body. Two buttons.
- Below: a subtle animated illustration or abstract data visualization (particles flowing into a central node — representing knowledge unification). Use a canvas/SVG animation, NOT a video.
- If animation is complex, a clean static illustration is acceptable. Never a stock photo.

**Section 2 — Metrics Bar** (surface grey bg `#F5F7FA`)
```
   47K+              50ms              90%               $0.00
   Knowledge         Response          Cost              Per Betty
   Items             Time              Savings           Answer
```
- 4 metrics in a row. Numbers in navy mono font. Labels in grey.
- Animate numbers counting up on scroll (Framer Motion).
- On mobile: 2x2 grid.

**Section 3 — Three Pillars** (white bg)
```
   [Database icon]          [Brain icon]            [Shield icon]
   Unified Knowledge        Active Intelligence     100% Private

   Every employee gets      Betty works for you.    Self-hosted.
   access to everything     Research, drafting,     TEEs. Swiss data
   the company knows.       analysis. She catches   centers. Your data
   No silos. No "ask        mistakes before they    never leaves your
   Dave in accounting."     happen.                 infrastructure.
```
- Three cards, each with: Lucide icon → heading → 3-line paragraph
- Cards have subtle border, light shadow on hover
- NOT identical sizes if possible — make center pillar slightly larger (emphasis on the active intelligence differentiator)

**Section 4 — How Betty Works (Knowledge First Architecture)** (surface grey bg)

This is the animated centerpiece showing Betty's core differentiator. NOT a simple 3-step flow — show the full routing intelligence.

**Visual Structure:**
```
┌─────────────────────────────────────────────────────────────────┐
│                         YOU ASK                                  │
│                 "How did we handle X last year?"                 │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│              BETTY'S KNOWLEDGE GRAPH                             │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Semantic   │  │  Full-Text   │  │ Relationship │          │
│  │    Search    │  │    Search    │  │   Mapping    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                  │
│                    47K+ items · 50ms                             │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
              ┌───────────────┐
              │  CONFIDENCE   │
              │    SCORE      │
              └───────┬───────┘
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
   ┌─────────┐  ┌──────────┐  ┌─────────┐
   │  HIGH   │  │  MEDIUM  │  │   LOW   │
   │  >85%   │  │  50-85%  │  │  <50%   │
   ├─────────┤  ├──────────┤  ├─────────┤
   │ DIRECT  │  │ BETTY +  │  │   LLM   │
   │ ANSWER  │  │   LLM    │  │ + FULL  │
   │         │  │ VERIFY   │  │ CONTEXT │
   ├─────────┤  ├──────────┤  ├─────────┤
   │  50ms   │  │  500ms   │  │  1-3s   │
   │  $0.00  │  │  ~$0.001 │  │ ~$0.003 │
   └─────────┘  └──────────┘  └─────────┘
```

**Animation Sequence (Framer Motion + Canvas):**
1. Query text fades in at top
2. Arrow animates downward, particles flow into Knowledge Graph box
3. The three search types light up in sequence (left → right), with subtle pulse
4. Results coalesce → flow down to Confidence Score indicator
5. Score "calculates" (brief animation), then routes to one of three paths
6. The HIGH path (leftmost) should be emphasized — larger, brighter, perhaps a subtle green glow
7. Metrics (time + cost) fade in under each path
8. Loop: reset and show a different routing decision (vary which path lights up, but HIGH most often)

**Key Messaging:**
- Headline: "Knowledge-first architecture"
- Subheadline: "Betty checks her own knowledge before ever calling an LLM. 35–40% of queries are answered directly — faster and at zero cost."

**Design Notes:**
- Keep database names abstract ("Semantic Search", "Full-Text Search", "Relationship Mapping") — no tech names visible
- The animation should feel like watching intelligence make a decision
- Use the navy/teal color palette for the flow
- Mono labels for metrics (time, cost)
- On mobile: vertical stack, simplified animation (static diagram acceptable)

**Section 5 — Use Case Preview** (white bg)
- 4 cards: Legal, Medical, Software, Field Service
- Each: Lucide icon + industry name + one-line description
- "See All Use Cases →" link below
- Cards in 2x2 grid (desktop), stacked (mobile)

**Section 6 — CTA** (surface grey bg)
```
   Ready to unify your organization's knowledge?

   [ Request a Demo ]     hello@betty.swiss

   Swiss-made · Self-hosted · GDPR compliant
```

---

### 2. PRODUCT — "The Full Picture"

**Section 1 — Overview** (white bg)
Short intro: what Betty is, what she replaces, who she's for. 2 paragraphs max.

**Section 2 — Core Intelligence Features** (alternating white/grey sections)

Organize all 22 features into 4 categories. Each category is a full-width section:

**Category A: Core Intelligence** (white bg)
- Intelligent Routing — Betty-first architecture, confidence-based, 3 routing modes. 35-40% queries answered without LLM. 
- Knowledge Management — 47K+ items: conversations, code, docs, screenshots. Semantic + full-text + hybrid search.
- Multi-Agent Orchestration (CHAOS) — Parallel execution, voting, consensus. Multiple specialist agents.
- Pattern Recognition — Code, conversation, error, solution, and workflow patterns.

**Category B: Memory & Storage** (surface grey bg)
- 4-Database Architecture — PostgreSQL (structured), Neo4j (relationships), Qdrant (vectors), Redis (cache)
- Temporal Knowledge Graphs — Graphiti integration for time-based relationship tracking [IN DEV]
- Advanced Search — Full-text, semantic, hybrid, regex, time-based queries

**Category C: Interfaces** (white bg)
- Dashboard v2 — Modern React interface for management and analytics
- BettyGo Mobile — iOS app, Tailscale VPN, full knowledge access in the field [IN DEV]
- API Access — Full REST API for integration with existing systems
- Claude Code Integration — Hooks system for developer workflows

**Category D: Security & Privacy** (surface grey bg)
- Complete Offline Operation — No cloud dependency required
- TEEs + Confidential Computing — Hardware-level data isolation
- Encryption — At rest and in transit, JWT authentication
- Audit Logging — Full trail of every access and action

Layout per feature: icon left, title + description right. Vary the layout between categories (some 2-column grid, some list, some with an illustration).

**Section 3 — Architecture Overview** (white bg)
Simple diagram: User → Betty (routing engine) → [Knowledge Graph | LLM Provider]
Show the intelligent routing decision: Betty answers directly when confident, routes to LLM with full context when needed.
Clean SVG or CSS-drawn diagram. Not a screenshot. Not a complex flowchart.

**Section 4 — Roadmap** (surface grey bg)
Three columns or a timeline:
- ✓ Implemented (15 features, listed)
- ◐ In Development (Graphiti, BettyGo, Voice)
- ○ Planned (Predictive Intelligence, Multi-Language, Enterprise SSO/RBAC, Knowledge Marketplace)

Each item: status icon + name. Green check / amber circle / grey circle.

---

### 3. USE CASES — "How Betty Works For You"

One section per industry, alternating white/grey backgrounds.

**Each use case follows this structure:**
1. Mono label: industry name
2. Headline: the core value proposition for that industry
3. **The Problem** — 2-3 sentences describing the pain
4. **The Scenario** — A concrete Betty-in-action story (2-3 sentences)
5. **Key Benefits** — 3 bullet points
6. **Privacy/Compliance** — Which part of Betty's security stack applies

**Use Case 1: Legal** (white bg)
- Problem: Case files scattered across systems, knowledge trapped in partners' heads
- Scenario: Lawyer starts drafting a letter. Betty surfaces relevant case files, precedents, and related documents automatically — from across all the firm's databases.
- Benefits: Instant access to institutional knowledge, no searching, complete audit trail
- Tech: Self-hosted, full data sovereignty, comprehensive audit logging

**Use Case 2: Medical / Healthcare** (surface grey bg)
- Problem: Patient data regulations, knowledge silos across departments, compliance overhead
- Scenario: Doctor checking treatment history — Betty provides full context instantly while maintaining regulatory compliance
- Benefits: Compliance-safe access, cross-department knowledge, reduced documentation time
- Tech: Confidential Computing, TEEs, hardware-level data protection

**Use Case 3: Software / Technology** (white bg)
- Problem: Context lost across teams, repeated mistakes, documentation rot, onboarding bottleneck
- Scenario: Developer asks about auth flow → gets the exact decision and rationale from 6 months ago, including who made it and why
- Benefits: No reinventing the wheel, cross-team knowledge, 90% cost savings
- Tech: E2B/Daytona isolated containers, self-hosted, full API integration

**Use Case 4: Energy / Field Service** (surface grey bg)
- Problem: Field workers disconnected from company knowledge, slow response to equipment issues
- Scenario: Electrician photographs broken component at a wind turbine → BettyGo identifies it, finds repair history, provides step-by-step instructions. Someone already solved this 2 years ago.
- Benefits: Knowledge in the field, instant diagnosis, reduced downtime and repeat visits
- Tech: BettyGo mobile, Tailscale VPN, offline-capable

---

### 4. TECHNOLOGY — "How We Keep Your Data Safe"

**Section 1 — Our Philosophy** (white bg)
Short essay (3-4 paragraphs):
- Knowledge-first routing: why Betty checks her own knowledge before calling an LLM
- Privacy by architecture, not by policy: it's not a checkbox, it's how the system was built
- Why self-hosted matters: your data, your infrastructure, your control
- LLM transparency: full disclosure of which models run, where, and what data they see

**Section 2 — Privacy & Security Stack** (surface grey bg)
Table-style layout (but designed, not an HTML table):

| Layer | Technology | What It Means |
|-------|-----------|---------------|
| Hardware Isolation | Trusted Execution Environments (TEEs) | Code runs in protected CPU enclaves — not even the host can access it |
| Data Protection | Confidential Computing | Data encrypted even during processing, not just at rest |
| Network Security | Tailscale VPN (BettyGo) | Secure remote access with zero public endpoints |
| Hosting | Swiss Data Centers | Full GDPR compliance under Swiss law |
| Execution | E2B / Daytona | Isolated, ephemeral containers for every task |
| LLM Transparency | Full Disclosure | Which models, where they run, what data they see — always |

Each row: large icon left, title + explanation right. Generous spacing.

**Section 3 — Research** (white bg)
- Heading: "Research & Publications"
- Placeholder state: "Research papers on TEEs, Confidential Computing, and privacy-first AI architecture — coming soon."
- Layout prepared for future papers: title, date, abstract, download link format
- Keep it minimal for now — 1 or 2 placeholder entries

---

### 5. ABOUT — "One Person Built This"

**Section 1 — Andre's Story** (white bg)
- Large heading: "Built by Andre Wolke"
- Photo placeholder (or initials avatar in navy circle)
- 3-4 paragraphs of Andre's story:
  - 30+ years building technology — from VHS copy decoders at 16 to enterprise blockchain
  - Blockchain pioneer: Bitcoin mining in Switzerland (2011), one of the first blockchain agencies globally, built backbone for Sygnum Bank, architected Swiss Stablecoin CHFD
  - 15+ months deep in AI, building Betty solo
  - "One person. Real engineering. No shortcuts. No VC circus."
- Links: @andrewolke (X/Twitter), LinkedIn

**Section 2 — Why Betty Exists** (surface grey bg)
- 2-3 paragraphs on the WHY:
  - Organizations lose knowledge every day. People leave, context disappears, mistakes repeat.
  - The best companies in the world can't answer "what do we collectively know?"
  - Betty makes institutional amnesia impossible.

**Section 3 — Contact** (white bg)
- hello@betty.swiss
- Location: Switzerland
- Simple contact form: Name, Email, Company, Message, Submit button
- Or just a mailto link + "We respond within 24 hours"

---

## Footer (all pages)

```
┌──────────────────────────────────────────────────────────┐
│  Betty                Product          Connect            │
│  Organizational       Use Cases        hello@betty.swiss  │
│  Intelligence         Technology       @andrewolke        │
│                       About            LinkedIn           │
│                                                           │
│  © 2026 Betty · Swiss-made · Privacy Policy               │
└──────────────────────────────────────────────────────────┘
```
- 3 columns. Minimal.
- "Swiss-made" as a trust badge
- Privacy Policy links to `/privacy` (create a minimal page)
- No dead links. Every link works.

---

## Animations (Framer Motion)

- **Scroll reveal:** Elements fade in + slight upward drift as they enter viewport (once: true, duration: 0.6s)
- **Metrics counter:** Numbers count up from 0 when metrics bar enters viewport
- **Hover states:** Cards get subtle shadow increase (200ms transition)
- **Hero:** Slight parallax on the headline (very subtle — 10px max)
- **NO:** Bouncing, spinning, particle explosions, typewriter effects, or anything "look at me"
- **Rule:** If you can't explain WHY an animation exists, remove it

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout, fonts, metadata, NavBar
│   ├── page.tsx              # Home
│   ├── product/page.tsx      # Product
│   ├── use-cases/page.tsx    # Use Cases
│   ├── technology/page.tsx   # Technology / Research
│   ├── about/page.tsx        # About
│   └── privacy/page.tsx      # Privacy Policy (minimal)
├── components/
│   ├── NavBar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── MetricsBar.tsx
│   ├── PillarCard.tsx
│   ├── FlowDiagram.tsx
│   ├── UseCaseCard.tsx
│   ├── FeatureCard.tsx
│   ├── RoadmapSection.tsx
│   ├── SecurityStack.tsx
│   ├── ContactForm.tsx
│   └── ScrollReveal.tsx      # Framer Motion wrapper
├── data/
│   ├── features.ts           # All 22 features with status
│   ├── useCases.ts           # Use case content
│   └── metrics.ts            # Key metrics data
├── lib/
│   └── utils.ts              # cn() helper
└── styles/
    └── globals.css           # CSS variables, Tailwind config
```

---

## Metadata & SEO

```tsx
// app/layout.tsx
export const metadata = {
  title: 'Betty — Organizational Intelligence',
  description: 'AI-powered organizational intelligence. Unify your company\'s knowledge. Self-hosted. Swiss-made. 100% private.',
  keywords: ['organizational intelligence', 'enterprise AI', 'knowledge management', 'self-hosted AI', 'Swiss AI', 'data sovereignty', 'confidential computing'],
  openGraph: {
    title: 'Betty — Organizational Intelligence',
    description: 'Unify your company\'s knowledge. Always accessible. Always private.',
    url: 'https://betty.swiss',
    siteName: 'Betty',
    locale: 'en_US',
  },
}
```

---

## Mobile Design

- All sections stack vertically
- Cards: grid → single column
- Metrics bar: 2x2 grid
- Navigation: hamburger → slide-in drawer
- Touch targets: minimum 44px
- Typography scales proportionally (clamp values)
- Test mentally at: iPhone SE (375px), iPhone 15 (393px), iPad (768px)
- Content padding: 24px on mobile, 48px+ on tablet, 80px+ on desktop

---

## Privacy Policy Page

Minimal but required for enterprise credibility:
- What data we collect (contact form submissions only)
- How we use it (respond to inquiries)
- Data storage (Switzerland)
- GDPR rights
- Contact: hello@betty.swiss
- Keep it short, professional, real

---

## Quality Bar

Betty is enterprise software for organizations that handle sensitive data. The website must reflect that trust.

**Reference sites:**
- **Snowflake** (snowflake.com) — enterprise data, blue palette, clean
- **Confluent** (confluent.io) — enterprise platform, professional
- **Notion** (notion.so) — clean, light, structured information
- **Stripe** (stripe.com) — the gold standard for enterprise trust through design
- **Linear** (linear.app) — precision and confidence

**The test:** Would a Swiss hospital CTO send this URL to their board as evidence they found a trustworthy AI partner? Would a law firm managing partner forward this to their IT committee?

**The anti-test:** If it looks like any other AI startup's landing page with text swapped out, it has failed. If it has emoji icons, dark gradients, or "Sign up FREE!" energy, it has failed.

---

## What NOT To Do

- ❌ Dark theme, dark mode, or theme toggle
- ❌ Emoji as icons (no 🧠 🔒 🚀 💡 anywhere)
- ❌ Glassmorphism with blur on dark backgrounds
- ❌ Rainbow gradients or neon accents
- ❌ "Powered by GPT-4!" or similar
- ❌ Stock photos
- ❌ Dead links or placeholder content
- ❌ "Coming Soon" on essential pages (only acceptable on Research papers)
- ❌ Any reference to 48nauts, 21nauts, DAT.AG on the site
- ❌ Multiple font families for body text (Inter only)
- ❌ Pure black (#000) or pure white (#FFF) — use the defined palette

---

## Final Instruction

Build with the confidence of someone who knows this product is real. 47K knowledge items. 50ms response times. 15 implemented features. This isn't vaporware — it's a working system that needs a website worthy of what it does.

Be clean. Be precise. Be Swiss.

Build all 6 pages (Home, Product, Use Cases, Technology, About, Privacy). Working navigation. Responsive. Production-ready. `output: 'standalone'` for Docker deployment.

Every section must earn its place. Every color must have a reason. Every animation must serve comprehension.

If the result could be any AI startup's website with the text swapped — you've failed. This is Betty. She's different. Show it.
