'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { HiOutlineShieldCheck, HiOutlineArrowRight } from 'react-icons/hi2';

const EFFECTIVE_DATE = 'June 19, 2026';
const LAST_UPDATED   = 'June 19, 2026';

const SECTIONS = [
  { id: 'overview',        title: '1. Overview' },
  { id: 'information',     title: '2. Information We Collect' },
  { id: 'call-data',       title: '3. Call & Voice Data' },
  { id: 'use',             title: '4. How We Use Your Information' },
  { id: 'sharing',         title: '5. Sharing & Disclosure' },
  { id: 'retention',       title: '6. Data Retention' },
  { id: 'security',        title: '7. Security' },
  { id: 'international',   title: '8. International Transfers' },
  { id: 'rights',          title: '9. Your Rights' },
  { id: 'cookies',         title: '10. Cookies & Tracking' },
  { id: 'children',        title: '11. Children\'s Privacy' },
  { id: 'changes',         title: '12. Changes to This Policy' },
  { id: 'contact',         title: '13. Contact Us' },
];

function Fade({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(id);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen" style={{ background: '#060913' }}>

        {/* Hero */}
        <section className="relative overflow-hidden px-4 pb-16 pt-40">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 65%)', filter: 'blur(80px)' }} />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-400">
                <HiOutlineShieldCheck className="h-3.5 w-3.5" /> Legal
              </span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Privacy Policy
            </motion.h1>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 flex flex-wrap gap-6 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <span>Effective date: <span className="text-white/70 font-medium">{EFFECTIVE_DATE}</span></span>
              <span>Last updated: <span className="text-white/70 font-medium">{LAST_UPDATED}</span></span>
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-5 max-w-2xl text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Emaavy, Inc. (&ldquo;Emaavy&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you use our AI agent and workflow automation platform.
            </motion.p>
          </div>
        </section>

        {/* Body */}
        <section className="mx-auto max-w-7xl px-4 pb-32">
          <div className="grid gap-12 lg:grid-cols-[240px_1fr]">

            {/* Sticky TOC */}
            <Fade>
              <nav className="hidden lg:block lg:sticky lg:top-28">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>Contents</p>
                <ul className="space-y-1">
                  {SECTIONS.map(s => (
                    <li key={s.id}>
                      <button onClick={() => scrollTo(s.id)}
                        className="w-full rounded-lg px-3 py-2 text-left text-xs transition-all duration-200"
                        style={activeSection === s.id
                          ? { background: 'rgba(99,102,241,0.15)', color: '#818cf8' }
                          : { color: 'rgba(255,255,255,0.35)' }}>
                        {s.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </Fade>

            {/* Content */}
            <div className="space-y-14 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>

              <Fade delay={0.05}>
                <div id="overview" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">1. Overview</h2>
                  <p className="mb-3">This Privacy Policy applies to all products and services offered by Emaavy, Inc., including our web application, API, AI voice agents, workflow automation platform, and any related services (collectively, the &ldquo;Services&rdquo;).</p>
                  <p className="mb-3">By accessing or using our Services, you agree to the collection and use of information in accordance with this policy. If you do not agree, please discontinue use of the Services.</p>
                  <p>Emaavy operates as both a data controller (for account and usage data) and a data processor (for customer data processed through AI agents on behalf of our customers). This distinction is important for understanding our respective obligations under applicable data protection laws.</p>
                </div>
              </Fade>

              <Fade>
                <div id="information" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">2. Information We Collect</h2>
                  <p className="mb-4">We collect information in three ways: information you provide directly, information we collect automatically, and information received from third parties.</p>

                  <h3 className="mb-2 font-semibold text-white/80">2.1 Account &amp; Registration Data</h3>
                  <p className="mb-4">When you create an account, we collect your name, email address, company name, job title, and billing information. We use Stripe for payment processing and do not store full credit card numbers on our servers.</p>

                  <h3 className="mb-2 font-semibold text-white/80">2.2 Usage &amp; Platform Data</h3>
                  <p className="mb-4">We automatically collect data about how you interact with our platform, including: pages visited, features used, agent configurations created, workflow runs executed, API call logs, error logs, browser type, IP address, device identifiers, and session duration.</p>

                  <h3 className="mb-2 font-semibold text-white/80">2.3 Communications Data</h3>
                  <p>When you contact our support team, participate in demos, or communicate with us via email or chat, we retain records of those communications to improve our services and resolve disputes.</p>
                </div>
              </Fade>

              <Fade>
                <div id="call-data" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">3. Call &amp; Voice Data</h2>
                  <div className="mb-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                    <p className="text-sm font-semibold text-amber-400">Important Notice Regarding Call Data</p>
                    <p className="mt-1 text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>Call recordings, voice data, and transcripts are among the most sensitive data types processed through our platform. The following provisions apply specifically to this data.</p>
                  </div>

                  <h3 className="mb-2 font-semibold text-white/80">3.1 Call Recordings &amp; Transcripts</h3>
                  <p className="mb-4">AI voice agents deployed through Emaavy may record and transcribe conversations between the agent and end users (callers). This data is processed to enable agent functionality including intent detection, response generation, CRM updates, and analytics. Customers are solely responsible for ensuring callers are informed of recording in accordance with applicable wiretapping and recording consent laws (including two-party consent laws in relevant jurisdictions).</p>

                  <h3 className="mb-2 font-semibold text-white/80">3.2 Speech Data &amp; LLM Processing</h3>
                  <p className="mb-4">Voice audio is transcribed through integrated STT (speech-to-text) providers including Deepgram, OpenAI Whisper, and others as configured by the customer. Transcripts are passed to LLM providers (OpenAI, Anthropic, Google, etc.) for agent reasoning. Data shared with third-party model providers is governed by their respective privacy policies and data processing agreements. We do not permit LLM providers to use your call data for training their models without your explicit consent.</p>

                  <h3 className="mb-2 font-semibold text-white/80">3.3 PII in Voice Data</h3>
                  <p className="mb-4">Callers may disclose personally identifiable information (PII) during conversations, including names, phone numbers, addresses, financial information, and health information. Customers must configure their agents and data retention settings in compliance with all applicable regulations. Emaavy provides optional PII redaction features to automatically mask sensitive data in stored transcripts.</p>

                  <h3 className="mb-2 font-semibold text-white/80">3.4 Retention of Call Data</h3>
                  <p>By default, call recordings and transcripts are retained for 90 days. Customers may configure shorter retention periods, enable auto-deletion, or export data at any time from their account settings. Enterprise customers may negotiate custom data residency and retention terms.</p>
                </div>
              </Fade>

              <Fade>
                <div id="use" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">4. How We Use Your Information</h2>
                  <p className="mb-4">We use the information we collect for the following purposes:</p>
                  <ul className="space-y-3">
                    {[
                      ['Service Delivery', 'To provide, operate, maintain, and improve the Emaavy platform and Services.'],
                      ['Agent Operation', 'To execute AI agent calls, transcribe audio, generate responses, and log outcomes on your behalf.'],
                      ['Billing & Payments', 'To process subscription payments, calculate usage-based charges, and issue invoices.'],
                      ['Customer Support', 'To respond to support requests, troubleshoot issues, and provide onboarding assistance.'],
                      ['Security & Fraud Prevention', 'To detect, investigate, and prevent unauthorized access, abuse, and fraudulent activity.'],
                      ['Analytics & Improvement', 'To analyse platform usage patterns and improve features, performance, and reliability.'],
                      ['Legal Compliance', 'To comply with applicable laws, regulations, legal processes, and governmental requests.'],
                      ['Communications', 'To send transactional emails (receipts, alerts, system notifications) and, where permitted, product updates.'],
                    ].map(([title, desc]) => (
                      <li key={title} className="flex gap-3">
                        <span className="mt-0.5 text-indigo-400">✓</span>
                        <span><span className="font-semibold text-white/80">{title}:</span> {desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Fade>

              <Fade>
                <div id="sharing" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">5. Sharing &amp; Disclosure</h2>
                  <p className="mb-4">We do not sell your personal information. We may share your information in the following limited circumstances:</p>

                  <h3 className="mb-2 font-semibold text-white/80">5.1 Integration Partners</h3>
                  <p className="mb-4">When you configure integrations (e.g., Salesforce, HubSpot, Slack), data is shared with those platforms as directed by your agent and workflow configuration. You control which data is shared through your integration settings.</p>

                  <h3 className="mb-2 font-semibold text-white/80">5.2 AI &amp; Infrastructure Subprocessors</h3>
                  <p className="mb-4">We engage subprocessors including telephony providers (Twilio, Plivo, Exotel, Telnyx), LLM providers (OpenAI, Anthropic, Google, Mistral), STT providers (Deepgram, Microsoft Azure, Amazon Web Services), TTS providers (ElevenLabs, Amazon Polly, Google TTS), and cloud infrastructure providers. A complete and current list of subprocessors is maintained at emaavy.com/subprocessors.</p>

                  <h3 className="mb-2 font-semibold text-white/80">5.3 Legal Requirements</h3>
                  <p className="mb-4">We may disclose your information if required to do so by law, court order, or government authority, or when we believe disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or comply with a legal obligation.</p>

                  <h3 className="mb-2 font-semibold text-white/80">5.4 Business Transfers</h3>
                  <p>In the event of a merger, acquisition, financing, or sale of all or a portion of our assets, your information may be transferred as part of that transaction. We will notify you via email or a prominent notice on our website prior to your information becoming subject to a different privacy policy.</p>
                </div>
              </Fade>

              <Fade>
                <div id="retention" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">6. Data Retention</h2>
                  <p className="mb-4">We retain your personal information for as long as necessary to provide the Services and fulfil the purposes described in this policy, unless a longer retention period is required or permitted by law.</p>
                  <div className="overflow-hidden rounded-xl border border-white/8">
                    <table className="w-full text-xs">
                      <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                          <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-white/40">Data Type</th>
                          <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-white/40">Default Retention</th>
                          <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-white/40">Configurable</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.05]">
                        {[
                          ['Account & billing data',    'Duration of account + 7 years', 'No'],
                          ['Call recordings',           '90 days',                       'Yes'],
                          ['Call transcripts',          '90 days',                       'Yes'],
                          ['Agent configuration logs',  '12 months',                     'Enterprise only'],
                          ['Usage & analytics data',    '24 months',                     'No'],
                          ['Support communications',    '3 years',                       'No'],
                          ['API access logs',           '12 months',                     'No'],
                        ].map(([type, retention, config]) => (
                          <tr key={type} className="hover:bg-white/[0.02]">
                            <td className="px-4 py-3 text-white/70">{type}</td>
                            <td className="px-4 py-3 text-white/50">{retention}</td>
                            <td className="px-4 py-3">
                              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${config === 'Yes' ? 'bg-emerald-500/15 text-emerald-400' : config === 'No' ? 'bg-white/8 text-white/30' : 'bg-amber-500/15 text-amber-400'}`}>
                                {config}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4">Upon account termination, we will delete or anonymise your personal information within 30 days, except where we are required to retain it for legal or compliance purposes.</p>
                </div>
              </Fade>

              <Fade>
                <div id="security" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">7. Security</h2>
                  <p className="mb-4">We implement and maintain commercially reasonable technical, administrative, and physical security measures designed to protect your information from unauthorized access, alteration, disclosure, or destruction.</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      ['Encryption at rest', 'AES-256 encryption for all stored data including call recordings, transcripts, and configuration files.'],
                      ['Encryption in transit', 'TLS 1.3 for all data transmitted between your browser, our APIs, and third-party providers.'],
                      ['SOC 2 Type II', 'Annual third-party audits covering security, availability, processing integrity, confidentiality, and privacy.'],
                      ['Access controls', 'Role-based access controls, least-privilege principles, and mandatory MFA for all internal systems.'],
                      ['Penetration testing', 'Annual third-party penetration tests with remediation SLAs. Results available to Enterprise customers under NDA.'],
                      ['Incident response', 'Documented incident response procedures with customer notification within 72 hours of confirmed data breach.'],
                    ].map(([title, desc]) => (
                      <div key={title} className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
                        <p className="mb-1.5 text-sm font-semibold text-white/80">{title}</p>
                        <p className="text-xs leading-relaxed text-white/45">{desc}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4">No method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security.</p>
                </div>
              </Fade>

              <Fade>
                <div id="international" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">8. International Data Transfers</h2>
                  <p className="mb-3">Emaavy is headquartered in India and operates infrastructure in multiple regions. If you are located outside India, your information may be transferred to, stored in, and processed in India and other countries where our service providers maintain infrastructure.</p>
                  <p className="mb-3">For customers in the European Economic Area (EEA), United Kingdom, or Switzerland, we rely on Standard Contractual Clauses (SCCs) approved by the European Commission as the legal mechanism for transferring personal data internationally.</p>
                  <p>Enterprise customers may request data residency in specific regions (India, EU, US) to ensure their data does not leave their preferred jurisdiction. Please contact our sales team to discuss data residency options.</p>
                </div>
              </Fade>

              <Fade>
                <div id="rights" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">9. Your Rights</h2>
                  <p className="mb-4">Depending on your location, you may have the following rights regarding your personal information:</p>
                  <ul className="space-y-3">
                    {[
                      ['Right of Access', 'Request a copy of the personal information we hold about you.'],
                      ['Right to Rectification', 'Request correction of inaccurate or incomplete personal information.'],
                      ['Right to Erasure', 'Request deletion of your personal information, subject to certain exceptions (e.g., legal retention obligations).'],
                      ['Right to Restriction', 'Request that we restrict the processing of your personal information in certain circumstances.'],
                      ['Right to Portability', 'Receive your personal information in a structured, commonly used, machine-readable format.'],
                      ['Right to Object', 'Object to our processing of your personal information where we rely on legitimate interests as our legal basis.'],
                      ['Right to Withdraw Consent', 'Where processing is based on consent, withdraw that consent at any time without affecting prior processing.'],
                    ].map(([right, desc]) => (
                      <li key={right} className="flex gap-3">
                        <span className="mt-0.5 text-indigo-400">→</span>
                        <span><span className="font-semibold text-white/80">{right}:</span> {desc}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4">To exercise any of these rights, please submit a request to <a href="mailto:support@emaavy.ai" className="text-indigo-400 hover:underline">support@emaavy.ai</a>. We will respond within 30 days. We may require verification of your identity before processing your request.</p>
                </div>
              </Fade>

              <Fade>
                <div id="cookies" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">10. Cookies &amp; Tracking</h2>
                  <p className="mb-4">We use cookies and similar tracking technologies to operate and improve the Services. Cookies are small data files placed on your device.</p>
                  <div className="space-y-3">
                    {[
                      { type: 'Strictly necessary', desc: 'Essential for the platform to function. Cannot be disabled. Includes session authentication, CSRF protection, and load balancing.', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                      { type: 'Functional', desc: 'Remember your preferences and settings (e.g., dashboard layout, language). Can be disabled without affecting core functionality.', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                      { type: 'Analytics', desc: 'Help us understand how users navigate the platform. We use self-hosted analytics that do not share data with third parties. Can be opted out.', color: 'text-amber-400', bg: 'bg-amber-500/10' },
                    ].map(({ type, desc, color, bg }) => (
                      <div key={type} className={`rounded-xl border border-white/8 ${bg} p-4`}>
                        <p className={`mb-1 text-sm font-semibold ${color}`}>{type}</p>
                        <p className="text-xs leading-relaxed text-white/50">{desc}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4">We do not use advertising cookies or share your data with advertising networks. You can manage cookie preferences through your browser settings or our in-app cookie preferences panel.</p>
                </div>
              </Fade>

              <Fade>
                <div id="children" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">11. Children&apos;s Privacy</h2>
                  <p>Our Services are not directed to, and we do not knowingly collect personal information from, individuals under the age of 18. If we become aware that we have inadvertently collected personal information from a child under 18 without parental consent, we will take steps to delete such information as soon as possible. If you believe we have collected information from a minor, please contact us at <a href="mailto:support@emaavy.ai" className="text-indigo-400 hover:underline">support@emaavy.ai</a>.</p>
                </div>
              </Fade>

              <Fade>
                <div id="changes" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">12. Changes to This Policy</h2>
                  <p className="mb-3">We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page with an updated &ldquo;Last updated&rdquo; date and, where the changes are significant, by sending an email to the address associated with your account at least 30 days before the changes take effect.</p>
                  <p>Your continued use of the Services after the effective date of the revised policy constitutes your acceptance of the changes. We encourage you to review this policy periodically.</p>
                </div>
              </Fade>

              <Fade>
                <div id="contact" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">13. Contact Us</h2>
                  <p className="mb-6">If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Data Protection team:</p>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      {[
                        { label: 'Email',    value: 'support@emaavy.ai',  href: 'mailto:support@emaavy.ai' },
                        { label: 'Address',  value: 'Oakhla Industrial Area, Phase 2, A Block, Plot No. 78, 3rd Floor, New Delhi – 110020, India',      href: null },
                        { label: 'Response', value: 'Within 30 business days',  href: null },
                      ].map(({ label, value, href }) => (
                        <div key={label}>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-white/25">{label}</p>
                          {href
                            ? <a href={href} className="mt-1 block text-sm text-indigo-400 hover:underline">{value}</a>
                            : <p className="mt-1 text-sm text-white/60">{value}</p>
                          }
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-4">
                    <Link href="/book-demo" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition-all hover:bg-gray-100">
                      Talk to our team <HiOutlineArrowRight className="h-4 w-4" />
                    </Link>
                    <Link href="/terms-of-service" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10">
                      Terms of Service
                    </Link>
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
