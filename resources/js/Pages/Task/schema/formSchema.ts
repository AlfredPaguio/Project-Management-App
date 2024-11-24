import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE } from "@/constant";
import { sizeInMB } from "@/utils/fileSizeUtils";
import { z } from "zod";

export const formSchema = z.object({
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
  priority: z.enum(["low", "medium", "high", "highest"], {
    errorMap: () => ({ message: "Task priority is required." }),
  }),
  assigned_user: z.string().optional().nullable(),
  projectID: z.coerce.string().min(1, "Project is required."),
});

export type FormDataType = z.infer<typeof formSchema>;
