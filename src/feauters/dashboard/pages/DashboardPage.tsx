import {DailySummary} from "@/feauters/dashboard/components/DailySummary.tsx";
import {BabyHeader} from "@/feauters/dashboard/components/BabyHeader.tsx";
import {QuickActions} from "@/feauters/dashboard/components/QuickActions.tsx";
import {dashboardData} from "@/feauters/dashboard/mockData.ts";
import {TodayTimeline} from "@/feauters/dashboard/components/TodayTimeline.tsx";

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