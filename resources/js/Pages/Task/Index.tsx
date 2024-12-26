import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { columns } from "./columns";
import { DataTable } from "@/Components/data-table/DataTable";
import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

interface TaskPageProps {
  isMyTasks?: boolean;
}

function Index({ auth, tasks, isMyTasks }: PageProps & TaskPageProps) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            {isMyTasks ? "My Tasks" : "All Tasks"}
          </h2>
          <Button asChild>
            <Link href={route("task.create")}>
              <Plus className="mr-2 size-4" /> Create New Task
            </Link>
          </Button>
        </div>
      }
    >
      <Head title={isMyTasks ? "My Tasks" : "Tasks"} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">
                {isMyTasks ? "My Task List" : "Task Management"}
              </CardTitle>
              <CardDescription>
                {isMyTasks
                  ? "View and manage your assigned tasks"
                  : "Overview of all tasks in the system"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={columns}
                data={tasks.data}
                key={isMyTasks ? "MyTaskTable" : "AllTaskTable"}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Index;
