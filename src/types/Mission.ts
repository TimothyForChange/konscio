/**
 * Mission statement data.
 */
export interface Mission {
  name: string;
  mission: string;
  description: string;
  links?: ResourceLink[];
}

/**
 * External resource link.
 */
export interface ResourceLink {
  url: string;
  icon: string;
  title: string;
  description: string;
}
