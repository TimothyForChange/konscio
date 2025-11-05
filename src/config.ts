export interface SiteConfig {
  title: string;
  tagline: string;
  description: string;
  author: {
    name: string;
    bio: string;
  };
  social: {
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
    name: "The Red Soil Collective",
    bio: "Critical eco-socialist and decolonial analysis from Africa and the Global South — exposing the systems that exploit both people and the planet.",
  },
  social: {
    email: "contact@theredsoil.co.za",
    kofi: "https://ko-fi.com/theredsoil",
  },
  siteUrl: "https://theredsoil.co.za",
  baseUrl: "/",
};
