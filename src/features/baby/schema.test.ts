import {describe, expect, it} from "vitest";
import {babyFormSchema} from "@/features/baby/schema.ts";
import {getLocalDateTimeDefaults} from "@/lib/dateTime.ts";

describe("babyFormSchema", () => {
    const today = getLocalDateTimeDefaults().date;

    it("accepts a name and a date of birth of today", () => {
        expect(babyFormSchema.safeParse({name: "Emma", dateOfBirth: today}).success).toBe(true);
    });

    it("rejects an empty or blank name", () => {
        expect(babyFormSchema.safeParse({name: "", dateOfBirth: today}).success).toBe(false);
        expect(babyFormSchema.safeParse({name: "   ", dateOfBirth: today}).success).toBe(false);
    });

    it("rejects a missing date of birth", () => {
        expect(babyFormSchema.safeParse({name: "Emma", dateOfBirth: ""}).success).toBe(false);
    });

    it("rejects a date of birth in the future", () => {
        const tomorrow = getLocalDateTimeDefaults(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)).date;
        expect(babyFormSchema.safeParse({name: "Emma", dateOfBirth: tomorrow}).success).toBe(false);
    });
});
