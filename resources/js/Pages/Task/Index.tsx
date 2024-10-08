import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { columns } from "./columns";
import { DataTable } from "@/Components/data-table/DataTable";
import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";

interface QueryParams {
  sort?: string;
  field?: string;
  name?: string;
  status?: string;
}

interface TaskPageProps {
  queryParams?: QueryParams | null;
}

function Index({ auth, tasks }: PageProps & TaskPageProps) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Tasks
        </h2>
        <Button asChild>
          <Link href={route("task.create")}>
            <Plus className="mr-2 size-4" /> Create New Task
          </Link>
        </Button>
      </div>
      }
    >
      <Head title="Tasks" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <DataTable columns={columns} data={tasks.data} key={"TaskTable"} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Index;
