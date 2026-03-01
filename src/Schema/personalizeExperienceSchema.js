import { z } from "zod";
import { serviceOptions } from "../Utils/serviceOptions";

// CUSTOMER EXPERIENCE
const validCategories = [
  "beauty_treatments",
  "hair_removal",
  "makeup",
  "spa_and_wellness",
  "teeth_whitening",
  "cosmetic_procedures",
  "lashes_and_brows",
  "mens_grooming",
  "tailoring_and_alterations",
  "hair",
  "laundry_services",
  "nails",
  "tattoo",
  // "grooming",
  // "cosmetic_procedures",
];

const validServiceUsages = [
  "weekly",
  "bi_weekly",
  "monthly",
  "ocassionally",
  "rarely",
];

export const step1Schema = z.object({
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  selected: z
    .array(z.string())
    .min(1, "Select at least one category")
    .default([])
    .refine((values) => values.every((v) => validCategories.includes(v)), {
      message: "Invalid category selected",
    }),

  serviceUsage: z
    .enum([...validServiceUsages])
    .nullable()
    .refine((val) => val !== null, {
      message: "Select an option",
    }),
});

export const step3Schema = z.object({
  genderOfStylist: z.enum(["male", "female", "others", "not_gender_specific"], {
    errorMap: () => ({ message: "Select your preference" }),
  }),
  reminders: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select yes or no" }),
  }),
  saveFunds: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select yes or no" }),
  }),
});

// -------------------------- SERVICE PROVIDER EXPERIENCE -------------------------

export const step1SchemaSP = z.object({
  serviceType: z
    .array(z.string())
    .min(1, "Select at least one category")
    .default([])
    .refine((values) => values.every((v) => validCategories.includes(v)), {
      message: "Invalid category selected",
    }),
  howDoYouWork: z.enum(["Individual", "Group"]),
  preferableLocation: z.enum(["Home", "Office", "both"]),
  city: z.string().min(2, "Enter your location area"),
  serviceProviderLGA: z.string().min(2, "Enter LGA area"),
});

export const workTypeSchema = z.enum(["Shop", "Home services", "Events"]);

const timeSchema = z.object({
  timeType: z.enum(["preset", "custom"]),
  workHourRange: z.string().optional(),
  customStartHour: z
    .number()
    .min(0, "Start hour must be at least 0")
    .max(24, "Start hour must be at most 24")
    .optional(),
  customEndHour: z
    .number()
    .min(0, "End hour must be at least 0")
    .max(24, "End hour must be at most 24")
    .optional(),
});

export const step2SchemaSP = z
  .object({
    travelDistance: z.enum(["Within area", "Outside area"]),
    workingHoursType: z.enum(["yes", "no"]),
    dayOfWeekAvailable: z.array(z.string()).nonempty(),
    workTypes: z.array(z.string()).nonempty(),
  })
  .extend(timeSchema.shape)
  .superRefine((data, ctx) => {
    if (data.timeType === "preset" && !data.workHourRange) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please select a preset time range",
        path: ["workHourRange"],
      });
    }

    if (data.timeType === "custom") {
      if (data.customStartHour === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Start hour is required",
          path: ["customStartHour"],
        });
      }
      if (data.customEndHour === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "End hour is required",
          path: ["customEndHour"],
        });
      }
      if (
        data.customStartHour !== undefined &&
        data.customEndHour !== undefined &&
        data.customStartHour >= data.customEndHour
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "End hour must be after start hour",
          path: ["customEndHour"],
        });
      }
    }
  });

export const step3SchemaSP = z.object({
  haveAnyCertificate: z.enum(["yes", "no"], {
    required_error: "Please select an option",
  }),
  certificateImage: z
    .any()
    .refine(
      (file) => {
        if (!file) return true;

        const actualFile = file instanceof FileList ? file[0] : file;

        if (!(actualFile instanceof File)) return false;

        const acceptedTypes = [
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/gif",
        ];
        if (!acceptedTypes.includes(actualFile.type)) {
          return false;
        }

        return actualFile.size <= 25 * 1024 * 1024;
      },
      {
        message:
          "Please upload a valid image (JPEG, PNG, WEBP, or GIF) under 25MB",
      },
    )
    .optional(),

  businessLogo: z.any().refine(
    (file) => {
      if (!file) return false;

      const actualFile = file instanceof FileList ? file[0] : file;

      if (!(actualFile instanceof File)) return false;

      const acceptedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
      ];
      if (!acceptedTypes.includes(actualFile.type)) {
        return false;
      }

      return actualFile.size <= 25 * 1024 * 1024;
    },
    {
      message:
        "Please upload a valid image (JPEG, PNG, WEBP, or GIF) under 25MB",
    },
  ),
  // .optional(),

  businessBio: z
    .string()
    .min(
      10,
      "Write a brief description about your business (minimum 10 characters)",
    ),
});

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];
const duration = [10, 20, 30, 40, 50, 60, 120, 180];

const categoriesId = serviceOptions?.map((opt) => opt.value);
export const createServiceSchema = z.object({
  // serviceName: z.string().min(2, "Enter service name"),
  gender: z
    .enum(["male", "female", "non_binary", "prefer_not_to_say"], {
      invalid_type_error: "Select a gender",
      required_error: "Gender is required",
    })
    .nullable(),
  serviceEssential: z
    .array(
      z.object({
        name: z.string().min(1, "Service essential name is required"),
        price: z.union([z.string(), z.number()]).refine((val) => {
          if (typeof val === "string") return val.trim().length > 0;
          if (typeof val === "number") return val > 0;
          return false;
        }, "Price is required"),
      }),
    )
    .min(1, "At least one essential is required"),
  serviceCategory: z
    .number({
      required_error: "Please select a service category",
      invalid_type_error: "select service category",
    })
    .refine((val) => categoriesId.includes(val), {
      message: "Invalid category selected",
    }),

  serviceTimeFrame: z
    .number({
      required_error: "Please select a duration",
      invalid_type_error: "Please select a duration",
    })
    .refine((val) => duration.includes(val), {
      message: "Please select a duration",
    }),

  picture: z.any().refine(
    (file) => {
      if (!file) return true; //sets to optional

      const actualFile = file instanceof FileList ? file[0] : file;

      if (!(actualFile instanceof File)) return false;

      const acceptedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
      ];
      if (!acceptedTypes.includes(actualFile.type)) {
        return false;
      }

      return actualFile.size <= 25 * 1024 * 1024;
    },
    {
      message:
        "Please upload a valid image (JPEG, PNG, WEBP, or GIF) under 25MB",
    },
  ),

  amount: z
    .number({
      required_error: "Please enter an amount",
      invalid_type_error: "Amount must be a number",
    })
    .positive("Amount must be greater than 0")
    .max(1000000, "Amount is too large"),
});

export const createServiceEssentialSchema = z.object({
  serviceEssentialTitle: z.string().min(2, "Enter service essential title"),
  selectedService: z
    .string({
      required_error: "Please select a service category",
      invalid_type_error: "select service category",
    })
    .refine((val) => validCategories.includes(val), {
      message: "Invalid category selected",
    }),

  color: z.string().min(2, "Enter color of essential"),
  essentialDesc: z.string().min(10, "Enter service essential description"),

  essentialAmount: z
    .number({
      required_error: "Please enter an amount",
      invalid_type_error: "Amount must be a number",
    })
    .positive("Amount must be greater than 0")
    .max(1000000, "Amount is too large"),
});

export const createServiceWithEssentialSchema = createServiceSchema.merge(
  createServiceEssentialSchema,
);
