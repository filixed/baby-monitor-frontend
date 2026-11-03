import type { ReactNode } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface SummaryCardProps {
    title: string;
    value: string;
    icon: ReactNode;
}

export function SummaryCard({
                                title,
                                value,
                                icon,
                            }: SummaryCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>

                <div className="text-muted-foreground">
                    {icon}
                </div>
            </CardHeader>

            <CardContent>
                <p className="text-3xl font-bold gap-2">
                    {value}
                </p>
            </CardContent>
        </Card>
    );
}