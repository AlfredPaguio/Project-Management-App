import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useState } from "react";
import { z } from "zod";
import { sizeInMB } from "@/utils/fileSizeUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const MAX_IMAGE_SIZE = 4; //In MegaBytes
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

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
  assigned_user_id: z.string().optional().nullable(),
  project: z.string().min(1, "Project is required."),
});

export default function Create({ auth, projects, users }: PageProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
  });

  const [preview, setPreview] = useState<string | null>(null);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("status", values.status);
    formData.append("description", values?.description);
    formData.append("due_date", values?.due_date);
    formData.append("priority", values.priority);
    formData.append("assigned_user_id", values?.assigned_user_id);

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
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg"></div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
