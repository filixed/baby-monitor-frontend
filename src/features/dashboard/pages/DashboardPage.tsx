import {DailySummary} from "@/features/dashboard/components/DailySummary.tsx";
import {BabyHeader} from "@/features/dashboard/components/BabyHeader.tsx";
import {QuickActions} from "@/features/dashboard/components/QuickActions.tsx";
import {TodayTimeline} from "@/features/dashboard/components/TodayTimeline.tsx";
import {useCurrentBabyId} from "@/features/dashboard/hooks/useCurrentBabyId.ts";
import {useDashboard} from "@/features/dashboard/hooks/useDashboard.ts";

export function DashboardPage() {
    const babyId = useCurrentBabyId();
    // Same query as BabyHeader, so React Query shares one request and one cache entry.
    const {data} = useDashboard(babyId);

    return (
        <div className="flex flex-col gap-6">
            <BabyHeader />
            {data && <DailySummary summary={data.summary} />}
            <QuickActions />

            <TodayTimeline />
        </div>
    );
}
