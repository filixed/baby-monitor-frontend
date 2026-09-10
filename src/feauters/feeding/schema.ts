import {z} from "zod";

// export const feedingFormSchema = z.object({
//     type: z.enum(["breast", "bottle"]),
//     amountMl: z
//         .number()
//         .positive("Amount cannot be negative")
//         .max(2000, "Amount cannot exceed 2000 ml"),
//     date: z.string().min(1, "Date must be a valid"),
//     time: z.string().min(1, "Time must be a valid"),
// })

export const feedingFormSchema = z.discriminatedUnion("type", [
    z.object({
        type: z.enum(["bottle"]),
        amountMl: z
            .number()
            .positive("Amount cannot be negative")
            .max(2000, "Amount cannot exceed 2000 ml"),
        date: z.string().min(1, "Date must be a valid"),
        time: z.string().min(1, "Time must be a valid"),
    }),
    z.object({
        type: z.enum(["breast"]),
        side: z.enum(["left", "right"]),
        durationMinutes: z
            .number()
            .positive("Amount cannot be negative")
            .max(180, "Duration cannot exceed 180 minutes"),
        date: z.string().min(1, "Date must be a valid"),
        time: z.string().min(1, "Time must be a valid"),
    })
]);