import { z } from "zod";

export const securitySchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, { message: "Current password must be at least 6 characters" }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
