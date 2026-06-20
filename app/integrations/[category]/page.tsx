import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { HiArrowLeft, HiOutlineCheckCircle, HiOutlineArrowTopRightOnSquare, HiOutlineClock } from 'react-icons/hi2';
import { INTEGRATION_CATEGORIES } from '@/lib/constants';

/* Brand-coloured letter chip */
const BRAND_COLORS: Record<string, { bg: string; fg: string }> = {
  Vobiz:         { bg: '#4F46E5', fg: '#fff' },
  Twilio:        { bg: '#F22F46', fg: '#fff' },
  Plivo:         { bg: '#5856D6', fg: '#fff' },
  Exotel:        { bg: '#1A56DB', fg: '#fff' },
  Telnyx:        { bg: '#00C5C1', fg: '#fff' },
  Vonage:        { bg: '#7C3AED', fg: '#fff' },
  Bandwidth:     { bg: '#E63946', fg: '#fff' },
  Aircall:       { bg: '#00D4B1', fg: '#fff' },
  RingCentral:   { bg: '#F6821F', fg: '#fff' },
  OpenAI:        { bg: '#10A37F', fg: '#fff' },
  Anthropic:     { bg: '#D97757', fg: '#fff' },
  Google:        { bg: '#4285F4', fg: '#fff' },
  Mistral:       { bg: '#FF7000', fg: '#fff' },
  Meta:          { bg: '#0866FF', fg: '#fff' },
  Groq:          { bg: '#F55036', fg: '#fff' },
  'Together AI': { bg: '#6C47FF', fg: '#fff' },
  Cohere:        { bg: '#39594D', fg: '#fff' },
  'Custom LLM':  { bg: '#7C3AED', fg: '#fff' },
  ElevenLabs:    { bg: '#111',    fg: '#fff' },
  Deepgram:      { bg: '#101827', fg: '#fff' },
  'Sarvam AI':   { bg: '#FF6B35', fg: '#fff' },
  AssemblyAI:    { bg: '#1A1A2E', fg: '#fff' },
  Rev:           { bg: '#0070C9', fg: '#fff' },
  Microsoft:     { bg: '#00A4EF', fg: '#fff' },
  Amazon:        { bg: '#FF9900', fg: '#fff' },
  PlayHT:        { bg: '#7B2FBE', fg: '#fff' },
  LMNT:          { bg: '#2563EB', fg: '#fff' },
  Webhooks:      { bg: '#059669', fg: '#fff' },
  WhatsApp:      { bg: '#25D366', fg: '#fff' },
  'Google Calendar': { bg: '#4285F4', fg: '#fff' },
  'Cal.com':     { bg: '#111',    fg: '#fff' },
  Salesforce:    { bg: '#00A1E0', fg: '#fff' },
  HubSpot:       { bg: '#FF7A59', fg: '#fff' },
  Slack:         { bg: '#4A154B', fg: '#fff' },
  Shopify:       { bg: '#96BF48', fg: '#fff' },
  Stripe:        { bg: '#635BFF', fg: '#fff' },
  Notion:        { bg: '#222',    fg: '#fff' },
  Zapier:        { bg: '#FF4A00', fg: '#fff' },
  Airtable:      { bg: '#FCB400', fg: '#111' },
  Pipedrive:     { bg: '#1A1F36', fg: '#fff' },
  Zoho:          { bg: '#E42527', fg: '#fff' },
  Intercom:      { bg: '#286EFA', fg: '#fff' },
  Freshdesk:     { bg: '#25C16F', fg: '#fff' },
  Calendly:      { bg: '#006BFF', fg: '#fff' },
  Zoom:          { bg: '#2D8CFF', fg: '#fff' },
};

