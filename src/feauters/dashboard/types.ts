export interface DashboardSummary {
    feedingCount: number;
    diaperCount: number;
    sleepDurationMinutes: number;
    weightKg: number;
}

export type TimeLineEventType = "feeding" | "diaper" | "sleep" | "weight";

export interface TimeLineEvent {
    id: string;
    type: TimeLineEventType;
    timestamp: string;
    title: string;
    description: string;
}