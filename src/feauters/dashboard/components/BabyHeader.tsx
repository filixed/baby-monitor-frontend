import {useBabyStore} from "@/feauters/baby/store.ts";
import {formatAge} from "@/feauters/baby/utils/formatAge.ts";

export function BabyHeader() {
    const baby = useBabyStore((state) => state.babies[0]);

    if (!baby) return null;

    return (
        <div>
            <h2 className="text-2xl font-semibold">{baby.name}</h2>
            <p className="text-sm text-muted-foreground">
                {formatAge(baby.dateOfBirth)}
            </p>
        </div>
    );
}
