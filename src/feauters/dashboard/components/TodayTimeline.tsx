import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { timelineEvents } from "../mockData";
import { TimelineItem } from "./TimeLineItem";

export function TodayTimeline() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Today's activity</CardTitle>
            </CardHeader>

            <CardContent>
                <div>
                    {timelineEvents.map((event) => (
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