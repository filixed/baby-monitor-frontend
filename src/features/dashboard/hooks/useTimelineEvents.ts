import {useMemo} from "react";
import type {TimeLineEvent} from "@/features/dashboard/types.ts";
import {useFeedingStore} from "@/features/feeding/store.ts";
import {useDiaperStore} from "@/features/diaper/store.ts";
import {useSleepStore} from "@/features/sleep/store.ts";
import {useWeightStore} from "@/features/weight/store.ts";
import {
    diaperToEvent,
    feedingToEvent,
    sleepToEvent,
    sortEventsNewestFirst,
    weightToEvent,
} from "@/features/dashboard/utils/timelineMappers.ts";

export function useTimelineEvents(): TimeLineEvent[] {
    const feedings = useFeedingStore((state) => state.feedings);
    const diapers = useDiaperStore((state) => state.diapers);
    const sleeps = useSleepStore((state) => state.sleeps);
    const weights = useWeightStore((state) => state.weights);

    return useMemo(
        () => sortEventsNewestFirst([
            ...feedings.map(feedingToEvent),
            ...diapers.map(diaperToEvent),
            ...sleeps.map(sleepToEvent),
            ...weights.map(weightToEvent),
        ]),
        [feedings, diapers, sleeps, weights],
    );
}
