// DTOs mirroring the backend contract (OpenAPI 3.0.4, http://localhost:5000/swagger/v1/swagger.json).
// Hand-written: when the contract changes, update this file. Only the babies endpoints are modelled;
// the /todos and /users endpoints in the spec are not used by this app.

// Wire-format notes:
// - `date-time` fields are UTC ISO strings, `date` fields are `YYYY-MM-DD`.
// - Nullable fields in the spec are `T | null`.
// - Enums are sent as strings; "None" is the unset value.

export type FeedingTypeDto = "None" | "Breast" | "Bottle";
export type BreastSideDto = "None" | "Left" | "Right";
export type DiaperTypeDto = "None" | "Wet" | "Dirty" | "Both";

export interface BabyResponse {
  id: string;
  name: string | null;
  dateOfBirth: string;
}

export interface CreateBabyRequest {
  userId: string | null;
  name: string | null;
  dateOfBirth: string;
}

export interface CreatedResponse {
  id: string;
}

export interface FeedingData {
  feedingType: FeedingTypeDto;
  amountMl: number | null;
  durationMinutes: number | null;
  side: BreastSideDto;
  timestamp: string;
}

export interface DiaperData {
  diaperType: DiaperTypeDto;
  description: string | null;
  timestamp: string;
}

export interface SleepData {
  description: string | null;
  startTimestamp: string;
  endTimestamp: string;
}

export interface WeightData {
  weightKg: number;
  timestamp: string;
}

export interface DashboardResponse {
  feedings: number;
  diapers: number;
  sleep: number;
  weight: number;
}

// `type` is not in the OpenAPI schema but the API sends it (observed in responses), so it is used
// here as the discriminator of the union below.
export interface TimelineEventBase {
  id: string;
  timestamp: string;
}

export interface FeedingEvent extends TimelineEventBase {
  type: "feeding";
  data: FeedingData;
}

export interface DiaperEvent extends TimelineEventBase {
  type: "diaper";
  data: DiaperData;
}

export interface SleepEvent extends TimelineEventBase {
  type: "sleep";
  data: SleepData;
}

export interface WeightEvent extends TimelineEventBase {
  type: "weight";
  data: WeightData;
}

export type TimelineEventDto = FeedingEvent | DiaperEvent | SleepEvent | WeightEvent;

export interface Pagination {
  limit: number;
  nextCursor: string | null;
  hasMore: boolean;
}

export interface TimelinePage {
  date: string;
  items: TimelineEventDto[] | null;
  pagination: Pagination;
}

export interface TimelineQuery {
  date: string; // required by the API for now
  limit?: number;
  cursor?: string;
}

// application/problem+json bodies (400 and 404 responses)
export interface ProblemDetails {
  type?: string | null;
  title?: string | null;
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
}

export interface ValidationProblemDetails extends ProblemDetails {
  errors?: Record<string, string[]> | null;
}
