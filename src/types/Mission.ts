/**
 * The project's mission statement.
 */
export interface Mission {
  name: string;
  mission: string;
  description: string;
  links?: ResourceLink[];
}

/**
 * A single external resource link.
 */
export interface ResourceLink {
  url: string;
  icon: string;
  title: string;
  description: string;
}
