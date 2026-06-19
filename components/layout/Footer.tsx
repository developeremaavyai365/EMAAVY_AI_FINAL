import Image from 'next/image';
import Link from 'next/link';

/* Clean white footer — Vapi style (3 columns: Product, Company, Legal) */

const COLS = {
  Product: [
    { label: 'Platform',      href: '/platform' },
    { label: 'AI Agents',     href: '/platform#ai-agents' },
    { label: 'Integrations',  href: '/integrations' },
    { label: 'Pricing',       href: '/pricing' },
    { label: 'FAQ',           href: '/faq' },
  ],
  Legal: [
    { label: 'Privacy Policy',   href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
  ],
};

const SOCIALS = [
  { label: 'GitHub', href: '#', svg: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg> },
  { label: 'LinkedIn', href: '#', svg: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
  { label: 'X', href: '#', svg: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
];

export default function Footer() {
  return (
    <footer style={{ background: '#04060e', borderTop: '1px solid rgba(99,102,241,0.12)' }}>
      <div className="site-container py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image src="/brand/emaavy-logo.svg" alt="Emaavy" width={130} height={26} className="h-auto w-[110px] brightness-0 invert" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/35">
              AI agent &amp; workflow automation platform for modern enterprises. Deploy at any scale.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/30 transition-all hover:border-white/30 hover:text-white/80">
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(COLS).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-5 text-[10px] font-bold uppercase tracking-widest text-white/25">{title}</h3>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-white/40 transition-colors hover:text-white/80">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 pt-8 sm:flex-row" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-sm text-white/25">&copy; {new Date().getFullYear()} Emaavy, Inc. All rights reserved.</p>
          <p className="text-xs text-white/20">SOC 2 · HIPAA · GDPR · ISO 27001</p>
        </div>
      </div>
    </footer>
  );
}
