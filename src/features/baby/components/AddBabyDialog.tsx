import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {BabyForm, type BabyFormData} from "@/features/baby/components/BabyForm.tsx";

interface AddBabyDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (baby: BabyFormData) => void;
    submitting?: boolean;
    error?: string;
}

export function AddBabyDialog({
                                  open,
                                  onOpenChange,
                                  onSubmit,
                                  submitting,
                                  error,
                              }: AddBabyDialogProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add Baby
                    </DialogTitle>
                </DialogHeader>

                <BabyForm onSubmitBaby={onSubmit} submitting={submitting} error={error}/>
            </DialogContent>
        </Dialog>
    );
}
