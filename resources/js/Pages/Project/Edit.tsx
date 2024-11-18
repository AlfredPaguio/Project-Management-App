import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, Link, router } from "@inertiajs/react";

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
import { ProjectDataType } from "@/types/project";
import { TaskDataType } from "@/types/task";
import { cn } from "@/utils/cn";
import { sizeInMB } from "@/utils/fileSizeUtils";
import { getImageData } from "@/utils/getImageData";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ArrowLeft, CalendarIcon, UploadIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE, statuses } from "@/constant";
import { Card, CardContent } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";

const formSchema = z.object({
  name: z.string().min(2),
  image: z
    .custom<FileList>()
    // .refine((files) => {
    //   return Array.from(files ?? []).length !== 0;
    // }, "Image is required")
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
});

interface ProjectPageProps {
  project: ProjectDataType;
  tasks: TaskDataType[];
}

export default function Edit({ auth, project }: PageProps & ProjectPageProps) {
  const [preview, setPreview] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    values: project,
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
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
            <Button variant={"outline"} asChild>
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

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, value, ...props } }) => (
                      <FormItem>
                        <FormLabel>Project Image</FormLabel>
                        <FormControl>
                          <div className="flex items-center justify-center w-full">
                          <Label
                              htmlFor="image-file"
                              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                            >
                              {preview ? (
                                <img
                                  src={preview}
                                  alt="Image preview"
                                  className="w-full h-64 object-contain rounded-lg"
                                />
                              ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
                                  <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">
                                      Click to upload
                                    </span>{" "}
                                    or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    PNG, JPG, GIF up to {MAX_IMAGE_SIZE}MB
                                  </p>
                                </div>
                              )}

                              <Input
                                id="image-file"
                                type="file"
                                className="hidden"
                                onChange={(event) => {
                                  const { files, displayUrl } =
                                    getImageData(event);
                                  setPreview(displayUrl);
                                  onChange(files);
                                }}
                                {...props}
                              />
                            </Label>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Upload a new image or keep the existing one.
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
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Update the name of your project.
                        </FormDescription>
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
                          <Textarea {...field} />
                        </FormControl>
                        <FormDescription>
                          Update the project description (optional).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="due_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Due Date</FormLabel>
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
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date("1900-01-01")}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Update the project deadline (optional).
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
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(statuses).map(([key, status]) => (
                              <SelectItem key={key} value={status.value}>
                                <div className="flex items-center">
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
                          Update the current status of your project.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" asChild>
                      <Link href={route("project.show", project.id)}>
                        Cancel
                      </Link>
                    </Button>
                    <Button type="submit">Update Project</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
