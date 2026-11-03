import {z} from "zod";
import {toUtcIsoTimestamp} from "@/lib/dateTime.ts";

export const sleepFormSchema = z.object({
    description: z.optional(z.string()),
    startDate: z.string().min(1, "Start date must be a valid"),
    startTime: z.string().min(1, "Start time must be a valid"),
    endDate: z.string().min(1, "End date must be a valid"),
    endTime: z.string().min(1, "End time must be a valid"),
}).refine(
    (data) =>
        !data.startDate || !data.startTime || !data.endDate || !data.endTime ||
        toUtcIsoTimestamp(data.endDate, data.endTime) > toUtcIsoTimestamp(data.startDate, data.startTime),
    {message: "End must be after start", path: ["endTime"]},
);
