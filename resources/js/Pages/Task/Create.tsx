import { Button } from "@/Components/ui/button";
import { Calendar } from "@/Components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
  priorities,
  statuses,
} from "@/constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, PublicUser } from "@/types";
import { ProjectDataType } from "@/types/project";
import { cn } from "@/utils/cn";
import { sizeInMB } from "@/utils/fileSizeUtils";
import { getImageData } from "@/utils/getImageData";
import { zodResolver } from "@hookform/resolvers/zod";
import { Head, Link, router } from "@inertiajs/react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2),
  image: z
    .custom<FileList>()
    .optional()
    .refine((files) => {
      return Array.from(files ?? []).every(
        (file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE
      );
    }, `The maximum image size is ${MAX_IMAGE_SIZE}MB`)
    .refine((files) => {
      return Array.from(files ?? []).every((file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type)
      );
    }, "File type is not supported"),
  status: z.enum(["pending", "in_progress", "completed", "cancelled"]),
  description: z.string().min(2).optional(),
  due_date: z.coerce.date().optional(),
  priority: z.enum(["low", "medium", "high"], {
    errorMap: () => ({ message: "Task priority is required." }),
  }),
  assigned_user: z.string().optional().nullable(),
  project: z.string().min(1, "Project is required."),
});

interface TaskPageProps {
  users: { data: PublicUser[] };
  projects: ProjectDataType[];
}

export default function Create({
  auth,
  projects,
  users,
}: PageProps & TaskPageProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
  });

  const [preview, setPreview] = useState<string>("");

  function onSubmit(values: z.infer<typeof formSchema>) {
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

    if (values.project) {
      formData.append("project_id", values.project);
    }

    if (values.image) {
      Array.from(values.image).forEach((file, index) => {
        formData.append(`image[${index}]`, file);
      });
    }

    console.table(formData);
    console.table(values);

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
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="p-4 space-y-8"
              >
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { onChange, value, ...props } }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <img
                        src={preview}
                        alt="N/A"
                        className="w-full h-64 object-contain"
                      />
                      <FormControl>
                        <Input
                          type="file"
                          onChange={(event) => {
                            const { files, displayUrl } = getImageData(event);
                            setPreview(displayUrl);
                            onChange(files);
                          }}
                          {...props}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your task image.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Task Name..." {...field} />
                      </FormControl>
                      <FormDescription>This is your task name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Description..." {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your task description.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="due_date"
                  render={({ field }) => (
                    <FormItem className="space-x-2">
                      <FormLabel>Due date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            captionLayout="dropdown"
                            fromYear={2000}
                            toYear={new Date().getFullYear()}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        This is your project deadline/due date.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder="Select Status"
                              defaultValue={"pending"}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(statuses).map(([key, status]) => (
                            <SelectItem key={key} value={status.value}>
                              <div className="flex">
                                {status.icon && (
                                  <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                                )}
                                <span>{status.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        This is your task status.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder="Select Priority"
                              defaultValue={"medium"}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(priorities).map(([key, status]) => (
                            <SelectItem key={key} value={status.value}>
                              <div className="flex">
                                {status.icon && (
                                  <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                                )}
                                <span>{status.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        This is your task priority.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="assigned_user"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assign User</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value ?? ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Assign a user" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {users.data.map((user) => (
                            <SelectItem
                              key={user.id}
                              value={user.id.toString()}
                            >
                              <div className="flex">
                                {/*
                                !!TODO: profile pictures
                                {status.icon && (
                                  <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                                )} */}
                                <span>{user.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        This is your task priority.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="project"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value ?? ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Assign a user" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {projects.map((project) => (
                            <SelectItem
                              key={project.id}
                              value={project.id.toString()}
                            >
                              <div className="flex">
                                {/*
                                !!TODO: profile pictures
                                {status.icon && (
                                  <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                                )} */}
                                <span>{project.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        This is your task priority.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="button" variant={"destructive"} asChild>
                  <Link href={route("task.index")}>Cancel</Link>
                </Button>
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
