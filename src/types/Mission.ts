export interface Mission {
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
