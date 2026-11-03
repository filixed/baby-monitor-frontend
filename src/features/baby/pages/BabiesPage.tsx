import {useState} from "react";
import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useBabies} from "@/features/baby/hooks/useBabies.ts";
import {useCreateBaby} from "@/features/baby/hooks/useCreateBaby.ts";
import {BabyTile} from "@/features/baby/components/BabyTile.tsx";
import {AddBabyDialog} from "@/features/baby/components/AddBabyDialog.tsx";
import type {BabyFormData} from "@/features/baby/components/BabyForm.tsx";

export function BabiesPage() {
    const [dialogOpen, setDialogOpen] = useState(false);

    const {data: babies, isPending, isError, refetch} = useBabies();
    const createBaby = useCreateBaby();

    function handleBabySubmit(baby: BabyFormData) {
        createBaby.mutate(baby, {onSuccess: () => setDialogOpen(false)});
    }

    function handleDialogOpenChange(open: boolean) {
        setDialogOpen(open);
        if (!open) createBaby.reset();
    }

    if (isPending) {
        return <p className="text-muted-foreground">Loading babies...</p>;
    }

    if (isError) {
        return (
            <div className="flex flex-col items-start gap-3">
                <p className="text-destructive">Couldn't load babies.</p>
                <Button variant="outline" onClick={() => refetch()}>
                    Try again
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">Your babies</h2>

            {babies.length === 0 && (
                <p className="text-muted-foreground">No babies yet. Add your first one.</p>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {babies.map((baby) => (
                    <BabyTile key={baby.id} baby={baby}/>
                ))}

                <button
                    type="button"
                    onClick={() => setDialogOpen(true)}
                    className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                >
                    <Plus/>
                    Add baby
                </button>
            </div>

            <AddBabyDialog
                open={dialogOpen}
                onOpenChange={handleDialogOpenChange}
                onSubmit={handleBabySubmit}
                submitting={createBaby.isPending}
                error={createBaby.isError ? "Couldn't save the baby. Please try again." : undefined}
            />
        </div>
    );
}
