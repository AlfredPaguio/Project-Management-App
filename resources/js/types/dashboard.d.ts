import { ProjectDataType } from "./project";
import { TaskDataType } from "./task";

interface StatusCount {
  status: "pending" | "in_progress" | "completed" | "cancelled";
  count: number;
}

interface DashboardData {
  //https://laravel.com/docs/11.x/eloquent-resources#data-wrapping-and-pagination
  recentProjects: { data: ProjectDataType[] };
  recentTasks: { data: TaskDataType[] };
  projectCount: number;
  taskCount: number;
  userCount: number;
  completedTaskCount: number;
  projectStatusCounts: StatusCount[];
  taskStatusCounts: StatusCount[];
  projectCountChange: number;
  taskCountChange: number;
  userCountChange: number;
  completedTaskCountChange: number;
}
