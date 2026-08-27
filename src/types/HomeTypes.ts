import type { ReactNode } from 'react';

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface TestimonialCardProps {
  company: string;
  quote: string;
  author: string;
  role: string;
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

export type TabId = 'relaciona' | 'oportunidades' | 'metricas' | 'equipe';

export interface TabData {
  id: TabId;
  label: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageGradient: string;
}