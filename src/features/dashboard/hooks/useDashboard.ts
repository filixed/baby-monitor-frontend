import {useQuery} from "@tanstack/react-query";
import {getDashboard} from "@/api/dashboard.ts";
import {ApiError} from "@/api/client.ts";

export function useDashboard(babyId: string) {
    return useQuery({
        queryKey: ["dashboard", babyId],
        queryFn: () => getDashboard(babyId),
        // A 404 won't fix itself, so don't retry it.
        retry: (failureCount, error) =>
            !(error instanceof ApiError && error.status === 404) && failureCount < 1,
    });
}
