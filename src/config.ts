import avatarImg from './assets/avatar.webp';

export interface SiteConfig {
  title: string;
  tagline: string;
  description: string;
  author: {
    name: string;
    bio: string;
    avatar?: string;
  };
  social: {
    github?: string;
    threads?: string;
    instagram?: string;
    email?: string;
  };
  siteUrl: string;
  baseUrl: string;
  disableThemeToggle: boolean;
}

export const config: SiteConfig = {
  title: 'Timothy for Change',
  tagline:
    'For people and planet: eco-socialist analysis from Africa and the Global South',
  description:
    'Eco-socialist analysis and decolonial thought from Africa and the Global South — for people and planet.',
  author: {
    name: 'Timothy Brits',
    bio: 'Timothy writes from South Africa on capitalism, colonialism, and climate collapse. He believes liberation is impossible without dismantling the systems that exploit both people and the planet — and that a decolonised, eco-socialist future is not optional, but necessary.',
    avatar: avatarImg.src,
  },
  social: {
    github: 'https://github.com/timothyforchange/konscio',
    threads: 'https://threads.com/@timothyforchange',
    instagram: 'https://instagram.com/timothyforchange',
    email: 'contact@timothyforchange.co.za',
  },
  siteUrl: 'https://timothyforchange.co.za',
  baseUrl: '/',
  disableThemeToggle: true,
};
