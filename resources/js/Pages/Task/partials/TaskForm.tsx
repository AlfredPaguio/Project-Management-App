import { useState } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { FormDataType } from "../schema/formSchema";

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
import { MAX_IMAGE_SIZE, priorities, statuses } from "@/constant";

import { Label } from "@/Components/ui/label";
import { ProjectDataType } from "@/types/project";
import { PublicUser } from "@/types/user";
import { cn } from "@/utils/cn";
import { getImageData } from "@/utils/getImageData";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";
import { CalendarIcon, UploadIcon } from "lucide-react";
import { TaskDataType } from "@/types/task";

interface TaskFormProps {
  form: UseFormReturn<FormDataType>;
  onSubmit: SubmitHandler<FormDataType>;
  users: PublicUser[];
  projects: ProjectDataType[];
  task?: Pick<TaskDataType, "image_path">;
}

// prop drilling pls don't do this
function TaskForm({ form, onSubmit, task, users, projects }: TaskFormProps) {
  const [preview, setPreview] = useState<string | null>(
    task?.image_path || null
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 space-y-8">
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value, ...props } }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
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
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>{" "}
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
                        const { files, displayUrl } = getImageData(event);
                        setPreview(displayUrl);
                        onChange(files);
                      }}
                      {...props}
                    />
                  </Label>
                </div>
              </FormControl>
              <FormDescription>This is your task image.</FormDescription>
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
              <FormDescription>This is your task description.</FormDescription>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <FormDescription>This is your task status.</FormDescription>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Priority" />
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
              <FormDescription>This is your task priority.</FormDescription>
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
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
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
              <FormDescription>This is your task priority.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value ?? ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Assign project" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id.toString()}>
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
              <FormDescription>Assigned Project.</FormDescription>
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
  );
}

export default TaskForm;
