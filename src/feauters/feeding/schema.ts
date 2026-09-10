import {z} from "zod";

export const feedingFormSchema = z.object({
    type: z.enum(["breast", "bottle"]),
    amountMl: z
        .number()
        .positive("Amount cannot be negative")
        .max(2000, "Amount cannot exceed 2000 ml"),
    date: z.string().min(1, "Date must be a valid"),
    time: z.string().min(1, "Time must be a valid"),
})