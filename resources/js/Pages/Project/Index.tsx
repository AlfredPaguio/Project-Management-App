import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { STATUS } from "@/constant";
import { PageProps, ProjectDataType } from "@/types";
import { getQuery } from "@/utils/getQuery";
import { getStatusLabel } from "@/utils/getStatusLabel";
import { Head, Link, router } from "@inertiajs/react";
import { useCallback, useState } from "react";
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
  const [queryParamsState, setQueryParamsState] = useState<QueryParams>({
    sort: getQuery("sort"),
    field: getQuery("field"),
    name: getQuery("name"),
    status: getQuery("status"),
  });

  const onChangeSearchField = useCallback(
    (name: keyof QueryParams, value: string) => {
      const updatedParams = { ...queryParamsState, [name]: value || undefined };
      if (!value || value == null) {
        delete updatedParams[name];
      }
      setQueryParamsState(updatedParams);
      router.visit(route("project.index", updatedParams), {
        replace: true,
      });
    },
    [queryParamsState]
  );

  const deleteProject = (project: ProjectDataType) => {
    if (!window.confirm(`Are you sure you want to delete "${project.name}?"`)) {
      return;
    }
    router.delete(route("project.destroy", project.id));
  };

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

      {/* <pre>{JSON.stringify(projects, undefined, 2)}</pre> */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <DataTable columns={columns} data={projects.data} />
            {/* <Pagination links={projects.meta.links} /> */}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Index;
