import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createBaby} from "@/api/babies.ts";

export function useCreateBaby() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createBaby,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["babies"]}),
    });
}
