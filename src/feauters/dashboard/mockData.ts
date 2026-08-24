import type {DashboardSummary, TimeLineEvent} from "@/feauters/dashboard/types.ts";

export const dashboardData: DashboardSummary = {
    feedingCount: 2,
    diaperCount: 3,
    sleepDurationMinutes: 600,
    weightKg: 4.73,
}

export const timelineEvents: TimeLineEvent[] = [
    {
        id: "1",
        type: "feeding",
        timestamp: "09:42",
        title: "Feeding",
        description: "Breast · Left · 18 min",
    },
    {
        id: "2",
        type: "diaper",
        timestamp: "08:55",
        title: "Diaper",
        description: "Wet",
    },
    {
        id: "3",
        type: "sleep",
        timestamp: "07:30",
        title: "Sleep",
        description: "1h 20m",
    },
    {
        id: "4",
        type: "feeding",
        timestamp: "06:05",
        title: "Feeding",
        description: "Bottle · 90 ml",
    },
];