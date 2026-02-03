import { z } from "zod";

export const withdrawschema = z.object({
  cardName: z
    .string()
    .min(2, "Cardholder name must be at least 2 characters long")
    .max(50, "Cardholder name must be at most 50 characters"),
  
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, "Card number must be 16 digits"),

  accountNumber: z
    .string()
    .regex(/^\d{10}$/, "Account number must be 10 digits"),

  amountToFund: z
    .string()
    .regex(/^\d+$/, "Amount must be a valid number"),
});


