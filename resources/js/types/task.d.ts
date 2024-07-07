import { Meta, NavigationLinks, PublicUser } from ".";

export interface Tasks {
  data: TaskDataType[];
  links: NavigationLinks;
  meta: Meta;
}

export interface TaskDataType {
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
