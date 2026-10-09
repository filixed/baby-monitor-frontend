import {describe, expect, it} from "vitest";
import {formatAge} from "@/feauters/baby/utils/formatAge.ts";

describe("formatAge", () => {
    const now = new Date(2026, 9, 8, 15, 30);

    it("counts whole days since birth", () => {
        expect(formatAge("2026-09-24", now)).toBe("14 days old");
    });

    it("uses singular for one day", () => {
        expect(formatAge("2026-10-07", now)).toBe("1 day old");
    });

    it("returns 0 days on the birth date", () => {
        expect(formatAge("2026-10-08", now)).toBe("0 days old");
    });

    it("does not go negative for future dates", () => {
        expect(formatAge("2026-10-20", now)).toBe("0 days old");
    });
});
