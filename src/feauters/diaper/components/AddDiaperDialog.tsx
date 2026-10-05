import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import type {Diaper} from "@/feauters/diaper/types.ts";
import {DiaperForm} from "@/feauters/diaper/components/DiaperForm.tsx";

interface AddDiaperDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (feeding: Diaper) => void;
}

export function AddDiaperDialog({
                                     open,
                                     onOpenChange,
                                     onSubmit,
                                 }: AddDiaperDialogProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add Diaper
                    </DialogTitle>
                </DialogHeader>

                <DiaperForm onSubmitDiaper={onSubmit} />
            </DialogContent>
        </Dialog>
    );
}