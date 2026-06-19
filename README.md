# Emaavy — Marketing Website

Official marketing and landing site for **Emaavy**, an AI voice agent platform that lets businesses deploy, configure, and scale phone-based AI agents in under 20 minutes.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion v11 |
| Icons | react-icons (Simple Icons, HeroIcons) |
| Font | Plus Jakarta Sans (via `next/font/google`) |
| Booking | Calendly Popup Widget |
| Package Manager | npm |

---

## Project Structure

```
emaavy2/
├── app/
│   ├── layout.tsx                  # Root layout — font, metadata
│   ├── globals.css                 # Global styles, Tailwind base, marquee animations
│   ├── page.tsx                    # Homepage
│   ├── platform/page.tsx           # Platform overview page
│   ├── agents/page.tsx             # AI Agent Fleet page
│   ├── integrations/page.tsx       # Unified integrations page (all 5 categories)
│   ├── pricing/page.tsx            # Pricing page (Starter / Growth / Enterprise)
│   ├── faq/page.tsx                # FAQ page (5 category tabs + accordion)
│   ├── book-demo/page.tsx          # Book a Demo (form → Calendly popup)
│   ├── signup/page.tsx             # Sign up page
│   ├── testimonials/page.tsx       # Cinematic testimonials page (dark, animated)
│   ├── privacy-policy/page.tsx     # Privacy Policy (13 sections, sticky TOC)
│   └── terms-of-service/page.tsx   # Terms of Service (19 sections, sticky TOC)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx              # Sticky navbar with Integrations dropdown
│   │   └── Footer.tsx              # Responsive footer
│   └── sections/
│       ├── Hero.tsx                # Hero section with animated orbs
│       ├── AgentsShowcase.tsx      # AI Agent Fleet showcase (id="ai-agents")
│       ├── SystemArchitecture.tsx  # 5-layer architecture with auto-cycling cards
│       ├── HowItWorks.tsx          # How it works steps (id="how-it-works")
│       ├── CaseStudies.tsx         # Case studies → links to /testimonials
│       ├── CallLifecycle.tsx       # Call lifecycle diagram
│       ├── EnterpriseCapabilities.tsx  # Enterprise stats and capabilities
│       ├── UnifiedPlatform.tsx     # Orchestration / Monitoring / Configurability
│       ├── DemoShowcase.tsx        # Live demo showcase
│       ├── CampaignStudio.tsx      # Campaign studio section
│       ├── Pricing.tsx             # Pricing cards component
│       ├── Testimonials.tsx        # Testimonials carousel (homepage)
│       ├── Metrics.tsx             # Animated metrics counters
│       ├── IntegrationsOrbit.tsx   # Integrations orbit animation
│       ├── Features.tsx            # Feature grid
│       ├── FinalCTA.tsx            # Bottom CTA section
│       └── ...                     # Additional section components
│
├── lib/
│   ├── constants.ts                # NAV_LINKS, INTEGRATION_CATEGORIES, etc.
│   └── utils.ts                    # cn() utility
│
├── public/
│   └── brand/
│       └── emaavy-logo.svg         # Official logo
│
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Pages & Routes

| Route | Description |
|---|---|
| `/` | Homepage — Hero, Agent Showcase, System Architecture, Platform, Pricing, CTA |
| `/platform` | Full platform overview — includes `#how-it-works` and `#ai-agents` anchors |
| `/agents` | AI Agent Fleet — Sales, Support, Scheduling, Collections, Inbound agents |
| `/integrations` | All 5 integration categories on one page with sticky category nav |
| `/pricing` | Starter / Growth / Enterprise with monthly/annual toggle (10% off annual) |
| `/faq` | 5-tab FAQ (General, Platform, Integrations, Security, Billing) |
| `/book-demo` | Lead capture form → Calendly popup → confirmation screen |
| `/signup` | Sign up page |
| `/testimonials` | Cinematic dark testimonials page — featured stories, call simulator, marquee wall |
| `/privacy-policy` | 13-section privacy policy with sticky TOC |
| `/terms-of-service` | 19-section terms with sticky TOC, SLA table, arbitration clause |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/developeremaavy365/EMAAVY_AI_FINAL.git
cd EMAAVY_AI_FINAL

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

