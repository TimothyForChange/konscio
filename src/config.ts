import avatarImg from "./assets/avatar.webp";

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
    kofi?: string;
  };
  siteUrl: string;
  baseUrl: string;
}

export const config: SiteConfig = {
  title: "The Red Soil",
  tagline:
    "For people and planet: eco-socialist analysis from Africa and the Global South",
  description:
    "Eco-socialist analysis and decolonial thought from Africa and the Global South — for people and planet.",
  author: {
    name: "Timothy Brits",
    bio: "Timothy writes from South Africa on capitalism, colonialism, and climate collapse. He believes liberation is impossible without dismantling the systems that exploit both people and the planet — and that a decolonised, eco-socialist future is not optional, but necessary.",
    avatar: avatarImg.src,
  },
  social: {
    github: "https://github.com/CodeAndHammer/konscio",
    threads: "https://threads.com/@codeandhammer",
    instagram: "https://instagram.com/codeandhammer",
    email: "contact@theredsoil.co.za",
    kofi: "https://ko-fi.com/theredsoil",
  },
  siteUrl: "https://theredsoil.co.za",
  baseUrl: "/",
};
