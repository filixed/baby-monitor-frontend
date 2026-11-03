import {z} from "zod";
import {getLocalDateTimeDefaults} from "@/lib/dateTime.ts";

export const babyFormSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    dateOfBirth: z
        .string()
        .min(1, "Date of birth is required")
        // YYYY-MM-DD strings compare correctly as text.
        .refine((date) => date <= getLocalDateTimeDefaults().date, "Date of birth can't be in the future"),
});
