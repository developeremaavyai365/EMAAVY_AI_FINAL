export const NAV_LINKS = [
  { label: 'Solutions', href: '#features' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'AI Agents', href: '#ai-agents' },
  { label: 'Workflows', href: '#workflows' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Resources', href: '#faq' },
  { label: 'Contact', href: '#contact' },
] as const;

export const TRUST_BADGES = [
  'Enterprise Ready',
  'No Code',
  'AI Powered',
] as const;

export const FEATURES = [
  {
    title: 'AI Agents',
    description: 'Deploy intelligent assistants that handle conversations, decisions, and tasks autonomously.',
    icon: 'agent',
  },
  {
    title: 'Workflow Automation',
    description: 'Automate repetitive tasks with visual builders and smart triggers across your stack.',
    icon: 'workflow',
  },
  {
    title: 'App Integrations',
    description: 'Connect your entire tech stack with 100+ native integrations and custom API connectors.',
    icon: 'integration',
  },
  {
    title: 'Customer Support',
    description: 'Deliver 24/7 AI-powered support with instant responses and seamless human handoff.',
    icon: 'support',
  },
  {
    title: 'Lead Management',
    description: 'Capture, qualify, and route leads automatically with intelligent scoring and CRM sync.',
    icon: 'lead',
  },
  {
    title: 'Analytics',
    description: 'Track performance in real time with dashboards, insights, and actionable reports.',
    icon: 'analytics',
  },
] as const;

export const PRODUCT_TABS = [
  {
    id: 'agents',
    label: 'AI Agents',
    title: 'Intelligent agents that work around the clock',
    description: 'Deploy specialized AI agents for support, sales, and operations. Configure once, scale infinitely.',
    metrics: ['24/7 availability', 'Multi-channel', 'Human handoff'],
  },
  {
    id: 'integrations',
    label: 'Integrations',
    title: 'Connect every tool in your stack',
    description: 'Native connectors for CRM, communication, e-commerce, and productivity platforms.',
    metrics: ['100+ apps', 'Real-time sync', 'Custom APIs'],
  },
  {
    id: 'workflows',
    label: 'Workflows',
    title: 'Visual automation without code',
    description: 'Build complex workflows with triggers, conditions, and AI-powered decision nodes.',
    metrics: ['Drag & drop', 'Conditional logic', 'Scheduled runs'],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    title: 'Insights that drive decisions',
    description: 'Monitor automations, agent performance, and ROI with enterprise-grade analytics.',
    metrics: ['Live dashboards', 'Custom reports', 'Export data'],
  },
] as const;

export const WORKFLOW_STEPS = [
  'Lead Arrives',
  'AI Qualifies Lead',
  'CRM Updated',
  'Sales Team Notified',
  'Meeting Scheduled',
  'Follow-Up Automated',
] as const;

export const INTEGRATIONS = [
  'Salesforce',
  'HubSpot',
  'Slack',
  'Gmail',
  'WhatsApp',
  'Shopify',
  'Stripe',
  'Notion',
] as const;

export const AI_AGENTS = [
  {
    title: 'Customer Support Agent',
    description: 'Handles tickets, resolves FAQs, and escalates complex issues to your team.',
    icon: 'support',
  },
  {
    title: 'Sales Agent',
    description: 'Qualifies leads, books meetings, and nurtures prospects through the pipeline.',
    icon: 'sales',
  },
  {
    title: 'Marketing Agent',
    description: 'Creates campaigns, segments audiences, and optimizes outreach automatically.',
    icon: 'marketing',
  },
  {
    title: 'Operations Agent',
    description: 'Automates internal processes, approvals, and cross-team coordination.',
    icon: 'operations',
  },
  {
    title: 'HR Agent',
    description: 'Assists employees with onboarding, policies, and internal requests.',
    icon: 'hr',
  },
] as const;

export const METRICS = [
  { value: 100, suffix: '+', label: 'Integrations' },
  { value: 50000, suffix: '+', label: 'Automations Executed', format: true },
  { value: 95, suffix: '%', label: 'Time Saved' },
  { value: 24, suffix: '/7', label: 'AI Availability' },
] as const;

export const TESTIMONIALS = [
  {
    quote: 'Emaavy transformed how we handle customer operations. We cut response times by 80% and our team finally focuses on high-value work.',
    name: 'Sarah Chen',
    role: 'VP of Operations',
    company: 'TechFlow Inc.',
    rating: 5,
    initials: 'SC',
  },
  {
    quote: 'The workflow builder is incredibly intuitive. We went from manual processes to full automation in under two weeks.',
    name: 'Marcus Williams',
    role: 'Director of Sales',
    company: 'GrowthScale',
    rating: 5,
    initials: 'MW',
  },
  {
    quote: 'Enterprise-grade security and seamless integrations made Emaavy the obvious choice for our global operations team.',
    name: 'Priya Sharma',
    role: 'CTO',
    company: 'Nexus Digital',
    rating: 5,
    initials: 'PS',
  },
] as const;

export const PRICING_PLANS = [
  {
    name: 'Starter',
    price: '$49',
    period: '/month',
    description: 'Perfect for small teams getting started with automation.',
    features: [
      'Up to 5 workflows',
      '2 AI agents',
      '20 integrations',
      'Email support',
      'Basic analytics',
    ],
    highlighted: false,
    cta: 'Start Free',
  },
  {
    name: 'Growth',
    price: '$149',
    period: '/month',
    description: 'For growing teams scaling automation across departments.',
    features: [
      'Unlimited workflows',
      '10 AI agents',
      'All integrations',
      'Priority support',
      'Advanced analytics',
      'Custom API access',
    ],
    highlighted: false,
    cta: 'Start Free',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Tailored solutions for large organizations with complex needs.',
    features: [
      'Unlimited everything',
      'Dedicated AI agents',
      'SSO & SAML',
      'Dedicated account manager',
      'SLA guarantee',
      'On-premise option',
    ],
    highlighted: true,
    cta: 'Book Demo',
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: 'What is Emaavy?',
    answer: 'Emaavy is an AI-powered automation platform that helps businesses connect apps, deploy intelligent agents, and automate workflows from a single unified dashboard.',
  },
  {
    question: 'Do I need coding skills to use Emaavy?',
    answer: 'No. Emaavy is designed for both no-code builders and developers. Use our visual workflow builder or connect via API — whichever fits your team.',
  },
  {
    question: 'Which integrations are supported?',
    answer: 'Emaavy supports 100+ native integrations including Salesforce, HubSpot, Slack, Gmail, Shopify, Stripe, and more. Custom API connectors are available on Growth and Enterprise plans.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes. Emaavy uses enterprise-grade encryption, SOC 2 compliance, and role-based access controls. Enterprise plans include SSO, SAML, and optional on-premise deployment.',
  },
  {
    question: 'Can I try Emaavy before committing?',
    answer: 'Absolutely. Start with our free Starter plan — no credit card required. Upgrade anytime as your automation needs grow.',
  },
  {
    question: 'How do AI agents work?',
    answer: 'AI agents are configurable assistants that handle specific tasks like support tickets, lead qualification, or internal requests. They integrate with your tools and can hand off to humans when needed.',
  },
] as const;

export const TRUSTED_LOGOS = [
  'Acme Corp',
  'TechFlow',
  'GrowthScale',
  'Nexus',
  'CloudBase',
  'DataSync',
] as const;
