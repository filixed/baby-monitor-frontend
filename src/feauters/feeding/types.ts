export type FeedingType = "breast" | "bottle";

export interface Feeding {
    id: string;
    type: FeedingType;
    amountMl?: number;
    durationMinutes?: number;
    timestamp: string;
}