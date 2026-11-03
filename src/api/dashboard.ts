import {request} from "@/api/client.ts";
import type {DashboardResponse} from "@/api/types.ts";
import type {Baby} from "@/features/baby/types.ts";
import type {DashboardSummary} from "@/features/dashboard/types.ts";

export interface Dashboard {
  baby: Baby;
  summary: DashboardSummary;
}

export async function getDashboard(babyId: string): Promise<Dashboard> {
  const dto = await request<DashboardResponse>(`/babies/${encodeURIComponent(babyId)}/dashboard`);
  return {
    baby: {id: dto.id ?? babyId, name: dto.name ?? "", dateOfBirth: dto.dateOfBirth},
    // Assumes `sleep` is total minutes (not in the spec; confirm with the backend).
    summary: {
      feedingCount: dto.feedings,
      diaperCount: dto.diapers,
      sleepDurationMinutes: dto.sleep,
      weightKg: dto.weight,
    },
  };
}
