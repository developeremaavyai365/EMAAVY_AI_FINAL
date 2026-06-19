import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=general-sans@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen"
        style={
          {
            '--font-clash': '"Clash Display", system-ui, sans-serif',
            '--font-general': '"General Sans", system-ui, sans-serif',
          } as React.CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
