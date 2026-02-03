import { z } from "zod";



export const KycSchemaStep2 = z
  .object({
    identification: z.enum(
      [
        "nin",
        "bvn",
        "internationalPassport",
        "driversLicense",
        "votersCard",
        "nic",
        "tin",
      ],
      {
        required_error: "Select a method of identification",
      }
    ),

    identificationNumber: z.string({
      required_error: "Identification number is required",
    }),

    identificationImage: z
      .any({
        required_error: "Please upload a valid image",
      })
      .refine(
        (file) => {
          const actualFile = file instanceof FileList ? file[0] : file;

          if (!(actualFile instanceof File)) return false;

          const acceptedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
          ];

          return (
            acceptedTypes.includes(actualFile.type) &&
            actualFile.size <= 25 * 1024 * 1024
          );
        },
        {
          message:
            "Please upload a valid image (JPEG, PNG, WEBP, or GIF) under 25MB",
        }
      ),
  })
  .superRefine((data, ctx) => {
    const { identification, identificationNumber } = data;

    const lengthMap = {
      nin: 11,
      bvn: 11,
      driversLicense: 16,
      internationalPassport: 9,
      votersCard: 19,
      nic: 10,
      tin: 10,
    };

    const expectedLength = lengthMap[identification];

    if (
      !identificationNumber ||
      identificationNumber.length !== expectedLength
    ) {
      ctx.addIssue({
        path: ["identificationNumber"],
        message: `Expected a ${expectedLength}-digit number for ${identification.toUpperCase()}`,
      });
    }
  });

export const KycSchemaStep3 = z.object({
  emergencyContactName: z
    .string()
    .min(2, "Full name of emergency contact is required"),

  emergencyContactRelationship: z.string().min(2, "Relationship is required"),

  phoneNumber: z.string().min(8, "Phone number is required"),

  emergencyContactAddress: z.string().optional(),
});
