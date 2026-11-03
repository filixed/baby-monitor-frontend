import {useParams} from "react-router-dom";

// The URL is the source of truth for the selected baby (route `/babies/:babyId`).
export function useCurrentBabyId(): string {
    const {babyId} = useParams<{ babyId: string }>();
    if (!babyId) throw new Error("useCurrentBabyId must be used inside the /babies/:babyId route");
    return babyId;
}
