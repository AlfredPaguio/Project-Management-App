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
          {/* <h2 className="font-semibold text-xl  leading-tight">
            {isMyTasks ? "My Tasks" : "All Tasks"}
          </h2> */}
          <div className="flex flex-col space-y-1.5">
            <h3 className="text-2xl font-semibold leading-tight tracking-tight">
              {isMyTasks ? "My Tasks" : "All Tasks"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isMyTasks
                ? "View and manage your assigned tasks"
                : "Overview of all tasks in the system"}
            </p>
          </div>
          <Button asChild>
            <Link href={route("task.create")}>
              <Plus className="mr-2 size-4" /> Create New Task
            </Link>
          </Button>
        </div>
      }
    >
      <Head title={isMyTasks ? "My Tasks" : "Tasks"} />

      <div className="py-4">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card className=" overflow-hidden shadow-sm sm:rounded-lg p-4">
            {/* <CardHeader>
              <CardTitle className="text-2xl font-bold ">
                {isMyTasks ? "My Task List" : "Task Management"}
              </CardTitle>
              <CardDescription>
                {isMyTasks
                  ? "View and manage your assigned tasks"
                  : "Overview of all tasks in the system"}
              </CardDescription>
            </CardHeader> */}
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