---

## Navbar Order

Platform → Integrations → AI Agents → How It Works → Case Studies → Pricing → FAQ

Defined in `lib/constants.ts` → `NAV_LINKS`:

```ts
export const NAV_LINKS = [
  { label: 'Platform',      href: '/platform' },
  { label: 'AI Agents',     href: '/platform#ai-agents' },
  { label: 'How It Works',  href: '/platform#how-it-works' },
  { label: 'Case Studies',  href: '/testimonials' },
  { label: 'Pricing',       href: '/pricing' },
  { label: 'FAQ',           href: '/faq' },
];
```

---

## Key Configurations

### Pricing (INR)

| Plan | Monthly | Annual (10% off) |
|---|---|---|
| Starter | ₹2,499/mo | ₹26,989/yr |
| Growth | ₹9,999/mo | ₹1,07,989/yr |
| Enterprise | Custom | Custom |

### Brand Colors

| Name | Hex |
|---|---|
| Background (dark pages) | `#060913` |
| Emaavy Deep | `#18345d` |
| Indigo accent | `#6366f1` |
| Body text | `#09090b` |

### Fonts

- **Headings:** Plus Jakarta Sans — loaded via `next/font/google`, mapped through `--font-jakarta` → `--font-clash` CSS variable → `font-display` Tailwind class
- **Body:** General Sans — loaded via Fontshare CDN

---

## Calendly Integration (Book Demo)

The `/book-demo` page uses the **Calendly Popup Widget**.

**Setup:**
1. Create a Calendly account at [calendly.com](https://calendly.com)
2. Create an event type (e.g. `demo` — 30 minutes)
3. In Calendly → Event settings → Notifications → add `support@emaavy.ai` as a host notification email
4. Update `CALENDLY_URL` in `app/book-demo/page.tsx`:

```ts
const CALENDLY_URL = 'https://calendly.com/emaavy/demo';
```

The form prefills Calendly with the user's name, email, company, job title, team size, and use case. After booking, the page listens for the `calendly.event_scheduled` browser event and shows a confirmation screen.

---

## Testimonials Page (`/testimonials`)

Dark, cinematic, fully animated — built with Framer Motion:

- **Hero** — oversized headline, animated ambient orbs, live pulse ticker
- **Stats row** — 4 animated stat cards (4.9/5 rating, 97% retention, NPS 72, <20 min to first call)
- **Featured Stories** — 5 company deep-dives with interactive side selector; each includes a **live call simulator** (messages appear with typing indicators, then shows "Call complete — outcome logged to CRM")
- **Marquee wall** — two auto-scrolling rows (opposite directions) of 12 community quotes
- **Floating quote grid** — all 12 quotes in hover-lift cards
- **CTA** — gradient panel with animated stars rating

---

## Contact & Legal

| | |
|---|---|
| Support email | support@emaavy.ai |
| Registered address | Oakhla Industrial Area, Phase 2, A Block, Plot No. 78, 3rd Floor, New Delhi – 110020, India |

All contact emails in Privacy Policy and Terms of Service point to `support@emaavy.ai`.

---

## Responsive Design

- Global `overflow-x: hidden` + `min-width: 0` on all elements to prevent horizontal scroll
- All section headings use `sm:` / `md:` / `lg:` breakpoints
- Footer: `sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]`
- Agent detail panels, pricing cards, and stats grids all stack to single column on mobile

---

## Developer Notes

- All `'use client'` components use Framer Motion — avoid adding heavy third-party animation libs
- `SystemArchitecture` auto-cycles through 5 layers every 4.5 s using `setTimeout`; pauses on hover of the detail card only (not the full section)
- `HowItWorks` section has `id="how-it-works"` for the navbar anchor link
- `AgentsShowcase` section has `id="ai-agents"` for the navbar anchor link
- `CaseStudies` "View all case studies" button links to `/testimonials`
- Marquee animations (`animate-marquee`, `animate-marquee-rev`) are defined in `app/globals.css` via `@keyframes` — not Tailwind plugin
- Integration category pages under `/integrations/[category]` exist but the main unified `/integrations` page is the primary entry point from the navbar
