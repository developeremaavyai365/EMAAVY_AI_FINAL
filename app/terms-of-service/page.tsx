'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { HiOutlineDocumentText, HiOutlineArrowRight } from 'react-icons/hi2';

const EFFECTIVE_DATE = 'June 19, 2026';
const LAST_UPDATED   = 'June 19, 2026';

const SECTIONS = [
  { id: 'acceptance',     title: '1. Acceptance of Terms' },
  { id: 'definitions',    title: '2. Definitions' },
  { id: 'access',         title: '3. Access & Account' },
  { id: 'services',       title: '4. Services & Permitted Use' },
  { id: 'prohibited',     title: '5. Prohibited Uses' },
  { id: 'voice-calling',  title: '6. Voice Calling & Compliance' },
  { id: 'data',           title: '7. Customer Data' },
  { id: 'ip',             title: '8. Intellectual Property' },
  { id: 'payment',        title: '9. Payment & Billing' },
  { id: 'sla',            title: '10. Service Levels' },
  { id: 'confidential',   title: '11. Confidentiality' },
  { id: 'warranty',       title: '12. Warranties & Disclaimers' },
  { id: 'liability',      title: '13. Limitation of Liability' },
  { id: 'indemnification',title: '14. Indemnification' },
  { id: 'termination',    title: '15. Termination' },
  { id: 'governing',      title: '16. Governing Law' },
  { id: 'disputes',       title: '17. Dispute Resolution' },
  { id: 'general',        title: '18. General Provisions' },
  { id: 'contact',        title: '19. Contact' },
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

export default function TermsOfServicePage() {
  const [activeSection, setActiveSection] = useState('acceptance');

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
                <HiOutlineDocumentText className="h-3.5 w-3.5" /> Legal
              </span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Terms of Service
            </motion.h1>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 flex flex-wrap gap-6 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <span>Effective date: <span className="text-white/70 font-medium">{EFFECTIVE_DATE}</span></span>
              <span>Last updated: <span className="text-white/70 font-medium">{LAST_UPDATED}</span></span>
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-5 max-w-2xl text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you and Emaavy, Inc. governing your access to and use of the Emaavy platform and services. Please read these Terms carefully before using our Services.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
              <p className="text-sm font-semibold text-rose-400">⚠ Important</p>
              <p className="mt-1 text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                These Terms contain a binding arbitration clause and class action waiver in Section 17. By using the Services, you agree to resolve disputes through individual arbitration rather than court proceedings or class actions, except as provided herein.
              </p>
            </motion.div>
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
                <div id="acceptance" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">1. Acceptance of Terms</h2>
                  <p className="mb-3">By accessing or using the Emaavy platform, creating an account, clicking &ldquo;I agree&rdquo; or a similar button, or otherwise manifesting assent to these Terms, you agree to be bound by these Terms and our Privacy Policy, which is incorporated herein by reference.</p>
                  <p className="mb-3">If you are entering into these Terms on behalf of a company or other legal entity, you represent and warrant that you have the authority to bind that entity to these Terms. In that case, &ldquo;you&rdquo; refers to that entity.</p>
                  <p>If you do not accept these Terms in their entirety, you are not authorised to access or use the Services.</p>
                </div>
              </Fade>

              <Fade>
                <div id="definitions" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">2. Definitions</h2>
                  <div className="space-y-3">
                    {[
                      ['"Emaavy," "we," "us," "our"', 'Emaavy, Inc. and its subsidiaries and affiliates.'],
                      ['"Customer," "you," "your"', 'The individual or entity that has accepted these Terms and subscribed to the Services.'],
                      ['"Services"', 'The Emaavy AI agent platform, workflow automation tools, APIs, dashboards, and all related software and services.'],
                      ['"AI Agents"', 'Automated voice and text agents configured through the Emaavy platform to conduct conversations on behalf of the Customer.'],
                      ['"Customer Data"', 'All data, content, and information submitted by or on behalf of the Customer through the Services, including call recordings, transcripts, and CRM data.'],
                      ['"End Users"', 'Third parties (callers, contacts, or users) who interact with AI Agents deployed by the Customer.'],
                      ['"Subscription"', 'The paid plan selected by the Customer that governs access to specific features and usage limits.'],
                      ['"Documentation"', 'Technical and user documentation provided by Emaavy describing the features and operation of the Services.'],
                    ].map(([term, def]) => (
                      <div key={term} className="rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">
                        <span className="font-semibold text-white/80">{term}</span>
                        <span className="text-white/50"> — {def}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Fade>

              <Fade>
                <div id="access" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">3. Access &amp; Account</h2>
                  <h3 className="mb-2 font-semibold text-white/80">3.1 Account Creation</h3>
                  <p className="mb-4">To access the Services, you must create an account using accurate and complete information. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.</p>

                  <h3 className="mb-2 font-semibold text-white/80">3.2 Account Security</h3>
                  <p className="mb-4">You must promptly notify Emaavy at <a href="mailto:support@emaavy.ai" className="text-indigo-400 hover:underline">support@emaavy.ai</a> of any actual or suspected unauthorized access to your account. We recommend enabling multi-factor authentication (MFA), which is available on all plans. Emaavy will not be liable for any loss or damage arising from unauthorized access resulting from your failure to protect your credentials.</p>

                  <h3 className="mb-2 font-semibold text-white/80">3.3 Account Eligibility</h3>
                  <p>The Services are intended for business use by individuals who are at least 18 years of age and are authorized to enter into contracts on behalf of a business entity. The Services are not intended for personal, family, or household use.</p>
                </div>
              </Fade>

              <Fade>
                <div id="services" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">4. Services &amp; Permitted Use</h2>
                  <p className="mb-4">Subject to these Terms and payment of applicable fees, Emaavy grants you a limited, non-exclusive, non-transferable, revocable right to access and use the Services during your Subscription period for your internal business purposes.</p>
                  <p className="mb-4">The Services include access to AI agent deployment tools, workflow automation, third-party integrations, call analytics, and related platform features as described in your selected Subscription plan and the Documentation.</p>
                  <p>Emaavy reserves the right to modify, update, or discontinue any feature of the Services with reasonable prior notice. Material reductions in functionality will be communicated at least 30 days in advance via email.</p>
                </div>
              </Fade>

              <Fade>
                <div id="prohibited" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">5. Prohibited Uses</h2>
                  <p className="mb-4">You agree not to use the Services to:</p>
                  <div className="space-y-2">
                    {[
                      'Engage in robocalling, spam calling, or any calling practice that violates the Telephone Consumer Protection Act (TCPA), TRAI regulations, or equivalent laws in your jurisdiction.',
                      'Impersonate a human agent to End Users without disclosing that they are speaking with an AI system, where disclosure is required by law.',
                      'Process, store, or transmit data classified as Protected Health Information (PHI) without an active HIPAA Business Associate Agreement (BAA) with Emaavy.',
                      'Conduct unauthorized penetration testing, vulnerability scanning, or security assessments of Emaavy infrastructure.',
                      'Reverse engineer, decompile, disassemble, or attempt to derive the source code of the Services.',
                      'Resell, sublicense, or provide access to the Services to third parties without Emaavy\'s prior written consent.',
                      'Use the Services to develop competing products or services.',
                      'Transmit malware, viruses, or any code designed to damage, disable, or impair systems.',
                      'Violate any applicable local, state, national, or international law or regulation.',
                      'Harass, threaten, or defraud End Users through AI Agent interactions.',
                      'Use the Services to collect data in violation of applicable privacy laws, including GDPR and applicable data protection legislation.',
                    ].map(item => (
                      <div key={item} className="flex gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">
                        <span className="mt-0.5 shrink-0 text-rose-400">✕</span>
                        <span className="text-white/55">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4">Emaavy reserves the right to suspend or terminate your account immediately upon discovery of any prohibited use without prior notice or refund.</p>
                </div>
              </Fade>

              <Fade>
                <div id="voice-calling" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">6. Voice Calling &amp; Regulatory Compliance</h2>
                  <div className="mb-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                    <p className="text-sm font-semibold text-amber-400">Customer Responsibility</p>
                    <p className="mt-1 text-xs text-white/55">Regulatory compliance for AI voice calling is entirely your responsibility. Emaavy provides the technology infrastructure; the legal obligations of your calling campaigns rest with you.</p>
                  </div>
                  <h3 className="mb-2 font-semibold text-white/80">6.1 Consent Requirements</h3>
                  <p className="mb-4">You are solely responsible for obtaining all necessary consents from End Users before initiating AI-powered calls. This includes, without limitation, prior express written consent under TCPA (where applicable), consent under two-party or all-party recording laws, and disclosure that the caller is an automated AI system where required by law.</p>

                  <h3 className="mb-2 font-semibold text-white/80">6.2 Do-Not-Call Compliance</h3>
                  <p className="mb-4">You must maintain and honour Do-Not-Call (DNC) lists in compliance with the National DNC Registry, the TRAI DND framework, and any sector-specific calling regulations. Emaavy provides DNC list integration tools; using them is your responsibility.</p>

                  <h3 className="mb-2 font-semibold text-white/80">6.3 Call Time Restrictions</h3>
                  <p className="mb-4">You must comply with all applicable calling hour restrictions for the jurisdictions in which you operate. In India, outbound commercial calls are generally permitted only between 9:00 AM and 9:00 PM (recipient&apos;s local time) unless the recipient has consented to calls outside these hours.</p>

                  <h3 className="mb-2 font-semibold text-white/80">6.4 Indemnification for Calling Violations</h3>
                  <p>You agree to fully indemnify and hold Emaavy harmless from any claims, fines, penalties, or damages arising from your failure to comply with applicable voice calling regulations. This indemnification obligation survives termination of these Terms.</p>
                </div>
              </Fade>

              <Fade>
                <div id="data" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">7. Customer Data</h2>
                  <h3 className="mb-2 font-semibold text-white/80">7.1 Ownership</h3>
                  <p className="mb-4">As between you and Emaavy, you retain all ownership rights in your Customer Data. You grant Emaavy a limited, non-exclusive license to process Customer Data solely to provide and improve the Services as described in these Terms and our Privacy Policy.</p>

                  <h3 className="mb-2 font-semibold text-white/80">7.2 Data Processing</h3>
                  <p className="mb-4">Emaavy processes Customer Data as a data processor acting on your instructions. For customers subject to GDPR, we will execute a Data Processing Agreement (DPA) upon request. Contact <a href="mailto:support@emaavy.ai" className="text-indigo-400 hover:underline">support@emaavy.ai</a> to request a DPA.</p>

                  <h3 className="mb-2 font-semibold text-white/80">7.3 Aggregated Data</h3>
                  <p className="mb-4">Emaavy may use anonymised, aggregated data derived from your use of the Services to improve platform performance, develop new features, and generate industry benchmarks. Such aggregated data will not identify you or your End Users.</p>

                  <h3 className="mb-2 font-semibold text-white/80">7.4 Data Export &amp; Deletion</h3>
                  <p>You may export your Customer Data at any time through the platform&apos;s export tools. Upon account termination, you may request deletion of your Customer Data within 30 days of termination. Emaavy will delete or anonymise Customer Data within 30 days of such request, except where retention is required by law.</p>
                </div>
              </Fade>

              <Fade>
                <div id="ip" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">8. Intellectual Property</h2>
                  <h3 className="mb-2 font-semibold text-white/80">8.1 Emaavy IP</h3>
                  <p className="mb-4">The Services, including all software, algorithms, models, interfaces, documentation, trademarks, logos, and all derivative works, are owned by Emaavy and protected by intellectual property laws. Nothing in these Terms transfers ownership of Emaavy&apos;s intellectual property to you.</p>

                  <h3 className="mb-2 font-semibold text-white/80">8.2 Feedback</h3>
                  <p className="mb-4">If you provide feedback, suggestions, or ideas regarding the Services, you grant Emaavy a perpetual, irrevocable, royalty-free license to use, modify, and incorporate such feedback into the Services without any obligation or compensation to you.</p>

                  <h3 className="mb-2 font-semibold text-white/80">8.3 Your IP</h3>
                  <p>You retain all intellectual property rights in content you create using the Services, including agent scripts, workflow configurations, and call templates, subject to the license granted in Section 7.</p>
                </div>
              </Fade>

              <Fade>
                <div id="payment" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">9. Payment &amp; Billing</h2>
                  <h3 className="mb-2 font-semibold text-white/80">9.1 Fees</h3>
                  <p className="mb-4">You agree to pay all fees associated with your selected Subscription plan as described on our Pricing page. Fees are exclusive of taxes. You are responsible for all applicable taxes, levies, or duties imposed by any taxing authority.</p>

                  <h3 className="mb-2 font-semibold text-white/80">9.2 Billing Cycle</h3>
                  <p className="mb-4">Monthly plans are billed on the same date each month. Annual plans are billed upfront for the full year. Usage-based charges (e.g., overage calls) are billed at the end of each billing cycle.</p>

                  <h3 className="mb-2 font-semibold text-white/80">9.3 Late Payments</h3>
                  <p className="mb-4">Unpaid invoices may result in suspension of your account after 7 days written notice. Accounts suspended for non-payment may be subject to a reactivation fee. Emaavy reserves the right to charge interest on overdue amounts at the rate of 1.5% per month or the maximum rate permitted by law, whichever is lower.</p>

                  <h3 className="mb-2 font-semibold text-white/80">9.4 Refunds</h3>
                  <p>Subscription fees are non-refundable except as expressly required by applicable law or as described in our refund policy. If you believe you have been charged in error, you must notify us within 60 days of the charge.</p>
                </div>
              </Fade>

              <Fade>
                <div id="sla" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">10. Service Levels</h2>
                  <p className="mb-4">Emaavy targets the following uptime commitments for the core platform (excluding planned maintenance, force majeure events, and issues caused by third-party providers):</p>
                  <div className="overflow-hidden rounded-xl border border-white/8">
                    <table className="w-full text-xs">
                      <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                          <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-white/40">Plan</th>
                          <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-white/40">Uptime Target</th>
                          <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-white/40">Support SLA</th>
                          <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-white/40">Remedy</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.05]">
                        {[
                          ['Starter',    '99.5%',  '48h response',  'Service credit'],
                          ['Growth',     '99.9%',  '4h response',   'Service credit'],
                          ['Enterprise', '99.99%', '1h response',   'SLA credit + penalties'],
                        ].map(([plan, uptime, support, remedy]) => (
                          <tr key={plan} className="hover:bg-white/[0.02]">
                            <td className="px-4 py-3 font-semibold text-white/70">{plan}</td>
                            <td className="px-4 py-3 font-mono text-emerald-400">{uptime}</td>
                            <td className="px-4 py-3 text-white/50">{support}</td>
                            <td className="px-4 py-3 text-white/50">{remedy}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4">Service credits are your sole remedy for uptime failures. Credits will be applied to your next invoice and do not entitle you to a cash refund. Credits are forfeited upon account termination.</p>
                </div>
              </Fade>

              <Fade>
                <div id="confidential" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">11. Confidentiality</h2>
                  <p className="mb-3">Each party agrees to keep confidential all non-public information disclosed by the other party that is designated as confidential or that reasonably should be understood to be confidential (&ldquo;Confidential Information&rdquo;).</p>
                  <p className="mb-3">Neither party will disclose Confidential Information to third parties without the disclosing party&apos;s prior written consent, except to employees and contractors who have a need to know and are bound by confidentiality obligations at least as protective as these Terms.</p>
                  <p>Confidentiality obligations do not apply to information that: (a) becomes publicly known through no breach of these Terms; (b) was known prior to disclosure; (c) is independently developed without reference to Confidential Information; or (d) must be disclosed pursuant to law or court order, provided that the receiving party gives the disclosing party prompt written notice where legally permissible.</p>
                </div>
              </Fade>

              <Fade>
                <div id="warranty" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">12. Warranties &amp; Disclaimers</h2>
                  <p className="mb-4">Emaavy warrants that the Services will perform materially in accordance with the Documentation during the Subscription period. Your sole remedy for breach of this warranty is for Emaavy to use commercially reasonable efforts to correct the non-conformance, or at our election, to refund fees paid for the affected period.</p>
                  <div className="rounded-xl border border-white/8 bg-white/[0.03] p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-white/40">Disclaimer</p>
                    <p className="mt-3 text-white/55">EXCEPT AS EXPRESSLY PROVIDED HEREIN, THE SERVICES ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING WITHOUT LIMITATION WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. EMAAVY DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS. AI AGENT OUTPUTS ARE GENERATED BY MACHINE LEARNING MODELS AND MAY BE INACCURATE. YOU ARE SOLELY RESPONSIBLE FOR REVIEWING AND VALIDATING AI AGENT OUTPUTS BEFORE RELYING ON THEM.</p>
                  </div>
                </div>
              </Fade>

              <Fade>
                <div id="liability" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">13. Limitation of Liability</h2>
                  <div className="mb-4 rounded-xl border border-white/8 bg-white/[0.03] p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-white/40">Liability Cap</p>
                    <p className="mt-3 text-white/55">TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL EMAAVY&apos;S AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICES EXCEED THE TOTAL FEES PAID BY YOU IN THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM.</p>
                  </div>
                  <div className="rounded-xl border border-white/8 bg-white/[0.03] p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-white/40">Exclusion of Consequential Damages</p>
                    <p className="mt-3 text-white/55">IN NO EVENT WILL EITHER PARTY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING LOSS OF PROFITS, GOODWILL, DATA, OR BUSINESS OPPORTUNITIES, ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. THE FOREGOING LIMITATIONS APPLY REGARDLESS OF THE FORM OF ACTION AND WHETHER SUCH DAMAGES ARE BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR OTHERWISE.</p>
                  </div>
                  <p className="mt-4 text-xs text-white/40">Note: Some jurisdictions do not allow the exclusion of certain warranties or limitations of liability. In such jurisdictions, the above limitations will apply to the fullest extent permitted by applicable law.</p>
                </div>
              </Fade>

              <Fade>
                <div id="indemnification" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">14. Indemnification</h2>
                  <p className="mb-3">You agree to defend, indemnify, and hold harmless Emaavy and its officers, directors, employees, and agents from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys&apos; fees) arising out of or relating to:</p>
                  <ul className="space-y-2">
                    {[
                      'Your use of the Services in violation of these Terms;',
                      'Your Customer Data, including any claims that it infringes third-party intellectual property rights or violates privacy laws;',
                      'Your AI Agent deployments, including any claims by End Users or regulatory authorities relating to AI-generated content, call conduct, or data handling;',
                      'Your violation of any applicable law, including without limitation TCPA, TRAI regulations, GDPR, or sector-specific calling laws;',
                      'Any third-party claim arising from your interactions with integration partners or End Users.',
                    ].map(item => (
                      <li key={item} className="flex gap-3 rounded-lg border border-white/8 bg-white/[0.02] px-4 py-3">
                        <span className="mt-0.5 shrink-0 text-indigo-400">→</span>
                        <span className="text-white/55">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Fade>

              <Fade>
                <div id="termination" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">15. Termination</h2>
                  <h3 className="mb-2 font-semibold text-white/80">15.1 Termination by You</h3>
                  <p className="mb-4">You may cancel your Subscription at any time from your account settings. Cancellation takes effect at the end of your current billing cycle. You will retain access to the Services until that date. No partial refunds are provided for unused time, except as required by law.</p>

                  <h3 className="mb-2 font-semibold text-white/80">15.2 Termination by Emaavy</h3>
                  <p className="mb-4">Emaavy may suspend or terminate your access to the Services: (a) immediately upon material breach of these Terms, including prohibited use violations; (b) for non-payment after 7 days written notice; (c) if required by law or legal process; or (d) upon 30 days written notice for any or no reason.</p>

                  <h3 className="mb-2 font-semibold text-white/80">15.3 Effect of Termination</h3>
                  <p>Upon termination, your right to use the Services immediately ceases. You may request an export of your Customer Data within 30 days of termination. After 30 days, Emaavy may delete your data in accordance with our data retention policies. Sections 7.4, 8, 11, 12, 13, 14, 16, 17, and 18 survive termination.</p>
                </div>
              </Fade>

              <Fade>
                <div id="governing" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">16. Governing Law</h2>
                  <p className="mb-3">These Terms are governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. The United Nations Convention on Contracts for the International Sale of Goods does not apply to these Terms.</p>
                  <p>For customers located in the European Union, applicable mandatory consumer protection laws of your country of residence may also apply and cannot be waived by these Terms.</p>
                </div>
              </Fade>

              <Fade>
                <div id="disputes" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">17. Dispute Resolution</h2>
                  <h3 className="mb-2 font-semibold text-white/80">17.1 Informal Resolution</h3>
                  <p className="mb-4">Before initiating formal proceedings, the parties agree to attempt to resolve any dispute informally. Either party must send written notice to the other describing the dispute. The parties will have 30 days from receipt of notice to resolve the dispute through good-faith negotiation.</p>

                  <h3 className="mb-2 font-semibold text-white/80">17.2 Binding Arbitration</h3>
                  <p className="mb-4">If informal resolution fails, all disputes, claims, or controversies arising out of or relating to these Terms or the Services will be resolved through binding individual arbitration administered by the Indian Council of Arbitration (ICA) under its applicable rules. The arbitration will be conducted in Bangalore, India in the English language. The arbitrator&apos;s award will be final and binding and may be entered as a judgment in any court of competent jurisdiction.</p>

                  <h3 className="mb-2 font-semibold text-white/80">17.3 Class Action Waiver</h3>
                  <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
                    <p className="text-white/55">YOU AND EMAAVY AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. THE ARBITRATOR MAY NOT CONSOLIDATE MORE THAN ONE PERSON&apos;S CLAIMS AND MAY NOT PRESIDE OVER ANY CLASS ACTION.</p>
                  </div>

                  <h3 className="mb-2 mt-4 font-semibold text-white/80">17.4 Exceptions</h3>
                  <p>Nothing in this Section prevents either party from seeking injunctive or other equitable relief from a court of competent jurisdiction to prevent actual or threatened infringement of intellectual property rights or to protect confidential information.</p>
                </div>
              </Fade>

              <Fade>
                <div id="general" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">18. General Provisions</h2>
                  <div className="space-y-4">
                    {[
                      ['Entire Agreement', 'These Terms, together with the Privacy Policy, any Order Forms, and any Data Processing Agreement, constitute the entire agreement between you and Emaavy regarding the Services and supersede all prior negotiations, representations, or agreements.'],
                      ['Severability', 'If any provision of these Terms is found to be unenforceable, that provision will be modified to the minimum extent necessary to make it enforceable, and the remaining provisions will remain in full force and effect.'],
                      ['Waiver', 'Failure by either party to enforce any provision of these Terms will not constitute a waiver of that party\'s rights to enforce the same or any other provision in the future.'],
                      ['Assignment', 'You may not assign or transfer any rights or obligations under these Terms without Emaavy\'s prior written consent. Emaavy may assign these Terms in connection with a merger, acquisition, or sale of assets. Any purported assignment in violation of this provision is void.'],
                      ['Force Majeure', 'Neither party will be liable for failure or delay in performance due to causes beyond its reasonable control, including acts of God, natural disasters, war, terrorism, civil unrest, governmental action, or internet outages, provided the affected party gives prompt notice.'],
                      ['Notices', 'Legal notices must be sent by email with confirmation of receipt to support@emaavy.ai (for notices to Emaavy) or to the email address associated with your account (for notices to you).'],
                      ['Independent Contractors', 'The parties are independent contractors. Nothing in these Terms creates a partnership, franchise, joint venture, agency, or employment relationship between the parties.'],
                    ].map(([title, text]) => (
                      <div key={title} className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
                        <p className="mb-1.5 font-semibold text-white/80">{title}</p>
                        <p className="text-white/50">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Fade>

              <Fade>
                <div id="contact" className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-bold text-white">19. Contact</h2>
                  <p className="mb-6">For legal inquiries, contract questions, or notices under these Terms, please contact:</p>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      {[
                        { label: 'Email',    value: 'support@emaavy.ai',   href: 'mailto:support@emaavy.ai' },
                        { label: 'Address',  value: 'Oakhla Industrial Area, Phase 2, A Block, Plot No. 78, 3rd Floor, New Delhi – 110020, India', href: null },
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
                    <Link href="/privacy-policy" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10">
                      Privacy Policy
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
