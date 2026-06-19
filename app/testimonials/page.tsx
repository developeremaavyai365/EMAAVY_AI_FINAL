import Link from 'next/link';
import Image from 'next/image';
import { HiStar, HiArrowLeft } from 'react-icons/hi2';

export const metadata = {
  title: 'Customer Testimonials — Emaavy',
  description: 'See what business leaders say about Emaavy.',
};

const ALL_TESTIMONIALS = [
  {
    quote: 'Emaavy transformed how we handle customer operations. We cut response times by 80% and our team finally focuses on high-value work.',
    name: 'Sarah Chen', role: 'VP of Operations', company: 'TechFlow Inc.', rating: 5, initials: 'SC',
    gradient: 'from-blue-500 to-blue-700', tag: 'Operations',
  },
  {
    quote: 'The workflow builder is incredibly intuitive. We went from manual processes to full automation in under two weeks.',
    name: 'Marcus Williams', role: 'Director of Sales', company: 'GrowthScale', rating: 5, initials: 'MW',
    gradient: 'from-violet-500 to-violet-700', tag: 'Sales',
  },
  {
    quote: 'Enterprise-grade security and seamless integrations made Emaavy the obvious choice for our global operations team.',
    name: 'Priya Sharma', role: 'CTO', company: 'Nexus Digital', rating: 5, initials: 'PS',
    gradient: 'from-emaavy-bolt to-emaavy-deep', tag: 'Enterprise',
  },
  {
    quote: 'Our AI support agent now handles 70% of inbound tickets automatically. Customer satisfaction actually went up — not down.',
    name: 'James Okafor', role: 'Head of Customer Success', company: 'CloudBase', rating: 5, initials: 'JO',
    gradient: 'from-emerald-500 to-emerald-700', tag: 'Support',
  },
  {
    quote: 'We deployed a lead qualification agent in one afternoon. It books meetings directly into our reps\' calendars. Game changer.',
    name: 'Ananya Reddy', role: 'Founder & CEO', company: 'DataSync', rating: 5, initials: 'AR',
    gradient: 'from-amber-500 to-orange-600', tag: 'Sales',
  },
  {
    quote: 'The integrations ecosystem is unmatched. We connected Salesforce, Slack, and WhatsApp in one session without writing a single line of code.',
    name: 'Rohan Mehta', role: 'COO', company: 'Acme Ventures', rating: 5, initials: 'RM',
    gradient: 'from-rose-500 to-rose-700', tag: 'Integrations',
  },
  {
    quote: 'Emaavy\'s telephony agents handle our entire appointment reminder workflow. We went from 40% no-shows to under 10%.',
    name: 'Lisa Tran', role: 'Operations Manager', company: 'MediSchedule', rating: 5, initials: 'LT',
    gradient: 'from-cyan-500 to-cyan-700', tag: 'Operations',
  },
  {
    quote: 'The ROI was clear within the first month. We saved 340 hours of manual work and reinvested that time into actual growth.',
    name: 'David Osei', role: 'CFO', company: 'FinFlow', rating: 5, initials: 'DO',
    gradient: 'from-indigo-500 to-indigo-700', tag: 'Finance',
  },
  {
    quote: 'Switching to Emaavy from our patchwork of tools was the best platform decision we\'ve made this year.',
    name: 'Kavya Singh', role: 'VP Engineering', company: 'BuildFast', rating: 5, initials: 'KS',
    gradient: 'from-teal-500 to-teal-700', tag: 'Engineering',
  },
];

const STATS = [
  { value: '4.9/5', label: 'Average rating' },
  { value: '200+', label: 'Enterprise clients' },
  { value: '97%', label: 'Customer retention' },
  { value: '72', label: 'NPS score' },
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-emaavy-surface">
      <div className="border-b border-emaavy-border bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/"><Image src="/brand/emaavy-logo.svg" alt="Emaavy" width={120} height={24} className="h-auto" /></Link>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-emaavy-muted transition-colors hover:text-emaavy-deep">
            <HiArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </div>
      </div>

      <div className="section-container py-20">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-label">Testimonials</span>
          <h1 className="section-title mt-1">What Our Customers Say</h1>
          <p className="section-subtitle mx-auto">
            Real stories from operations teams, founders, and enterprise leaders who use Emaavy every day.
          </p>
        </div>

        {/* Stats row */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-emaavy-border bg-white p-6 text-center shadow-sm">
              <p className="font-display text-3xl font-bold text-emaavy-deep">{stat.value}</p>
              <p className="mt-1 text-xs font-medium text-emaavy-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonial grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ALL_TESTIMONIALS.map((t) => (
            <div key={t.name} className="glass-card flex flex-col rounded-2xl p-8 transition-all duration-300 hover:shadow-brand-lg">
              <div className="mb-1 flex items-center justify-between">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <HiStar key={j} className="h-4 w-4 text-amber-400" />
                  ))}
                </div>
                <span className="rounded-full bg-emaavy-accent px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emaavy-bolt">
                  {t.tag}
                </span>
              </div>
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-emaavy-body">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-4 border-t border-emaavy-border pt-6">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${t.gradient} text-sm font-bold text-white`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-emaavy-deep">{t.name}</p>
                  <p className="text-sm text-emaavy-muted">{t.role} · {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 rounded-3xl bg-emaavy-deep p-12 text-center">
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">Join 200+ companies automating with Emaavy</h2>
          <p className="mt-3 text-white/60">Book a live demo and see a real Emaavy agent in action — built for your workflow.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/book-demo" className="inline-flex items-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-emaavy-deep transition-all hover:bg-white/90">
              Book a demo
            </Link>
            <Link href="/agents" className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10">
              Explore agents
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
