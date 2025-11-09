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
    buyMeACoffee?: string;
  };
  siteUrl: string;
  baseUrl: string;
}

export const config: SiteConfig = {
  title: "The Red Soil",
  tagline:
    "For people and planet: analysis for justice and ecology from Africa and the Global South",
  description:
    "Critical thought and reporting from Africa and the Global South — connecting struggles for social and ecological justice, and imagining life beyond exploitation.",
  author: {
    name: "The Red Soil Collective",
    bio: "Critical eco-socialist and decolonial analysis from Africa and the Global South — confronting the systems that exploit both people and the planet.",
  },
  social: {
    email: "contact@theredsoil.co.za",
    buyMeACoffee: "https://buymeacoffee.com/theredsoil",
  },
  siteUrl: "https://theredsoil.co.za",
  baseUrl: "/",
};
