import { z } from "zod";

export const reviewSchema = z.object({
    review: z.string({
        required_error: "Please provide a review"
    }).min(5, "Review must be more than 5 characters"),
     opinion: z.string({
        required_error: "Please provide a review"
    }).min(5, "Review must be more than 5 characters")
})