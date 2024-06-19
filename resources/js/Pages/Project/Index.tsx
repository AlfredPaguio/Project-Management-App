import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { STATUS } from "@/constant";
import { PageProps, ProjectData } from "@/types";
import { getQuery } from "@/utils/getQuery";
import { getStatusLabel } from "@/utils/getStatusLabel";
import { Head, Link, router } from "@inertiajs/react";
import { useCallback, useState } from "react";

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

  const deleteProject = (project: ProjectData) => {
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
            <div className="p-6 text-gray-900">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <th className="p-3">ID</th>
                    <th className="p-3">Image</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Creation Date</th>
                    <th className="p-3">Due Date</th>
                    <th className="p-3">Created By</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3">
                      <TextInput
                        className="w-full"
                        value={queryParamsState?.name}
                        placeholder="Project Name"
                        onChange={(e) =>
                          onChangeSearchField("name", e.target.value)
                        }
                      />
                    </th>
                    <th className="px-3 py-3">
                      <SelectInput
                        className="w-full"
                        value={queryParamsState?.status}
                        onChange={(e) =>
                          onChangeSearchField("status", e.target.value)
                        }
                      >
                        <option value="">Select Status</option>
                        {Object.keys(STATUS).map((key) => (
                          <option key={key} value={key}>
                            {getStatusLabel(key)}
                          </option>
                        ))}
                      </SelectInput>
                    </th>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {projects.data.map((project) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={project.id}
                    >
                      <td className="px-3 py-2">{project.id}</td>
                      <td className="px-3 py-2">
                        <img
                          src={project.image_path}
                          style={{ width: 60 }}
                          loading="lazy"
                        />
                      </td>
                      <th className="px-3 py-2 text-gray-100 text-nowrap hover:underline">
                        <Link href={route("project.show", project.id)}>
                          {project.name}
                        </Link>
                      </th>
                      <td className="px-3 py-2">
                        <span className={"px-2 py-1 rounded text-white"}>
                          {getStatusLabel(project.status)}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-nowrap">
                        {new Date(project.created_at).toDateString()}
                      </td>
                      <td className="px-3 py-2 text-nowrap">
                        {new Date(project.due_date).toDateString()}
                      </td>
                      <td className="px-3 py-2">{project.createdBy.name}</td>
                      <td className="px-3 py-2 text-nowrap">
                        <Link
                          href={route("project.edit", project.id)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={(e) => deleteProject(project)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination links={projects.meta.links} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Index;
