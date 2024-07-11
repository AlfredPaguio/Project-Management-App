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
import { getStatusLabel } from "@/utils/getStatusLabel";
import { Head, Link } from "@inertiajs/react";
import { DataTable as TaskDataTable } from "../Task/data-table";
import { columns as TaskDataTableColumns } from "../Task/columns";
import { ArrowLeft, Pencil } from "lucide-react";

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
                <ArrowLeft className="mr-2 size-4" /> Back
              </Link>
            </Button>
            <h2 className="font-semibold text-md lg:text-xl xl:text-2xl text-primary leading-tight">
              {`Project "${project.name}"`}
            </h2>
          </div>
          <Button variant={"editable"} asChild>
            <Link href={route("project.edit", project.id)}>
              <Pencil className="mr-2 size-4" /> Edit
            </Link>
          </Button>
        </div>
      }
    >
      <Head title={`Project: "${project.name}"`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
            <div>
              <img
                src={project.image_path}
                alt="N/A"
                className="w-full h-64 object-cover"
              />
            </div>
            <Card>
              <CardHeader>
                <Label>Project ID: {project.id}</Label>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>
                  Status: <Badge>{getStatusLabel(project.status)}</Badge> | Due:{" "}
                  {new Date(project.due_date).toLocaleDateString()}
                </CardDescription>
                <CardDescription>
                  Created by: {project.createdBy.name} | Created:{" "}
                  {new Date(project.created_at).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{project.description}</p>
              </CardContent>
              <CardFooter>
                <CardDescription>
                  Updated by: {project.updatedBy.name} | Updated:{" "}
                  {new Date(project.updated_at).toLocaleDateString()}
                </CardDescription>
              </CardFooter>
            </Card>
            <Separator className="my-4" />
            <div className="p-4">
              <TaskDataTable columns={TaskDataTableColumns} data={tasks.data} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
