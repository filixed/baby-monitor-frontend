import {DailySummary} from "@/feauters/dashboard/components/DailySummary.tsx";
import {BabyHeader} from "@/feauters/dashboard/components/BabyHeader.tsx";
import {QuickActions} from "@/feauters/dashboard/components/QuickActions.tsx";
import {dashboardData} from "@/feauters/dashboard/mockData.ts";
import {TodayTimeline} from "@/feauters/dashboard/components/TodayTimeline.tsx";
import {useFeedingStore} from "@/feauters/feeding/store.ts";

export function DashboardPage() {
    const feedings = useFeedingStore(
        (state) => state.feedings
    );

    return (
        <div className="flex flex-col gap-6">
            <BabyHeader />
            <DailySummary summary={dashboardData} />
            <QuickActions />

            <TodayTimeline feedings={feedings} />
        </div>
    );
}