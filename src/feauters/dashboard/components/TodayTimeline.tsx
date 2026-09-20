import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { TimelineItem } from "./TimeLineItem";
import {useFeedingStore} from "@/feauters/feeding/store.ts";
import type {TimeLineEvent} from "@/feauters/dashboard/types.ts";
import {useDiaperStore} from "@/feauters/diaper/store.ts";


export function TodayTimeline() {

    const feedings = useFeedingStore((state) => state.feedings);

    const feedingEvents: TimeLineEvent[] = feedings.map((feeding) => {
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
    });

    const diapers = useDiaperStore((state) => state.diapers)

    const diapersEvents: TimeLineEvent[] = diapers.map((diaper) => {
        return {
            id: diaper.id,
            type: "diaper",
            timestamp: diaper.timestamp,
            title: "Diaper change",
            description: diaper.description ?? "",
        };
    });

    const allEvents = [
        ...feedingEvents,
        ...diapersEvents];

    const sortedEvents = [...allEvents].sort(
        (a, b) =>
            new Date(b.timestamp).getTime() -
            new Date(a.timestamp).getTime()
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Today's activity</CardTitle>
            </CardHeader>

            <CardContent>
                <div>

                    {sortedEvents.map((event) => (
                        <TimelineItem
                            key={event.id}
                            event={event}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}