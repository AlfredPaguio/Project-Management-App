import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface QueryParams {
  sort?: string;
  field?: string;
  name?: string;
  status?: string;
}

interface ProjectPageProps {
  queryParams?: QueryParams | null;
}

function Index({ auth, projects }: PageProps & ProjectPageProps) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Projects
        </h2>
      }
    >
      <Head title="Projects" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <DataTable columns={columns} data={projects.data} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Index;
