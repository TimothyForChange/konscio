/**
 * Represents the project's mission statement, including its name, a brief mission, and a detailed description.
 */
export interface Mission {
  name: string;
  mission: string;
  description: string;
  links?: ResourceLink[];
}

/**
 * Represents a single external resource link, containing a URL, icon, title, and description.
 */
export interface ResourceLink {
  url: string;
  icon: string;
  title: string;
  description: string;
}
