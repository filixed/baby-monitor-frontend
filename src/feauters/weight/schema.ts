import {z} from "zod";

export const weightFormSchema = z.object({
    date: z.string().min(1, "Date must be a valid"),
    weightKg: z
        .number({error: "Weight must be a number"})
        .positive("Weight must be greater than 0"),
});
