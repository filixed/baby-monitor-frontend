import {describe, expect, it} from "vitest";
import {formatDuration} from "@/feauters/dashboard/utils/formatDuration.ts";

// describe = groups related tests under one name (usually the unit under test).
describe("formatDuration", () => {
    // it = one test case. Name it as a sentence describing the expected behaviour.
    it("shows only minutes when shorter than an hour", () => {
        // Arrange: fixed input. Never use `new Date()` here - tests must be deterministic.
        const start = "2026-01-01T10:00:00.000Z";
        const end = "2026-01-01T10:45:00.000Z";

        // Act: call the function.
        const result = formatDuration(start, end);

        // Assert: expect(actual).matcher(expected).
        expect(result).toBe("45 min");
    });

    it("shows only hours when minutes are zero", () => {
        expect(formatDuration("2026-01-01T10:00:00.000Z", "2026-01-01T12:00:00.000Z")).toBe("2 h");
    });

    it("shows hours and minutes together", () => {
        expect(formatDuration("2026-01-01T10:00:00.000Z", "2026-01-01T12:15:00.000Z")).toBe("2 h 15 min");
    });

    it("works across midnight (overnight sleep)", () => {
        expect(formatDuration("2026-01-01T22:30:00.000Z", "2026-01-02T06:00:00.000Z")).toBe("7 h 30 min");
    });

    it("rounds to the nearest minute", () => {
        // 29 seconds rounds down, 30 seconds rounds up.
        expect(formatDuration("2026-01-01T10:00:00.000Z", "2026-01-01T10:05:29.000Z")).toBe("5 min");
        expect(formatDuration("2026-01-01T10:00:00.000Z", "2026-01-01T10:05:30.000Z")).toBe("6 min");
    });
});
