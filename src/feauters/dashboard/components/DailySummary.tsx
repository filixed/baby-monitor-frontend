import {Milk, Droplets, Moon, Scale} from "lucide-react";
import {SummaryCard} from "./SummaryCard";
import type {DashboardSummary} from "@/feauters/dashboard/types.ts";

interface DailySummaryProps {
    summary: DashboardSummary;
}

export function DailySummary({summary}: DailySummaryProps) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryCard
                title="Feedings"
                value={summary.feedingCount.toString()}
                icon={<Milk/>}
            />

            <SummaryCard
                title="Diapers"
                value={summary.diaperCount.toString()}
                icon={<Droplets/>}
            />

            <SummaryCard
                title="Sleep"
                value={`${Math.floor(summary.sleepDurationMinutes / 60)}h`}
                icon={<Moon/>}
            />

            <SummaryCard
                title="Weight"
                value={summary.weightKg.toString()}
                icon={<Scale/>}
            />
        </div>
    );
}