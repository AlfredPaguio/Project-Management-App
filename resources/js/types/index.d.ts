import { DashboardData } from "./dashboard";
import { Projects } from "./project";
import { Tasks } from "./task";
import { User } from "./user";

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
  dashboardData: DashboardData;
  flash: Record<string, string | undefined>;
  projects: Projects;
  tasks: Tasks;
  ziggy: {
    location: string | null;
    query: Record<string, any>;
  };
};
