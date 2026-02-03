import { z } from "zod";

export const signInForm = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be more than 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
  // agreedToTerms: z.literal(true, {
  //   errorMap: () => ({
  //     message: "You must agree to the Terms and Conditions",
  //   }),
  // }),
});
