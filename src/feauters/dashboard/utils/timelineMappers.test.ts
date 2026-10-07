import {describe, expect, it} from "vitest";
import {sleepToEvent, sortEventsNewestFirst} from "@/feauters/dashboard/utils/timelineMappers.ts";
import type {TimeLineEvent} from "@/feauters/dashboard/types.ts";

describe("sleepToEvent", () => {
    const sleep = {
        id: "s1",
        description: undefined,
        startTimestamp: "2026-01-01T10:00:00.000Z",
        endTimestamp: "2026-01-01T11:30:00.000Z",
    };

    it("places the event at the start and uses the duration as description", () => {
        // toEqual compares objects by value (toBe would compare references).
        expect(sleepToEvent(sleep)).toEqual({
            id: "s1",
            type: "sleep",
            timestamp: "2026-01-01T10:00:00.000Z",
            title: "Sleep",
            description: "1 h 30 min",
        });
    });

    it("appends the optional description", () => {
        expect(sleepToEvent({...sleep, description: "nap"}).description).toBe("1 h 30 min · nap");
    });
});

describe("sortEventsNewestFirst", () => {
    // Small factory so each test only states what matters (the timestamp).
    const event = (id: string, timestamp: string): TimeLineEvent => ({
        id,
        type: "diaper",
        timestamp,
        title: "Diaper change",
        description: "",
    });

    it("orders events from newest to oldest", () => {
        const events = [
            event("old", "2026-01-01T08:00:00.000Z"),
            event("new", "2026-01-01T12:00:00.000Z"),
            event("mid", "2026-01-01T10:00:00.000Z"),
        ];

        expect(sortEventsNewestFirst(events).map((e) => e.id)).toEqual(["new", "mid", "old"]);
    });

    it("does not mutate the input array", () => {
        const events = [
            event("old", "2026-01-01T08:00:00.000Z"),
            event("new", "2026-01-01T12:00:00.000Z"),
        ];

        sortEventsNewestFirst(events);

        expect(events.map((e) => e.id)).toEqual(["old", "new"]);
    });
});
