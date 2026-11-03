import {Link} from "react-router-dom";
import {ApiError} from "@/api/client.ts";
import {formatAge} from "@/features/baby/utils/formatAge.ts";
import {useDashboard} from "@/features/dashboard/hooks/useDashboard.ts";
import {useCurrentBabyId} from "@/features/dashboard/hooks/useCurrentBabyId.ts";

export function BabyHeader() {
    const babyId = useCurrentBabyId();
    const {data, isPending, isError, error, refetch} = useDashboard(babyId);

    if (isPending) {
        return <p className="text-muted-foreground">Loading baby...</p>;
    }

    if (isError) {
        const notFound = error instanceof ApiError && error.status === 404;
        return (
            <div className="flex flex-col items-start gap-2">
                <p className={notFound ? "text-lg font-semibold" : "text-destructive"}>
                    {notFound ? "Baby not found." : "Couldn't load the baby."}
                </p>
                {!notFound && (
                    <button type="button" onClick={() => refetch()} className="text-sm underline">
                        Try again
                    </button>
                )}
                <Link to="/babies" className="text-sm underline">
                    Back to all babies
                </Link>
            </div>
        );
    }

    const {baby} = data;

    return (
        <div className="flex items-start justify-between gap-4">
            <div>
                <h2 className="text-2xl font-semibold">{baby.name}</h2>
                <p className="text-sm text-muted-foreground">
                    {formatAge(baby.dateOfBirth)}
                </p>
            </div>
            <Link to="/babies" className="text-sm underline">
                Switch baby
            </Link>
        </div>
    );
}
