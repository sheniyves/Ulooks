import { z } from "zod";

export const accountSchema = z.object({
  // fullName: z
  //   .string()
  //   .min(2, { message: "Full name must be at least 2 characters" })
  //   .max(100, { message: "Full name is too long" }),

  // email: z.string().email({ message: "Invalid email address" }),
  state: z
    .string()
    .min(2, { message: "State must be at least 2 characters" })
    .max(100, { message: "State is too long" }),
  city: z
    .string()
    .min(2, { message: "city must be at least 2 characters" })
    .max(100, { message: "city is too long" }),
  address: z
    .string()
    .min(2, { message: "address must be at least 2 characters" })
    .max(100, { message: "address is too long" }),

  // gender: z.enum(["male", "female", "non_binary", "prefer_not_to_say"], {
  //   errorMap: () => ({ message: "Please select a valid gender" }),
  // }),

  phoneNumber: z
    .string()
    .min(7, { message: "Phone number is too short" })
    .max(20, { message: "Phone number is too long" }),
});
