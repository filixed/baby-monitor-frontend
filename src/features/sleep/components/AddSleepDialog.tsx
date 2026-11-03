import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import type {Sleep} from "@/features/sleep/types.ts";
import {SleepForm} from "@/features/sleep/components/SleepForm.tsx";

interface AddSleepDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (sleep: Sleep) => void;
}

export function AddSleepDialog({
                                   open,
                                   onOpenChange,
                                   onSubmit,
                               }: AddSleepDialogProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add Sleep
                    </DialogTitle>
                </DialogHeader>

                <SleepForm onSubmitSleep={onSubmit}/>
            </DialogContent>
        </Dialog>
    );
}
