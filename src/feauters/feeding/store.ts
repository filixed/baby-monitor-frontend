import { create } from "zustand";
import type {Feeding} from "@/feauters/feeding/types.ts";

interface FeedingState {
    feedings: Feeding[];

    addFeeding: (feeding: Feeding) => void;
}

export const useFeedingStore = create<FeedingState>(
    (set) => ({
        feedings: [],

        addFeeding: (feeding) =>
            set((state) => ({
                feedings: [
                    feeding,
                    ...state.feedings,
                ],
            })),
    })
);