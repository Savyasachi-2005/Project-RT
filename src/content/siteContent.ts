export const siteContent = {
  company: {
    name: 'AsForYou Technologies',
    tagline: 'Software that learns businesses.',
    copyright: 'AsForYou Technologies © 2026',
    footerTagline: 'AI Operating Systems, built in the field.',
  },

  nav: {
    links: [
      { label: 'About', href: '#about' },
      { label: 'Project Indus', href: '#project-indus' },
      { label: 'Product', href: '#product' },
      { label: 'Founders', href: '#founders' },
      { label: 'Contact', href: '#contact' },
    ],
    cta: 'Get in touch',
  },

  hero: {
    eyebrow: 'AI Forward Deployed Engineering',
    headline: 'Software should learn how your business operates - not the other way around.',
    subheadline:
      'AsForYou Technologies is an AI Forward Deployed Engineering company. We embed with businesses, observe how they actually work, and build AI Operating Systems tailored to their reality.',
    primaryCta: "See what we're building",
    primaryCtaHref: '#project-indus',
    secondaryCta: 'Get in touch',
    secondaryCtaHref: '#contact',
  },

  images: {
    /** Hero showcase + atmospheric background */
    hero: '/images/forr.png',
  },

  loading: {
    words: ['AS', 'FORYOU', 'TECHNOLOGIES'],
    morphMs: 600,
    durationMs: 4500,
    holdAfterMs: 800,
    tagline: 'AI Operating Systems, built in the field.',
  },

  about: {
    eyebrow: 'WHY WE EXIST',
    title: 'Generic software forces businesses to adapt. We invert that.',
    body: 'For forty years, enterprise software asked millions of businesses to adopt one standardized workflow. We ask a different question: how do we build systems that learn how each business actually operates? AsForYou builds AI-driven operating systems that adapt to how your team already runs — not the other way around.',
    beliefs: [
      {
        title: 'Software should adapt to the business',
        description:
          'The business workflow contains information we have not yet understood. Our job is to learn it, not override it.',
      },
      {
        title: 'Trust before growth',
        description:
          'No feature matters if the operator does not trust the system with their financial data. We optimize for trust first.',
      },
      {
        title: 'AI augments judgment, not accountability',
        description:
          'AI can parse voice notes and flag anomalies. Every output that affects a decision must be explainable and correctable.',
      },
      {
        title: 'Every deployment makes the platform smarter',
        description:
          'Knowledge gained in the field is extracted and contributed back to Project Indus — compounding capability with every engagement.',
      },
    ],
  },

  projectIndus: {
    eyebrow: 'THE PLATFORM',
    title: 'Project Indus',
    tagline: 'The intelligence platform behind every AI Operating System we build.',
    body: 'Project Indus is our internal, reusable AI platform — agent framework, voice intelligence, OCR, workflow engine, memory layer, and analytics. Customers do not buy Indus directly. They receive custom AI Operating Systems powered by it.',
    modules: [
      'AI Agent Framework',
      'Voice Intelligence',
      'OCR Engine',
      'Workflow Engine',
      'Memory Layer',
      'Analytics Engine',
    ],
    outputLabel: 'Industry Operating System',
  },

  product: {
    eyebrow: 'WHAT WE BUILD',
    title: 'Custom AI Operating Systems for how you actually work.',
    body: 'We build industry-specific operating systems on top of Project Indus — each tailored to how that specific business runs. Through AI Forward Deployed Engineering, we embed with your team, observe real workflows, and design around them. Not a generic dashboard. A system that coordinates inventory, sales, procurement, and decision support into one coherent whole.',
    capabilities: [
      {
        number: '01',
        title: 'Vernacular voice input',
        description:
          'Capture business data through the channels operators already use — voice, messages, and natural language.',
      },
      {
        number: '02',
        title: 'Automated bookkeeping & reporting',
        description:
          'Structure financial data from bills, receipts, and daily transactions with accuracy you can trust.',
      },
      {
        number: '03',
        title: 'Inventory & demand insights',
        description:
          'Surface reorder signals, margin analysis, and demand patterns from the data your business already produces.',
      },
      {
        number: '04',
        title: 'Built for how your team already works',
        description:
          'Technology that disappears into workflow — so operators run their business, not learn new software.',
      },
    ],
  },

  founders: {
    eyebrow: 'OUR TEAM',
    title: 'The founders',
    members: [
      {
        name: 'Abhishek Hiremath',
        role: 'Co-founder - AI Forward Deployed Engineering & field operations',
        initial: 'A',
      },
      {
        name: 'Mohammad Vasim',
        role: 'Co-founder - Platform architecture & Project Indus',
        initial: 'M',
      },
      {
        name: 'Praveen Mudalgeri',
        role: 'Co-founder - Product strategy & customer partnerships',
        initial: 'P',
      },
    ],
  },

  contact: {
    eyebrow: 'CONTACT',
    title: "Let's build your operating system.",
    subtitle:
      'Tell us about your business. We will get back to you to explore how an AI Operating System could work for you.',
    email: 'asforyoutech@gmail.com',
    form: {
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email',
      emailPlaceholder: 'you@company.com',
      companyLabel: 'Company',
      companyPlaceholder: 'Business or industry (optional)',
      messageLabel: 'Message',
      messagePlaceholder: 'What does your business do? What would you want a system to handle?',
      submit: 'Send message',
      sending: 'Sending…',
      success: 'Message sent. We will be in touch soon.',
      error: 'Something went wrong. Please try again or email us directly.',
      configError: 'Contact form is not configured yet.',
    },
    social: [
      { label: 'LinkedIn', href: 'https://linkedin.com' },
      { label: 'X', href: 'https://x.com' },
    ],
  },
} as const

export type SiteContent = typeof siteContent
