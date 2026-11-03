import {DailySummary} from "@/features/dashboard/components/DailySummary.tsx";
import {BabyHeader} from "@/features/dashboard/components/BabyHeader.tsx";
import {QuickActions} from "@/features/dashboard/components/QuickActions.tsx";
import {dashboardData} from "@/features/dashboard/mockData.ts";
import {TodayTimeline} from "@/features/dashboard/components/TodayTimeline.tsx";

export function DashboardPage() {

    return (
        <div className="flex flex-col gap-6">
            <BabyHeader />
            <DailySummary summary={dashboardData} />
            <QuickActions />

            <TodayTimeline />
        </div>
    );
}