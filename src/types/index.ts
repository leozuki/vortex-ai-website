export type Lang = 'vi' | 'en'

export interface Translations {
  nav: {
    home: string
    products: string
    contact: string
    requestDemo: string
  }
  hero: {
    taglines: string[]
    subheading: string
    ctaProducts: string
    ctaDemo: string
    badge: string
  }
  stats: {
    products: string
    aiModels: string
    platforms: string
    clients: string
  }
  products: {
    heading: string
    subheading: string
    featuredLabel: string
    learnMore: string
    categories: {
      automation: string
      monitoring: string
      crm: string
      pipeline: string
      desktop: string
      extension: string
      video: string
      document: string
      ads: string
    }
  }
  contact: {
    heading: string
    subheading: string
    valueProps: string[]
    form: {
      name: string
      email: string
      company: string
      message: string
      product: string
      productPlaceholder: string
      submit: string
      submitting: string
      success: string
    }
  }
  footer: {
    tagline: string
    copyright: string
    links: {
      products: string
      contact: string
    }
  }
  demo: {
    title: string
    subheading: string
    name: string
    email: string
    productInterest: string
    submit: string
    submitting: string
    success: string
  }
}

export type VisualType = 'agents' | 'data' | 'monitor' | 'creative' | 'crm' | 'report' | 'desktop' | 'extension' | 'dms' | 'transcript' | 'ads'

export interface Product {
  id: string
  name: string
  icon: string
  category: 'automation' | 'monitoring' | 'crm' | 'pipeline' | 'desktop' | 'extension' | 'video' | 'document' | 'ads'
  featured: boolean
  headline: { vi: string; en: string }
  desc: { vi: string; en: string }
  cta: { vi: string; en: string }
  tech: string[]
  color: string
  gradient: string
  visual: VisualType
}
