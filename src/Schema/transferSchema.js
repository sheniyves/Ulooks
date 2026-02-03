import { z } from "zod";

export const transferSchema = z.object({
  accountName: z
    .string()
    .min(2, "Account name must be at least 2 characters long")
    .max(50, "Account name must be at most 50 characters"),

  bank: z
    .string()
    .min(2, "Bank name must be at least 2 characters long")
    .max(50, "Bank name must be at most 50 characters"),

  accountNumber: z
    .string()
    .regex(/^\d{10}$/, "Account number must be exactly 10 digits"),

  amountToFund: z
    .string()
    .regex(/^\d+$/, "Amount must be a valid number"),

  transferReceipt: z
    .any()
    .refine((files) => files && files.length > 0, {
      message: "Transfer receipt is required",
    }),
});
