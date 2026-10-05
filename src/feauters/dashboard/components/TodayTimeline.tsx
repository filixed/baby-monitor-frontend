import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { TimelineItem } from "./TimeLineItem";
import {useTimelineEvents} from "@/feauters/dashboard/hooks/useTimelineEvents.ts";


export function TodayTimeline() {

    const events = useTimelineEvents();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Today's activity</CardTitle>
            </CardHeader>

            <CardContent>
                <div>

                    {events.map((event) => (
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
