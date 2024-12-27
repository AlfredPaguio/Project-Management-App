import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { ProjectDataType } from "@/types/project";
import { TaskDataType } from "@/types/task";
import { getLabel } from "@/utils/getLabel";
import { Head, Link } from "@inertiajs/react";
import { columns as TaskDataTableColumns } from "../Task/columns";
import { ArrowLeft, Pencil, PlusIcon } from "lucide-react";
import { DataTable } from "@/Components/data-table/DataTable";
import { statuses } from "@/constant";

interface ProjectPageProps {
  project: ProjectDataType;
  tasks: TaskDataType[];
}

export default function Show({
  auth,
  project,
  tasks,
}: PageProps & ProjectPageProps) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-x-4">
            <Button asChild>
              <Link href={route("project.index")}>
                <ArrowLeft className="mr-2 size-4" /> Back to Projects
              </Link>
            </Button>
            <h2 className="font-semibold text-md lg:text-xl xl:text-2xl text-primary leading-tight">
              {project.name}
            </h2>
          </div>
          <div className="flex gap-2">
            <Button variant={"editable"} asChild>
              <Link href={route("project.edit", project.id)}>
                <Pencil className="mr-2 size-4" /> Edit
              </Link>
            </Button>
            <Button asChild>
              <Link href={route("task.create", { project_id: project.id })}>
                <PlusIcon className="mr-2 h-4 w-4" /> Add Task
              </Link>
            </Button>
          </div>
        </div>
      }
    >
      <Head title={`Project: "${project.name}"`} />

      <div className="py-2">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-sm sm:rounded-lg">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{project.name}</CardTitle>
                    <CardDescription>Project ID: {project.id}</CardDescription>
                  </div>
                  <Badge
                    className={
                      getLabel({ value: project.status, options: statuses })
                        .className
                    }
                  >
                    {
                      getLabel({ value: project.status, options: statuses })
                        .label
                    }
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-fit w-full overflow-hidden rounded-lg">
                  <img
                    src={project.image_path}
                    alt={project.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-500">Description:</p>
                  <p className="whitespace-pre-wrap">{project.description || "No description provided."}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center text-sm text-gray-500">
                <div>
                  Created by: {project.createdBy.name} on{" "}
                  {new Date(project.created_at).toLocaleDateString()}
                </div>
                <div>
                  Due: {new Date(project.due_date).toLocaleDateString()}
                </div>
              </CardFooter>
            </Card>

            <Separator />
            <Card className="mt-4 pb-4 overflow-hidden shadow-sm sm:rounded-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Project Tasks
                </CardTitle>
                <CardDescription>
                Lorem ipsum dolor sit amet.
              </CardDescription>
              </CardHeader>
              <DataTable columns={TaskDataTableColumns} data={tasks.data} />
            </Card>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
