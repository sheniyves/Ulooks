import { z } from "zod";

export const resetPassword = z.object({
  email: z.string().email("Invalid email address"),
});
