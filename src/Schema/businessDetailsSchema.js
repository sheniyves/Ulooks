import { z } from "zod";

const validServices = [
  "harstyling",
  "makeup",
  "barbing",
  "spa_session",
  "beauty_and_grooming_services",
  "special_service",
  "hair_coloring_and_treatment",
  "laundry",
];

export const createAccountForm1 = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  gender: z
    .enum(["male", "female", "non_binary", "prefer_not_to_say"], {
      invalid_type_error: "Select a gender",
      required_error: "Gender is required",
    })
    .nullable(),
  phoneNumber: z.string().min(11, "Invalid phone number"),
  password: z.string().min(8, "Password must be more than 8 characters"),
  // confirmPassword: z
  //   .string()
  //   .min(8, "Password confirmation must be more than 8 characters"),
});
// .refine((data) => data.password === data.confirmPassword, {
//   path: ["confirmPassword"],
//   message: "Passwords don't match",
// });

export const createAccountFormStep2 = z.object({
  businessName: z.string().min(2, "Business name is required"),

  serviceCategory: z
    .enum(validServices)
    .nullable()
    .refine((val) => val !== null, {
      message: "Select a category",
    }),

  serviceOperationType: z
    .enum(["home_service", "vist_office", "both"])
    .nullable()
    .refine((val) => val !== null, {
      message: "Select an operation type",
    }),

  // yearsOfExperience: z
  //   .enum(["2_to_3 years", "4_to_5  years", "over 5 years"])
  //   .nullable()
  //   .refine((val) => val !== null, {
  //     message: "Select years of experience",
  //   }),
  yearsOfExperience: z
    .number({ invalid_type_error: "Years of experience must be a number" })
    .nonnegative("Years of experience cannot be negative"),

  businessLocation: z.string().min(6, "Enter business location"),

  localGovernmentOfBusiness: z
    .string()
    .min(6, "Enter your shop local govt. area"),
});

export const createAccountFormStep3 = z.object({
  bankAccountNumber: z
    .string()
    .min(10, "Bank account number must be at least 10 digits")
    .regex(/^\d+$/, "Bank account number must be numeric"),

  bankName: z.string().min(2, "Bank name is required"),

  // bvnNumber: z
  //   .string()
  //   .length(11, "BVN must be exactly 11 digits")
  //   .regex(/^\d+$/, "BVN must be numeric"),

  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Terms and Conditions",
  }),
});
