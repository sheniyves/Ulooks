import { z } from "zod";
import { withdrawschema } from "./withdrawSchema";

export const cardSchema = withdrawschema.extend({
  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
  expirationDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      "Expiration date must be in MM/YY format"
    ),
});
