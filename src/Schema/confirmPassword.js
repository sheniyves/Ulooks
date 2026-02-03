import { z } from "zod";

const confirmPasswordSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    otp: z
      .string()
      .length(6, "OTP must be exactly 6 digits")
      .regex(/^\d+$/, "OTP must contain only numbers"),
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
    confirmPassword: z
      .string()
      .min(8, "Password confirmation must be more than 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

export default confirmPasswordSchema;
