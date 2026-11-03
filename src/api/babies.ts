import {request} from "@/api/client.ts";
import type {BabyResponse, CreatedResponse, CreateBabyRequest} from "@/api/types.ts";
import type {Baby} from "@/features/baby/types.ts";

const USER_ID_KEY = "parents-app:user-id";

// No auth yet, so the API's required `userId` is a random GUID generated once per browser.
function getUserId(): string {
  try {
    const stored = localStorage.getItem(USER_ID_KEY);
    if (stored) return stored;
    const created = crypto.randomUUID();
    localStorage.setItem(USER_ID_KEY, created);
    return created;
  } catch {
    return crypto.randomUUID();
  }
}

function toBaby(dto: BabyResponse): Baby {
  return {id: dto.id, name: dto.name ?? "", dateOfBirth: dto.dateOfBirth};
}

export async function getBabies(): Promise<Baby[]> {
  const babies = await request<BabyResponse[]>("/babies");
  return babies.map(toBaby);
}

export function createBaby(data: Pick<CreateBabyRequest, "name" | "dateOfBirth">): Promise<CreatedResponse> {
  const body: CreateBabyRequest = {userId: getUserId(), ...data};
  return request<CreatedResponse>("/babies", {method: "POST", body});
}
