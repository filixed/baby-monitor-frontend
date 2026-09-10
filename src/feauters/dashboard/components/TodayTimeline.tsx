import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { timelineEvents } from "../mockData";
import { TimelineItem } from "./TimeLineItem";
import type {Feeding} from "@/feauters/feeding/types.ts";

interface TodayTimelineProps {
    feedings: Feeding[];
}

export function TodayTimeline({feedings}: TodayTimelineProps) {
    
    const events = [
            ...timelineEvents,
            ...feedings,
    ]
    return (
        <Card>
            <CardHeader>
                <CardTitle>Today's activity</CardTitle>
            </CardHeader>

            <CardContent>
                <div>
                    
                    {events.map((feeding) => (
                        <TimelineItem
                            key={feeding.id}
                            event={{
                                id: feeding.id,
                                type: "feeding",
                                timestamp: new Date(
                                    feeding.timestamp
                                ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                }),
                                title: "Feeding",
                                description: `Bottle · ${feeding.amountMl} ml`,
                            }}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}