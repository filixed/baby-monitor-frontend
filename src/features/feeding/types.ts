export type FeedingType = "breast" | "bottle";

export type BreastSide = "left" | "right";

export interface Feeding {
    id: string;
    type: FeedingType;
    amountMl?: number;
    durationMinutes?: number;
    side?: BreastSide;
    timestamp: string;
}

export type BottleFeeding = {
    id: string;
    type: "bottle";
    amountMl: number;
    timestamp: string;
};

export type BreastFeeding = {
    id: string;
    type: "breast";
    side: BreastSide;
    durationMinutes: number;
    timestamp: string;
};

export type Feeding2 = BottleFeeding | BreastFeeding;