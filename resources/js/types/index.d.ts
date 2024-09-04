import { Projects } from "./project";
import { Tasks } from "./task";

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
}

export type PublicUser = Omit<User, "email_verified_at">;

export interface NavigationLinks {
  first: string;
  last: string;
  prev: string;
  next: string;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: MetaLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface MetaLink {
  url: null | string;
  label: string;
  active: boolean;
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    user: User;
  };
  flash: Record<string, string | undefined>;
  projects: Projects;
  tasks: Tasks;
  ziggy: {
    location: string | null;
    query: Record<string, any>;
  };
};
