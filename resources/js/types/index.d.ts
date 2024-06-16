export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
}

export type PublicUser = Omit<User, "email_verified_at">;

export interface Project {
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

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    user: User;
  };
  projects: {
    data: Project[];
  };
};
