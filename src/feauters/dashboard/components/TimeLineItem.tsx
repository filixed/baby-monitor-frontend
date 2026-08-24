import {
    Droplets,
    Milk,
    Moon,
    Weight,
} from "lucide-react";

import type { TimeLineEvent } from "../types";

interface TimelineItemProps {
    event: TimeLineEvent;
}

export function TimelineItem({
                                 event,
                             }: TimelineItemProps) {
    const icon = {
        feeding: <Milk className="h-5 w-5" />,
        diaper: <Droplets className="h-5 w-5" />,
        sleep: <Moon className="h-5 w-5" />,
        weight: <Weight className="h-5 w-5" />,
    }[event.type];

    return (
        <div className="flex gap-4">
            <div className="flex w-14 shrink-0 justify-end pt-1 text-sm text-muted-foreground">
                {event.timestamp}
            </div>

            <div className="relative flex">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-background">
                    {icon}
                </div>
            </div>

            <div className="flex-1 pb-6">
                <p className="font-medium">
                    {event.title}
                </p>

                <p className="text-sm text-muted-foreground">
                    {event.description}
                </p>
            </div>
        </div>
    );
}