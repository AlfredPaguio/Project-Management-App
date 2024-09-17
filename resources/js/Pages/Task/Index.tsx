import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { columns } from "./columns";
import { DataTable } from "@/Components/data-table/DataTable";

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
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Tasks
        </h2>
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
