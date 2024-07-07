import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { ProjectDataType } from "@/types/project";
import { Head } from "@inertiajs/react";

export default function Show({
  auth,
  project,
}: PageProps & { project: ProjectDataType }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          {`Project: "${project.name}"`}
        </h2>
      }
    >
      <Head title={`Project: "${project.name}"`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <pre>{JSON.stringify(project, undefined, 2)}</pre>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