function BrandChip({ name, dimmed }: { name: string; dimmed?: boolean }) {
  const color = BRAND_COLORS[name] ?? { bg: '#4a658b', fg: '#fff' };
  return (
    <div
      className="flex h-11 w-11 items-center justify-center rounded-xl text-xs font-bold shadow-sm"
      style={{ background: color.bg, color: color.fg, opacity: dimmed ? 0.45 : 1 }}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

type Integration = {
  name: string;
  desc: string;
  badge?: string;
  live?: boolean;
};

type CategoryData = {
  headline: string;
  subhead: string;
  integrations: Integration[];
  useCases: string[];
};

const CATEGORY_DATA: Record<string, CategoryData> = {
  telephone: {
    headline: 'Telephony & Voice Integrations',
    subhead: 'Connect Emaavy with leading voice and telephony providers to deploy AI calling agents, run outbound campaigns, and handle inbound calls at scale.',
    integrations: [
      { name: 'Vobiz',       desc: "Emaavy's native telephony partner for India — the default carrier powering Emaavy calls.", badge: 'Native', live: true },
      { name: 'Exotel',      desc: "India's leading cloud telephony platform built for high-volume enterprise calling.", badge: 'India', live: true },
      { name: 'Plivo',       desc: 'High-volume voice API with strong India and global coverage.', live: true },
      { name: 'Twilio',      desc: 'Global programmable voice with automatic failover and wide number availability.', live: true },
      { name: 'Telnyx',      desc: 'Carrier-grade SIP trunking and programmable voice with real-time analytics.' },
      { name: 'Vonage',      desc: 'Enterprise voice API with advanced call routing.' },
      { name: 'Aircall',     desc: 'Cloud call center solution with agent productivity tools.' },
      { name: 'RingCentral', desc: 'UCaaS platform for enterprise voice, video, and messaging.' },
    ],
    useCases: ['AI outbound sales calls', 'Automated appointment reminders', 'Inbound support routing', 'Lead follow-up campaigns', 'Missed call automation'],
  },
  llm: {
    headline: 'LLM & AI Model Integrations',
    subhead: 'Plug in your preferred language model — or bring your own. Emaavy routes intelligently and streams tokens directly into the voice pipeline for natural, low-latency conversations.',
    integrations: [
      { name: 'OpenAI',       desc: 'GPT-4o with streaming support for complex reasoning and natural conversations.', badge: 'Popular', live: true },
      { name: 'Anthropic',    desc: 'Claude — thoughtful, nuanced responses with strong instruction-following.', live: true },
      { name: 'Google',       desc: 'Gemini — multimodal model with strong multilingual and reasoning capabilities.', live: true },
      { name: 'Groq',         desc: 'Ultra-fast inference for real-time voice agent conversations.', badge: 'Fast', live: true },
      { name: 'Custom LLM',   desc: 'Bring your own model — any OpenAI-compatible endpoint works with Emaavy.', badge: 'BYOM', live: true },
      { name: 'Mistral',      desc: 'European open-weight models optimised for efficiency.' },
      { name: 'Meta',         desc: 'Llama — open-source frontier model for self-hosted inference.' },
      { name: 'Together AI',  desc: 'Managed inference for 50+ open models with fine-tuning support.' },
    ],
    useCases: ['Intelligent agent reasoning', 'Multilingual conversations', 'Knowledge base Q&A', 'Personalised conversations', 'Custom model deployment'],
  },
  'speech-to-text': {
    headline: 'Speech-to-Text Integrations',
    subhead: 'Accurately transcribe voice in real time — powering your AI agents with precise spoken understanding so they can respond naturally without any delay.',
    integrations: [
      { name: 'ElevenLabs',  desc: "Emaavy's primary STT provider — real-time transcription with high accuracy across accents and languages.", badge: 'Live', live: true },
      { name: 'Deepgram',    desc: 'Real-time STT with word-level timestamps and speaker identification.' },
      { name: 'Sarvam AI',   desc: 'Indian language STT for Hindi, Tamil, Telugu, and 10+ Indic languages.', badge: 'India' },
      { name: 'AssemblyAI',  desc: 'Audio intelligence API with topic detection and PII redaction.' },
      { name: 'Microsoft',   desc: 'Azure Speech — enterprise STT with custom vocabulary support.' },
      { name: 'Google',      desc: 'Google STT — high-accuracy recognition optimised for telephony audio.' },
      { name: 'Amazon',      desc: 'AWS Transcribe — serverless transcription with call analytics.' },
      { name: 'Rev',         desc: 'Hybrid transcription for maximum accuracy on difficult audio.' },
    ],
    useCases: ['Real-time call transcription', 'Voice agent understanding', 'Call recording analysis', 'Multilingual support', 'Compliance transcription'],
  },
  'text-to-speech': {
    headline: 'Text-to-Speech Integrations',
    subhead: 'Give your AI agents a natural, expressive voice — ElevenLabs powers Emaavy voices today, with more providers coming soon.',
    integrations: [
      { name: 'ElevenLabs',  desc: 'Hyper-realistic voice synthesis with ultra-low latency streaming — the voice behind every Emaavy agent.', badge: 'Live', live: true },
      { name: 'Sarvam AI',   desc: 'Natural Indic language TTS across Hindi, Tamil, Telugu, and 10+ languages.', badge: 'India' },
      { name: 'Microsoft',   desc: 'Azure Neural TTS — neural voices for enterprise call centres.' },
      { name: 'Google',      desc: 'Google Cloud TTS — WaveNet voices with pitch, speed, and volume controls.' },
      { name: 'Amazon',      desc: 'Amazon Polly — neural TTS with 60+ voices.' },
      { name: 'Deepgram',    desc: 'Deepgram Aura — sub-100ms latency TTS for conversational AI.' },
      { name: 'PlayHT',      desc: 'Voice cloning and ultra-realistic voices with streaming support.' },
      { name: 'LMNT',        desc: 'Low-latency TTS optimised for real-time conversational applications.' },
    ],
    useCases: ['AI voice agents', 'Natural caller conversations', 'Multilingual TTS', 'Custom branded voices', 'Low-latency voice responses'],
  },
  tools: {
    headline: 'Business Tool Integrations',
    subhead: 'Connect Emaavy to the tools your team already uses — Webhooks, WhatsApp, and Calendar are live today. CRM and productivity integrations are coming soon.',
    integrations: [
      { name: 'Webhooks',        desc: 'Send real-time event data to your own backend or any third-party service the moment a call ends.', badge: 'Live', live: true },
      { name: 'WhatsApp',        desc: 'Send follow-up messages and notifications via MSG91 WhatsApp API after every call.', badge: 'Live', live: true },
      { name: 'Google Calendar', desc: 'Book meetings directly into Google Calendar mid-call via Cal.com or Google integration.', badge: 'Live', live: true },
      { name: 'Cal.com',         desc: 'Open-source scheduling — let agents check availability and book slots in real time.', badge: 'Live', live: true },
      { name: 'HubSpot',         desc: 'Sync leads, deals, and call outcomes bidirectionally with full CRM automation.' },
      { name: 'Salesforce',      desc: 'Create contacts, update opportunities, and log calls directly from Emaavy agents.' },
      { name: 'Slack',           desc: 'Send agent alerts, workflow notifications, and escalation messages to any Slack channel.' },
      { name: 'Zapier',          desc: 'Connect to 5,000+ apps via Zapier as a catch-all integration layer.' },
      { name: 'Pipedrive',       desc: 'Auto-create deals, update stages, and log agent call outcomes into your pipeline.' },
      { name: 'Zoho',            desc: 'Full bidirectional sync with Zoho CRM modules and custom fields.' },
      { name: 'Freshdesk',       desc: 'Auto-create and update support tickets from AI agent conversations.' },
      { name: 'Intercom',        desc: 'Escalate agent conversations to Intercom live chat with full context.' },
      { name: 'Shopify',         desc: 'Sync orders, customers, and inventory — trigger automations on purchase events.' },
      { name: 'Stripe',          desc: 'Handle billing events, subscriptions, and payment notifications inside workflows.' },
      { name: 'Notion',          desc: 'Read and write Notion databases to log activity and update records.' },
      { name: 'Airtable',        desc: 'Use Airtable as a dynamic data source or output for agent actions.' },
    ],
    useCases: ['Webhook-based automation', 'WhatsApp follow-ups', 'Meeting booking', 'CRM sync (coming soon)', 'Notification workflows'],
  },
};

export function generateStaticParams() {
  return INTEGRATION_CATEGORIES.map((c) => ({
    category: c.href.split('/').pop() as string,
  }));
}

export default function IntegrationCategoryPage({ params }: { params: { category: string } }) {
  const data = CATEGORY_DATA[params.category];
  const catMeta = INTEGRATION_CATEGORIES.find((c) => c.href.endsWith(params.category));

  if (!data || !catMeta) notFound();

  return (
    <div className="min-h-screen bg-emaavy-surface">
      {/* Top bar */}
      <div className="border-b border-emaavy-border bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/">
            <Image src="/brand/emaavy-logo.svg" alt="Emaavy" width={120} height={24} className="h-auto" />
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-emaavy-muted transition-colors hover:text-emaavy-deep">
            <HiArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="border-b border-emaavy-border bg-emaavy-surface px-6 py-3">
        <div className="mx-auto flex max-w-7xl gap-2 text-xs text-emaavy-muted">
          <Link href="/" className="hover:text-emaavy-deep">Home</Link>
          <span>/</span>
          <span>Integrations</span>
          <span>/</span>
          <span className="font-medium text-emaavy-deep">{catMeta.label}</span>
        </div>
      </div>

      <div className="section-container py-16">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label">Integrations · {catMeta.label}</span>
          <h1 className="section-title mt-1">{data.headline}</h1>
          <p className="section-subtitle mx-auto">{data.subhead}</p>
        </div>

        {/* Use cases */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {data.useCases.map((uc) => (
            <span key={uc} className="inline-flex items-center gap-1.5 rounded-full border border-emaavy-border bg-white px-3 py-1.5 text-xs font-medium text-emaavy-secondary shadow-sm">
              <HiOutlineCheckCircle className="h-3.5 w-3.5 text-emerald-500" />
              {uc}
            </span>
          ))}
        </div>

        {/* Integration cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.integrations.map((integ) => (
            <div
              key={integ.name}
              className="glass-card group flex flex-col rounded-2xl p-6 transition-all duration-300"
              style={{ opacity: integ.live ? 1 : 0.65 }}
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <BrandChip name={integ.name} dimmed={!integ.live} />
                {integ.live ? (
                  <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    {integ.badge ?? 'Live'}
                  </span>
                ) : (
                  <span className="rounded-full bg-gray-100 border border-gray-200 px-2 py-0.5 text-[10px] font-semibold text-gray-400 flex items-center gap-1">
                    <HiOutlineClock className="h-3 w-3" /> Coming Soon
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-emaavy-deep">{integ.name}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-emaavy-secondary">{integ.desc}</p>
              {integ.live && (
                <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                  <HiOutlineCheckCircle className="h-3.5 w-3.5" />
                  Available now
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Other categories */}
        <div className="mt-16 rounded-2xl border border-emaavy-border bg-white p-8">
          <h2 className="mb-6 text-lg font-semibold text-emaavy-deep">Explore other integration categories</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {INTEGRATION_CATEGORIES.filter((c) => !c.href.endsWith(params.category)).map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="flex items-center gap-3 rounded-xl border border-emaavy-border p-4 transition-all hover:border-emaavy-bolt/30 hover:shadow-brand"
              >
                <div>
                  <p className="text-sm font-semibold text-emaavy-deep">{cat.label}</p>
                  <p className="mt-0.5 text-xs text-emaavy-muted">{cat.desc}</p>
                </div>
                <HiOutlineArrowTopRightOnSquare className="ml-auto h-4 w-4 shrink-0 text-emaavy-muted" />
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-3xl bg-emaavy-deep p-12 text-center">
          <h2 className="font-display text-2xl font-semibold text-white">Ready to connect your stack?</h2>
          <p className="mt-3 text-white/60">Get started today — live integrations available on every plan.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/signup" className="inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-emaavy-deep transition-all hover:bg-white/90">
              Start Free
            </Link>
            <Link href="/book-demo" className="inline-flex rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10">
              Book a Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
