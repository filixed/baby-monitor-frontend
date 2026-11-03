export type DiaperType = "wet" | "dirty" | "both";

export interface Diaper {
    id: string;
    type: DiaperType;
    description: string | undefined;
    timestamp: string;
}