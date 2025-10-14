export interface User {
  name: string;
  profession: string;
  bio: string;
  links?: Link[];
}

export interface Mission {
  name: string;
  profession: string;
  bio: string;
  links?: Link[];
}

export interface Link {
  url: string;
  icon: string;
  title: string;
  description: string;
}
