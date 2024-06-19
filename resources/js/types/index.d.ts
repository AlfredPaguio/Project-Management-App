export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
}

export type PublicUser = Omit<User, "email_verified_at">;

export interface Projects {
  data: ProjectData[];
  links: NavigationLinks;
  meta: Meta;
}

export interface ProjectData {
  id: number;
  name: string;
  description: string;
  image_path: string;
  created_at: Date;
  due_date: Date;
  status: string;
  createdBy: PublicUser;
  updatedBy: PublicUser;
}

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
  flash: {
    message?: string;
  };
  projects: Projects;
  ziggy: {
    location: string | null;
    query: Record<string, any>;
  };
};
