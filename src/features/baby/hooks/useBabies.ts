import {useQuery} from "@tanstack/react-query";
import {getBabies} from "@/api/babies.ts";

export function useBabies() {
    return useQuery({
        queryKey: ["babies"],
        queryFn: getBabies,
    });
}
