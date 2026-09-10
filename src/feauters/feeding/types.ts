export type FeedingType = "breast" | "bottle";

export type BrestSide = "left" | "right";

export interface Feeding {
    id: string;
    type: FeedingType;
    amountMl?: number;
    durationMinutes?: number;
    side?: BrestSide;
    timestamp: string;
}