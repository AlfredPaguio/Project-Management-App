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
import { priorities, statuses } from "@/constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { TaskDataType } from "@/types/task";
import { getLabel } from "@/utils/getLabel";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeftIcon, PencilIcon } from "lucide-react";

interface TaskPageProps {
  task: TaskDataType;
}

export default function Show({ auth, task }: PageProps & TaskPageProps) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-x-4">
            <Button asChild>
              <Link href={route("task.index")}>
                <ArrowLeftIcon className="mr-2 size-4" /> Back to Tasks
              </Link>
            </Button>
            <h2 className="font-semibold text-md lg:text-xl xl:text-2xl text-primary leading-tight">
              Task: {task.name}
            </h2>
          </div>
          <div className="flex gap-2">
            <Button variant={"editable"} asChild>
              <Link href={route("task.edit", task.id)}>
                <PencilIcon className="mr-2 size-4" /> Edit
              </Link>
            </Button>
          </div>
        </div>
      }
    >
      <Head title={`Task: "${task.name}"`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card>
            <img
              src={task.image_path}
              alt={task.name}
              className="w-full h-64 object-cover"
            />
            <CardHeader className="justify-center">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{task.name}</CardTitle>
                  <CardDescription>Task ID: {task.id}</CardDescription>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full">
                    <Label>Status: </Label>
                    <Badge
                      className={
                        getLabel({ value: task.status, options: statuses })
                          .className
                      }
                    >
                      {
                        getLabel({ value: task.status, options: statuses })
                          .label
                      }
                    </Badge>
                  </div>
                  <div className="w-full">
                    <Label>Priority: </Label>
                    <Badge
                      className={
                        getLabel({ value: task.priority, options: priorities })
                          .className
                      }
                    >
                      {
                        getLabel({ value: task.priority, options: priorities })
                          .label
                      }
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-1 grid-cols-2 mt-2">
                <div className="mt-4">
                  <Label className="font-bold text-lg">Created by</Label>
                  <p className="mt-1">{task.createdBy.name}</p>
                </div>

                <div>
                  <Label className="font-bold text-lg">Due</Label>
                  <p className="mt-1">
                    {new Date(task.due_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-4">
                  <Label className="font-bold text-lg">Create Date</Label>
                  <p className="mt-1">
                    {new Date(task.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-4">
                  <Label className="font-bold text-lg">Updated By</Label>
                  <p className="mt-1">{task.updatedBy.name}</p>
                </div>
                <div className="mt-4">
                  <Label className="font-bold text-lg">Project</Label>
                  <div className="mt-1 overflow-hidden">
                    <Button variant={"link"} className="p-0" asChild>
                      <Link href={route("project.show", task.project.id)}>
                        {task.project.name}
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="mt-4">
                  <Label className="font-bold text-lg">Assigned User</Label>
                  <p className="mt-1">{task.assignedUser.name}</p>
                </div>
              </div>

              <CardFooter className="mt-4 flex-col">
                <label className="font-bold text-lg">Task Description</label>
                <p className="mt-1">{task.description}</p>
              </CardFooter>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
