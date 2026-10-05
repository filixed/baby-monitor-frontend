import {Milk, Droplets, Moon, Scale} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {AddFeedingDialog} from "@/feauters/feeding/components/AddFeedingDialog.tsx";
import type {Feeding} from "@/feauters/feeding/types.ts";
import {useFeedingStore} from "@/feauters/feeding/store.ts";
import {useDiaperStore} from "@/feauters/diaper/store.ts";
import type {Diaper} from "@/feauters/diaper/types.ts";
import {AddDiaperDialog} from "@/feauters/diaper/components/AddDiaperDialog.tsx";
import {useSleepStore} from "@/feauters/sleep/store.ts";
import type {Sleep} from "@/feauters/sleep/types.ts";
import {AddSleepDialog} from "@/feauters/sleep/components/AddSleepDialog.tsx";
import {useWeightStore} from "@/feauters/weight/store.ts";
import type {Weight} from "@/feauters/weight/types.ts";
import {AddWeightDialog} from "@/feauters/weight/components/AddWeightDialog.tsx";

export function QuickActions() {

    const [feedingDialogOpen, setFeedingDialogOpen] = useState(false);

    const addFeeding = useFeedingStore(
        (state) => state.addFeeding
    );

    function handleFeedingSubmit(feeding: Feeding) {
        addFeeding(feeding);
        setFeedingDialogOpen(false);
    }

    const [diaperDialogOpen, setDiaperDialogOpen] = useState(false);

    const addDiaper = useDiaperStore(
        (state) => state.addDiaper
    );

    function handleDiaperSubmit(diaper: Diaper) {
        addDiaper(diaper);
        setDiaperDialogOpen(false);
    }

    const [sleepDialogOpen, setSleepDialogOpen] = useState(false);

    const addSleep = useSleepStore(
        (state) => state.addSleep
    );

    function handleSleepSubmit(sleep: Sleep) {
        addSleep(sleep);
        setSleepDialogOpen(false);
    }

    const [weightDialogOpen, setWeightDialogOpen] = useState(false);

    const addWeight = useWeightStore(
        (state) => state.addWeight
    );

    function handleWeightSubmit(weight: Weight) {
        addWeight(weight);
        setWeightDialogOpen(false);
    }

    return (
        <>
            <section className="space-y-3">
                <h3 className="text-lg font-semibold">
                    Quick actions
                </h3>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <Button
                        variant="outline"
                        className="h-20 flex-col gap-2"
                        onClick={() => setFeedingDialogOpen(true)}>
                        <Milk/>
                        Feeding
                    </Button>

                    <Button variant="outline" className="h-20 flex-col gap-2"
                        onClick={() => setDiaperDialogOpen(true)}>
                        <Droplets/>
                        Diaper
                    </Button>

                    <Button variant="outline" className="h-20 flex-col gap-2"
                        onClick={() => setSleepDialogOpen(true)}>
                        <Moon/>
                        Sleep
                    </Button>

                    <Button variant="outline" className="h-20 flex-col gap-2"
                        onClick={() => setWeightDialogOpen(true)}>
                        <Scale/>
                        Weight
                    </Button>
                </div>
            </section>

            <AddFeedingDialog
                open={feedingDialogOpen}
                onOpenChange={setFeedingDialogOpen}
                onSubmit={handleFeedingSubmit}
            />

            <AddDiaperDialog open={diaperDialogOpen} onOpenChange={setDiaperDialogOpen} onSubmit={handleDiaperSubmit}/>

            <AddSleepDialog open={sleepDialogOpen} onOpenChange={setSleepDialogOpen} onSubmit={handleSleepSubmit}/>

            <AddWeightDialog open={weightDialogOpen} onOpenChange={setWeightDialogOpen} onSubmit={handleWeightSubmit}/>
        </>
    );
}