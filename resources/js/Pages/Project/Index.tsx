import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { columns } from "./columns";
import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/Components/data-table/DataTable";

function Index({ auth, projects }: PageProps) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Projects
          </h2>
          <Button asChild>
            <Link href={route("project.create")}>
              <Plus className="mr-2 size-4" /> Create New Project
            </Link>
          </Button>
        </div>
      }
    >
      <Head title="Projects" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <DataTable
              columns={columns}
              data={projects.data}
              key={"ProjectTable"}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Index;
