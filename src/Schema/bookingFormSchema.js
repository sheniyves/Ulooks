import { z } from "zod";

export const bookingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(11, "Invalid phone number"),
  coupon: z.string().optional(),
});
