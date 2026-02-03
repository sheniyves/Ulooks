import { z } from "zod";

export const cancelAppointmentsSchema = z.object({
  reasonInText: z
    .string({
      required_error: "Please fill in reason",
    })
    .min(5, "Reason must be more than 5 characters"),
});
