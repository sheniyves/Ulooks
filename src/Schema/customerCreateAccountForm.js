import { z } from "zod";

export const createAccountForm = z.object({
  fullName: z.string().min(2, "Full name is required"),
  referralCode: z.string().optional(),
  email: z.string().email("Invalid email address"),
  agreedToTerms: z.literal(true, {
    errorMap: () => ({
      message: "You must agree to the Terms and Conditions",
    }),
  }),

  phoneNumber: z.string().min(11, "Invalid phone number"),
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
  gender: z.enum(["male", "female", "non_binary", "prefer_not_to_say"], {
    invalid_type_error: "Select a gender",
    required_error: "Gender is required",
  }),
  // confirmPassword: z
  //   .string()
  //   .min(8, "Password confirmation must be more than 8 characters"),
});
// .refine((data) => data.password === data.confirmPassword, {
//   path: ["confirmPassword"],
//   message: "Passwords don't match",
// });
