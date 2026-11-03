import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {babyFormSchema} from "@/features/baby/schema.ts";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {getLocalDateTimeDefaults} from "@/lib/dateTime.ts";

export type BabyFormData = z.infer<typeof babyFormSchema>;

interface BabyFormProps {
    onSubmitBaby: (baby: BabyFormData) => void;
    submitting?: boolean;
    error?: string;
}

export function BabyForm({onSubmitBaby, submitting = false, error}: BabyFormProps) {
    const now = getLocalDateTimeDefaults();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<BabyFormData>({
        resolver: zodResolver(babyFormSchema),
        defaultValues: {
            dateOfBirth: now.date,
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmitBaby)}
              className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">
                    Name
                </Label>

                <Input id="name" type="text" {...register("name")}/>
                {errors.name && (
                    <p className="text-sm text-destructive">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="dateOfBirth">
                    Date of birth
                </Label>

                <Input id="dateOfBirth" type="date" max={now.date} {...register("dateOfBirth")}/>
                {errors.dateOfBirth && (
                    <p className="text-sm text-destructive">
                        {errors.dateOfBirth.message}
                    </p>
                )}
            </div>

            {error && (
                <p className="text-sm text-destructive">
                    {error}
                </p>
            )}

            <Button type="submit" disabled={submitting}>
                {submitting ? "Saving..." : "Save baby"}
            </Button>
        </form>
    )
}
