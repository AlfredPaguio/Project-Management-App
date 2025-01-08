import { z } from "zod";

export const formSchema = z
  .object({
    name: z.string().max(255),
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Za-z]/, "Password must contain at least one letter")
      .regex(/\d/, "Password must contain at least one digit")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      )
      // the optional doesn't work because zod doesn't treat empty string as null or undefined
      // so it's against conditions above (.min)
      .or(z.literal(""))
      .optional(),
    confirmPassword: z
      .string()
      .min(8)
      .or(z.literal("")) //pls work
      .optional(),
    avatar: z.instanceof(File).optional(),
    roles: z.array(z.number()),
    permissions: z.array(z.number()),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type FormDataType = z.infer<typeof formSchema>;
