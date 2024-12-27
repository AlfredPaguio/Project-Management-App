import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { ProjectDataType } from "@/types/project";
import { TaskDataType } from "@/types/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { Head, Link, router } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import ProjectForm from "./partials/ProjectForm";
import { FormDataType, formSchema } from "./schema/formSchema";

interface ProjectPageProps {
  project: ProjectDataType;
  tasks: TaskDataType[];
}

export default function Edit({ auth, project }: PageProps & ProjectPageProps) {
  const form = useForm<FormDataType>({
    values: project,
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: FormDataType) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("status", values.status);
    if (values.description) {
      formData.append("description", values.description);
    }
    if (values.due_date) {
      formData.append("due_date", values.due_date.toISOString().split("T")[0]);
    }
    if (values.image) {
      Array.from(values.image).forEach((file, index) => {
        formData.append(`image[${index}]`, file);
      });
    }

    formData.append("_method", "PATCH");

    router.post(route("project.update", project.id), formData);
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-center gap-x-4">
            <Button asChild>
              <Link href={route("project.show", project.id)}>
                <ArrowLeft className="mr-2 size-4" /> Back to Project
              </Link>
            </Button>
            <h2 className="font-semibold text-md lg:text-xl xl:text-2xl text-primary leading-tight">
              Edit Project: {project.name}
            </h2>
          </div>
        </div>
      }
    >
      <Head title={`Edit Project: ${project.name}`} />

      <div className="py-2">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-6">
              <ProjectForm
                form={form}
                onSubmit={onSubmit}
                projectID={project.id}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
