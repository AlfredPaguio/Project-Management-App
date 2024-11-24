import { Card, CardContent } from "@/Components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, PublicUser } from "@/types";
import { ProjectDataType } from "@/types/project";
import { TaskDataType } from "@/types/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { Head, Link, router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import TaskForm from "./partials/TaskForm";
import { FormDataType, formSchema } from "./schema/formSchema";
import { Button } from "@/Components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

interface TaskPageProps {
  users: { data: PublicUser[] };
  projects: ProjectDataType[];
  task: TaskDataType;
}

export default function Edit({
  auth,
  projects,
  users,
  task,
}: PageProps & TaskPageProps) {
  const form = useForm<FormDataType>({
    mode: "onSubmit",
    values: {
      projectID: task.project.id.toString(),
      ...task,
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
    formData.append("_method", "PATCH");

    router.post(route("task.update", task.id), formData);
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-center gap-x-4">
            <Button asChild>
              <Link href={route("task.show", task.id)}>
                <ArrowLeftIcon className="mr-2 size-4" /> Back to Task
              </Link>
            </Button>
            <h2 className="font-semibold text-md lg:text-xl xl:text-2xl text-primary leading-tight">
              Edit Task: {task.name}
            </h2>
          </div>
        </div>
      }
    >
      <Head title={`Edit Task: ${task.name}`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-6">
              <TaskForm
                form={form}
                onSubmit={onSubmit}
                projects={projects.data}
                users={users.data}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
