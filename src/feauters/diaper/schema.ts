import {z} from "zod";

export const diaperFormSchema = z.object({
    type: z.enum(["wet", "dirty", "both"]),
    description: z.optional(z.string()),
    date: z.string().min(1, "Date must be a valid"),
    time: z.string().min(1, "Time must be a valid"),
});