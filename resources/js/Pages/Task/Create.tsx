import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { ProjectDataType } from "@/types/project";
import { PublicUser } from "@/types/user";

import { zodResolver } from "@hookform/resolvers/zod";
import { Head, router } from "@inertiajs/react";

import { Card, CardContent } from "@/Components/ui/card";
import { useForm } from "react-hook-form";
import TaskForm from "./partials/TaskForm";
import { FormDataType, formSchema } from "./schema/formSchema";

interface TaskPageProps {
  users: { data: PublicUser[] };
  projects: ProjectDataType[];
  projectId?: string;
}

export default function Create({
  auth,
  projects,
  users,
  projectId,
}: PageProps & TaskPageProps) {
  const form = useForm<FormDataType>({
    mode: "onSubmit",
    defaultValues: {
      projectID: projectId ?? "",
    },
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: FormDataType) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("status", values.status);
    if (values.description) formData.append("description", values.description);
    if (values.due_date) {
      formData.append("due_date", values.due_date.toISOString().split("T")[0]);
    }
    formData.append("priority", values.priority);
    if (values.assigned_user) {
      formData.append("assigned_user_id", values.assigned_user);
    }

    if (values.projectID) {
      formData.append("project_id", values.projectID);
    }

    if (values.image) {
      Array.from(values.image).forEach((file, index) => {
        formData.append(`image[${index}]`, file);
      });
    }

    router.post(route("task.store"), formData);
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Create New Task
          </h2>
        </div>
      }
    >
      <Head title="Tasks" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-6">
              <TaskForm
                form={form}
                onSubmit={onSubmit}
                projects={projects}
                users={users.data}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
