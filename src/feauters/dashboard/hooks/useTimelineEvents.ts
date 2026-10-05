import {useMemo} from "react";
import type {TimeLineEvent} from "@/feauters/dashboard/types.ts";
import {useFeedingStore} from "@/feauters/feeding/store.ts";
import {useDiaperStore} from "@/feauters/diaper/store.ts";
import {useSleepStore} from "@/feauters/sleep/store.ts";
import {useWeightStore} from "@/feauters/weight/store.ts";
import {
    diaperToEvent,
    feedingToEvent,
    sleepToEvent,
    sortEventsNewestFirst,
    weightToEvent,
} from "@/feauters/dashboard/utils/timelineMappers.ts";

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
