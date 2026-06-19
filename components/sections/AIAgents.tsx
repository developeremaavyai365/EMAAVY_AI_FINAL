/* Enterprise capabilities — light gray bg, icon-list layout — exact Vapi style */

import {
  HiOutlineShieldCheck, HiOutlineLockClosed, HiOutlineChartBarSquare,
  HiOutlineUsers, HiOutlineArrowPath, HiOutlineBolt,
} from 'react-icons/hi2';

const CAPS = [
  {
    icon: HiOutlineChartBarSquare,
    title: 'Support SLA',
    desc: 'Contractual uptime and performance guarantees, with reserved capacity sized to your volume.',
  },
  {
    icon: HiOutlineUsers,
    title: 'Dedicated Deployment Support',
    desc: 'A dedicated engineer embedded in your team to get you live in a week.',
  },
  {
    icon: HiOutlineLockClosed,
    title: 'SSO, OAuth, and RBAC',
    desc: 'Enterprise sign-on, OAuth2 for secure integrations, and granular access controls.',
  },
  {
    icon: HiOutlineBolt,
    title: 'Scalable Infrastructure',
    desc: 'Scale up to millions of calls with sub-500ms latency.',
  },
  {
    icon: HiOutlineArrowPath,
    title: 'AI Guardrails',
    desc: 'Keep every conversation on-brand with built-in safeguards that prevent off-topic responses.',
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'SOC 2, HIPAA, and PCI compliant',
    desc: 'Deploy voice AI in regulated industries with industry-standard certifications.',
  },
];

export default function AIAgents() {
  return (
    <section id="enterprise" className="section-py" style={{ background: '#f5f5f5' }}>
      <div className="site-container">
        <div className="flex flex-col gap-14 lg:flex-row">
          {/* Left heading */}
          <div className="lg:w-[38%]">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Built for enterprises</span>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              Enterprise-ready<br />capabilities
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray-500">
              Everything a Fortune 100 needs to deploy at scale.
            </p>
          </div>

          {/* Right: 2-column list */}
          <div className="grid flex-1 gap-x-10 gap-y-8 sm:grid-cols-2">
            {CAPS.map((cap) => {
              const Icon = cap.icon;
              return (
                <div key={cap.title} className="flex gap-4">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center">
                    <Icon className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{cap.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{cap.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
