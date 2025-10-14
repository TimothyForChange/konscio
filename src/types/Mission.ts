export interface User {
  name: string;
  profession: string;
  bio: string;
  links?: ResourceLink[];
}

export interface Mission {
  name: string;
  mission: string;
  description: string;
  links?: ResourceLink[];
}

export interface ResourceLink {
  url: string;
  icon: string;
  title: string;
  description: string;
}
