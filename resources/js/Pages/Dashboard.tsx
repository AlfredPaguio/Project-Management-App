import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import {
  Layout,
  List,
  Plus,
  Settings,
  User,
  Calendar,
  Clock,
} from "lucide-react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Button } from "@/Components/ui/button";
import { statuses } from "@/constant";
import { getLabel } from "@/utils/getLabel";
import { columns as TaskColumns } from "./Task/columns";
import { DataTable } from "@/Components/data-table/DataTable";
import { Badge } from "@/Components/ui/badge";
import { ScrollArea } from "@/Components/ui/scroll-area";

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
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto px-6 py-8 space-y-8">
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
                      {dashboardData.userCountChange !== 1 ? "s" : ""} this
                      month
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
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
                  <CardTitle className="text-xl font-bold text-gray-800">
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
                        <Card
                          key={project.id}
                          className="bg-gray-50 shadow hover:shadow-md transition-shadow duration-300"
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-semibold text-gray-700">
                              {project.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                              {project.description}
                            </p>
                            <div className="flex justify-between items-center text-xs text-gray-400">
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
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="flex justify-between items-center">
                  <CardTitle className="text-xl font-bold text-gray-800">
                    Recent Tasks
                  </CardTitle>
                  <Button variant="outline" asChild>
                    <Link href={route("task.create")}>
                      <Plus className="mr-2 size-4" /> Add Task
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <DataTable
                    columns={TaskColumns}
                    data={dashboardData.recentTasks.data}
                  />
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
