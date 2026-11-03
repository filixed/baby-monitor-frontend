import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import type {Weight} from "@/features/weight/types.ts";
import {WeightForm} from "@/features/weight/components/WeightForm.tsx";

interface AddWeightDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (weight: Weight) => void;
}

export function AddWeightDialog({
                                    open,
                                    onOpenChange,
                                    onSubmit,
                                }: AddWeightDialogProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add Weight
                    </DialogTitle>
                </DialogHeader>

                <WeightForm onSubmitWeight={onSubmit}/>
            </DialogContent>
        </Dialog>
    );
}
