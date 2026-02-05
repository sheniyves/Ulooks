import { z } from "zod";

export const supportSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" })
    .max(100, { message: "Full name must be less than 100 characters" }),

  email: z.string().email({ message: "Please enter a valid email address" }),
  category: z.enum([
    "general_inquiry",
    "technical_issue",
    "billing_issue",
    "account_issue",
    "feature_request",
    "report_violation",
    "other",
  ]),
  priority: z.enum(["low", "medium", "high", "critical"]),
  subject: z
    .string()
    .min(2, { message: "Subject must be at least 2 characters" })
    .max(100, { message: "Subject must be less than 100 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
});
