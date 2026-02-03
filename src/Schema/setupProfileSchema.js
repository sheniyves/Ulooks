import { z } from "zod";

// First define the base schema
const baseSchema = z.object({
  dayOfWeekAvailable: z.array(z.string())
    .nonempty("Please select at least one day of availability"),
  workTypes: z.array(z.string())
    .nonempty("Please select at least one work type"),
});

const timeSchema = z.object({
  timeType: z.enum(["preset", "custom"]),
  workHourRange: z.string().optional(),
  customStartHour: z.number()
    .min(0, "Start hour must be at least 0")
    .max(24, "Start hour must be at most 24")
    .optional(),
  customEndHour: z.number()
    .min(0, "End hour must be at least 0")
    .max(24, "End hour must be at most 24")
    .optional(),
});

export const setupProfile = baseSchema.extend(timeSchema.shape)
  .superRefine((data, ctx) => {
    if (data.timeType === "preset" && !data.workHourRange) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Work hour range is required for preset time",
        path: ["workHourRange"]
      });
    }
    
    if (data.timeType === "custom") {
      if (data.customStartHour === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Start hour is required for custom time",
          path: ["customStartHour"]
        });
      }
      if (data.customEndHour === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "End hour is required for custom time",
          path: ["customEndHour"]
        });
      }
      if (data.customStartHour !== undefined && 
          data.customEndHour !== undefined && 
          data.customStartHour >= data.customEndHour) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "End hour must be after start hour",
          path: ["customEndHour"]
        });
      }
    }
  });
