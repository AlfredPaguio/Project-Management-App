import { Meta, NavigationLinks, PublicUser } from ".";
import { ProjectDataType } from "./project";

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
  updated_at: Date;
  due_date: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'highest';
  createdBy: PublicUser;
  updatedBy: PublicUser;
  assignedUser: PublicUser;
  project: ProjectDataType;
}
