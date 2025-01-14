import { DataTable } from "@/Components/data-table/DataTable";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { statuses } from "@/constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { getLabel } from "@/utils/getLabel";
import { Head, Link } from "@inertiajs/react";
import {
  Calendar,
  EyeIcon,
  Layout,
  List,
  Plus,
  Settings,
  User,
} from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { columns as TaskColumns } from "../Task/columns";

const chartConfig = {
  projects: {
    label: "Total Projects",
    color: "hsl(var(--chart-1))",
  },
  tasks: {
    label: "Total Tasks",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function Dashboard({ auth, dashboardData }: PageProps) {
  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  const projectStatusData = dashboardData.projectStatusCounts.map((item) => ({
    name: item.status,
    total: item.count,
  }));

  const taskStatusData = dashboardData.taskStatusCounts.map((item) => ({
    name: item.status,
    total: item.count,
  }));

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-foreground leading-tight">
            Dashboard
          </h2>
        </div>
      }
    >
      <Head title="Dashboard" />

      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="py-2 space-y-8">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Projects
                  </CardTitle>
                  <Layout className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardData.projectCount}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {dashboardData.projectCountChange > 0 ? "+" : ""}
                    {dashboardData.projectCountChange} from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Tasks
                  </CardTitle>
                  <List className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardData.taskCount}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {dashboardData.taskCountChange > 0 ? "+" : ""}
                    {dashboardData.taskCountChange} from last week
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Team Members
                  </CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardData.userCount}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {dashboardData.userCountChange > 0 ? "+" : ""}
                    {dashboardData.userCountChange} new member
                    {dashboardData.userCountChange !== 1 ? "s" : ""} this month
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completed Tasks
                  </CardTitle>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardData.completedTaskCount}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {dashboardData.completedTaskCountChange > 0 ? "+" : ""}
                    {dashboardData.completedTaskCountChange}% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    Project Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={chartConfig}
                    className="min-h-[300px] w-full"
                  >
                    <BarChart accessibilityLayer data={projectStatusData}>
                      <XAxis
                        dataKey="name"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) =>
                          getLabel({ value: value, options: statuses }).label
                        }
                      />
                      <YAxis
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                      />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        labelFormatter={(value) =>
                          getLabel({ value: value, options: statuses }).label
                        }
                      />
                      <Bar
                        dataKey="total"
                        fill="var(--color-projects)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    Task Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={chartConfig}
                    className="min-h-[300px] w-full"
                  >
                    <BarChart data={taskStatusData}>
                      <XAxis
                        dataKey="name"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) =>
                          getLabel({ value: value, options: statuses }).label
                        }
                      />
                      <YAxis
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                      />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        labelFormatter={(value) =>
                          getLabel({ value: value, options: statuses }).label
                        }
                      />
                      <Bar
                        dataKey="total"
                        fill="var(--color-tasks)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-lg">
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold">
                  Recent Projects
                </CardTitle>
                <Button variant="outline" asChild>
                  <Link href={route("project.create")}>
                    <Plus className="mr-2 size-4" /> Add Project
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] w-full">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {dashboardData.recentProjects.data.map((project) => (
                      <Link href={route("project.show", project.id)}>
                        <Card
                          key={project.id}
                          className="shadow hover:shadow-md transition-shadow duration-300"
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-semibold">
                              {project.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm line-clamp-2 mb-2">
                              {project.description}
                            </p>
                            <div className="flex justify-between items-center text-xs">
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(
                                  project.due_date
                                ).toLocaleDateString()}
                              </div>
                              <Badge
                                className={
                                  getLabel({
                                    value: project.status,
                                    options: statuses,
                                  }).className
                                }
                              >
                                {
                                  getLabel({
                                    value: project.status,
                                    options: statuses,
                                  }).label
                                }
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold">
                  My Recent Tasks
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="editable" asChild>
                    <Link href={route("task.create")}>
                      <Plus className="mr-2 size-4" /> Add Task
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href={route("task.myTasks")}>
                      <EyeIcon className="mr-2 size-4" /> Show More
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={TaskColumns}
                  data={dashboardData.recentTasks.data}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </AuthenticatedLayout>
  );
}
