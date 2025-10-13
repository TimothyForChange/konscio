export interface Country {
  name: string;
  slug: string;
  flag?: string;
  description?: string;
  category?: string;
}

export interface Link {
  url: string;
  icon?: string;
  title?: string;
  description?: string;
}
