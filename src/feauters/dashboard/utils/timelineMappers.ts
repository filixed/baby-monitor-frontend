import type {TimeLineEvent} from "@/feauters/dashboard/types.ts";
import type {Feeding} from "@/feauters/feeding/types.ts";
import type {Diaper} from "@/feauters/diaper/types.ts";
import type {Sleep} from "@/feauters/sleep/types.ts";
import type {Weight} from "@/feauters/weight/types.ts";
import {formatDuration} from "@/feauters/dashboard/utils/formatDuration.ts";

export function feedingToEvent(feeding: Feeding): TimeLineEvent {
    if (feeding.type === "bottle") {
        return {
            id: feeding.id,
            type: "feeding",
            timestamp: feeding.timestamp,
            title: "Bottle feeding",
            description: `${feeding.amountMl} ml`,
        };
    }

    return {
        id: feeding.id,
        type: "feeding",
        timestamp: feeding.timestamp,
        title: "Breastfeeding",
        description: `${feeding.side === "left" ? "Left" : "Right"} side · ${feeding.durationMinutes} min`,
    };
}

export function diaperToEvent(diaper: Diaper): TimeLineEvent {
    return {
        id: diaper.id,
        type: "diaper",
        timestamp: diaper.timestamp,
        title: "Diaper change",
        description: diaper.description ?? "",
    };
}

export function sleepToEvent(sleep: Sleep): TimeLineEvent {
    const duration = formatDuration(sleep.startTimestamp, sleep.endTimestamp);

    return {
        id: sleep.id,
        type: "sleep",
        timestamp: sleep.startTimestamp,
        title: "Sleep",
        description: sleep.description ? `${duration} · ${sleep.description}` : duration,
    };
}

export function weightToEvent(weight: Weight): TimeLineEvent {
    return {
        id: weight.id,
        type: "weight",
        timestamp: weight.timestamp,
        title: "Weight",
        description: `${weight.weightKg} kg`,
    };
}

export function sortEventsNewestFirst(events: TimeLineEvent[]): TimeLineEvent[] {
    return [...events].sort(
        (a, b) =>
            new Date(b.timestamp).getTime() -
            new Date(a.timestamp).getTime()
    );
}
