import { z } from "zod";

export const supportSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" })
    .max(100, { message: "Full name must be less than 100 characters" }),
  
  email: z
    .string()
    .email({ message: "Please enter a valid email address" }),

  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
});
