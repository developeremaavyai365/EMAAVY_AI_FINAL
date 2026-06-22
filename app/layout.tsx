import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Emaavy — AI Agents, Workflows & Integrations Platform',
  description:
    'Automate your business with AI agents, workflow automation, and 100+ app integrations. Connect apps, deploy AI, and eliminate repetitive work from a single platform.',
  keywords: [
    'AI agents',
    'workflow automation',
    'business automation',
    'integrations',
    'no-code',
    'enterprise SaaS',
  ],
  openGraph: {
    title: 'Emaavy — Automate Your Business With AI',
    description:
      'Deploy AI agents, automate workflows, and connect your business in minutes.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        {/* Keep a fixed 1280px render width so mobile sees the exact desktop layout */}
        <meta name="viewport" content="width=1280" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  var BASE = 1280;
  var ro;
  function scale() {
    var vw = window.innerWidth;
    var el = document.getElementById('scale-root');
    if (!el) return;
    if (vw < BASE) {
      var ratio = vw / BASE;
      el.style.transform = 'scale(' + ratio + ')';
      el.style.transformOrigin = 'top left';
      el.style.width = BASE + 'px';
      // Let body height match scaled content so page scrolls correctly
      document.body.style.minHeight = Math.round(el.offsetHeight * ratio) + 'px';
    } else {
      el.style.transform = '';
      el.style.transformOrigin = '';
      el.style.width = '';
      document.body.style.minHeight = '';
    }
  }
  window.addEventListener('resize', scale);
  document.addEventListener('DOMContentLoaded', function() {
    scale();
    // Use ResizeObserver to recompute body height whenever content changes
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(scale);
      var el = document.getElementById('scale-root');
      if (el) ro.observe(el);
    }
    setTimeout(scale, 200);
    setTimeout(scale, 800);
  });
})();
`,
          }}
        />
      </head>
      <body
        style={
          {
            '--font-clash': 'var(--font-jakarta), system-ui, sans-serif',
            '--font-general': '"General Sans", system-ui, sans-serif',
            margin: 0,
            padding: 0,
          } as React.CSSProperties
        }
      >
        <div id="scale-root" className="min-h-screen overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
