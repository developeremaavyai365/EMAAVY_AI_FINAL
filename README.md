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
| Icons | react-icons (Simple Icons) |
| Font | Plus Jakarta Sans (via `next/font/google`) |
| Booking | Calendly Popup Widget |
| Package Manager | npm |

---

## Project Structure

```
emaavy2/
├── app/
│   ├── layout.tsx                  # Root layout — font, metadata
│   ├── globals.css                 # Global styles, Tailwind base
│   ├── page.tsx                    # Homepage
│   ├── platform/page.tsx           # Platform overview page
│   ├── agents/page.tsx             # AI Agent Fleet page
│   ├── integrations/page.tsx       # Unified integrations page (all 5 categories)
│   ├── pricing/page.tsx            # Pricing page (Starter / Growth / Enterprise)
│   ├── faq/page.tsx                # FAQ page (5 category tabs + accordion)
│   ├── book-demo/page.tsx          # Book a Demo (form → Calendly popup)
│   ├── signup/page.tsx             # Sign up page
│   ├── testimonials/page.tsx       # Testimonials page
│   ├── privacy-policy/page.tsx     # Privacy Policy (13 sections, sticky TOC)
│   └── terms-of-service/page.tsx   # Terms of Service (19 sections, sticky TOC)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx              # Sticky navbar with Integrations dropdown
│   │   └── Footer.tsx              # Footer with Product + Legal columns
│   └── sections/
│       ├── Hero.tsx                # Hero section with animated orbs
│       ├── AgentsShowcase.tsx      # AI Agent Fleet showcase (id="ai-agents")
│       ├── SystemArchitecture.tsx  # 5-layer architecture with auto-cycling cards
│       ├── UnifiedPlatform.tsx     # Orchestration / Monitoring / Configurability
│       ├── CallLifecycle.tsx       # Call lifecycle diagram
│       ├── DemoShowcase.tsx        # Live demo showcase
│       ├── CampaignStudio.tsx      # Campaign studio section
│       ├── Pricing.tsx             # Pricing cards component
│       ├── Testimonials.tsx        # Testimonials carousel
│       ├── Metrics.tsx             # Animated metrics counters
│       ├── IntegrationsOrbit.tsx   # Integrations orbit animation
│       ├── Features.tsx            # Feature grid
│       ├── HowItWorks.tsx          # How it works steps
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
| `/platform` | Full platform overview with all sections |
| `/agents` | AI Agent Fleet — Sales, Support, Scheduling, Collections, Inbound agents |
| `/integrations` | All 5 integration categories on one page with sticky category nav |
| `/pricing` | Starter / Growth / Enterprise with monthly/annual toggle (10% off annual) |
| `/faq` | 5-tab FAQ (General, Platform, Integrations, Security, Billing) |
| `/book-demo` | Lead capture form → Calendly popup → confirmation screen |
| `/signup` | Sign up page |
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
git clone <repo-url>
cd emaavy2

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
| Background (dark) | `#060913` |
| Emaavy Deep | `#18345d` |
| Indigo accent | `#6366f1` |
| Body text (dark) | `#09090b` |

### Fonts

- **Headings:** Plus Jakarta Sans — loaded via `next/font/google`, mapped through `--font-jakarta` → `--font-clash` CSS variable → `font-display` Tailwind class
- **Body:** General Sans — loaded via Fontshare CDN

---

## Calendly Integration (Book Demo)

The `/book-demo` page uses the **Calendly Popup Widget**.

**Setup required:**
1. Create a Calendly account at [calendly.com](https://calendly.com)
2. Create an event type (e.g. `demo` — 30 minutes)
3. In Calendly → Event settings → Notifications → add `support@emaavy.ai` as a host notification email
4. Update `CALENDLY_URL` in `app/book-demo/page.tsx`:

```ts
const CALENDLY_URL = 'https://calendly.com/YOUR_USERNAME/demo';
```

The form prefills Calendly with the user's name, email, company, team size, and use case. After booking, the page listens for the `calendly.event_scheduled` browser event and shows a confirmation screen.

---

## Contact & Legal

| | |
|---|---|
| Support email | support@emaavy.ai |
| Registered address | Oakhla Industrial Area, Phase 2, A Block, Plot No. 78, 3rd Floor, New Delhi – 110020, India |

---

## Navbar Order

Platform → Integrations → AI Agents → Pricing → FAQ

---

## Notes for Developers

- All `'use client'` components use Framer Motion for animations — avoid adding heavy third-party animation libraries
- The `SystemArchitecture` component auto-cycles through 5 layers every 4.5 seconds using `setTimeout`; it pauses on hover of the card
- Integration category pages under `/integrations/[category]` exist but the main unified `/integrations` page is the primary entry point from the navbar
- The `BRANDS` registry in `app/integrations/page.tsx` maps provider names to their Simple Icons and brand hex colors for the hover color transition effect
- Footer has two columns: **Product** (Platform, AI Agents, Integrations, Pricing, FAQ) and **Legal** (Privacy Policy, Terms of Service)
