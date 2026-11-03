import {Link} from "react-router-dom";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import type {Baby} from "@/features/baby/types.ts";
import {formatAge} from "@/features/baby/utils/formatAge.ts";

interface BabyTileProps {
    baby: Baby;
}

export function BabyTile({baby}: BabyTileProps) {
    return (
        <Link to={`/babies/${baby.id}`} className="block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2">
            <Card className="h-full transition-shadow hover:ring-foreground/30">
                <CardHeader>
                    <CardTitle className="text-lg">{baby.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                    {formatAge(baby.dateOfBirth)}
                </CardContent>
            </Card>
        </Link>
    );
}
