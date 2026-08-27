import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {FeedingForm} from "@/feauters/feeding/components/FeedingFrom.tsx";
import type {Feeding} from "@/feauters/feeding/types.ts";

interface AddFeedingDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (feeding: Feeding) => void;
}

export function AddFeedingDialog({
                                     open,
                                     onOpenChange,
                                     onSubmit,
                                 }: AddFeedingDialogProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add feeding
                    </DialogTitle>
                </DialogHeader>

                <FeedingForm onSubmit={onSubmit} />
            </DialogContent>
        </Dialog>
    );
}