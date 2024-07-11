import { Meta, NavigationLinks, PublicUser } from ".";

export interface Projects {
  data: ProjectDataType[];
  links: NavigationLinks;
  meta: Meta;
}

export interface ProjectDataType {
  id: number;
  name: string;
  description: string;
  image_path: string;
  created_at: Date;
  due_date: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  createdBy: PublicUser;
  updatedBy: PublicUser;
}
