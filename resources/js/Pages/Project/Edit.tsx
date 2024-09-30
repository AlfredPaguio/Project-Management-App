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
import { ArrowLeft, CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE, statuses } from "@/constant";

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
            <Button asChild>
              <Link href={route("project.index")}>
                <ArrowLeft className="mr-2 size-4" /> Back
              </Link>
            </Button>
            <h2 className="font-semibold text-md lg:text-xl xl:text-2xl text-primary leading-tight">
              Edit Project "{project.name}"
            </h2>
          </div>
        </div>
      }
    >
      <Head title="Projects" />

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
                      {preview ? (
                        <img
                          src={preview}
                          alt="N/A"
                          className="w-full h-64 object-contain"
                        />
                      ) : (
                        <img
                          src={project.image_path}
                          alt="N/A"
                          className="w-full h-64 object-contain"
                        />
                      )}

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
                        This is your project image.
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
                        <Input placeholder="Project Name..." {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your project name.
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
                        <Textarea placeholder="Description..." {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your project description.
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
                      <FormLabel>Due date :</FormLabel>
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
                            disabled={
                              (date) =>
                                date < new Date() ||
                                date < new Date("1900-01-01")
                              // Disable dates that are before yesterday or before January 1, 1900 but I realized that this is the due date lol
                              // date <
                              //   new Date(
                              //     new Date().setDate(new Date().getDate() - 1)
                              //   ) || date < new Date("1900-01-01")
                            }
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
                        This is your project status.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="button" variant={"destructive"} asChild>
                  <Link href={route("project.index")}>Cancel</Link>
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
