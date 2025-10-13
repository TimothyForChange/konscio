import type { Country, Link } from './Country';

export interface User {
  name: string;
  profession?: string;
  bio?: string;
  countries?: Country[];
  links?: Link[];
}
