import type {Weight} from "@/feauters/weight/types.ts";
import {z} from "zod";
import {weightFormSchema} from "@/feauters/weight/schema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {getLocalDateTimeDefaults, toUtcIsoTimestamp} from "@/lib/dateTime.ts";

interface WeightFormProps {
    onSubmitWeight: (weight: Weight) => void;
}

type WeightFormData = z.infer<typeof weightFormSchema>;

export function WeightForm({onSubmitWeight}: WeightFormProps) {
    const now = getLocalDateTimeDefaults();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<WeightFormData>({
        resolver: zodResolver(weightFormSchema),
        defaultValues: {
            date: now.date,
        }
    });

    const onSubmit = (data: WeightFormData) => {
        onSubmitWeight({
            id: crypto.randomUUID(),
            weightKg: data.weightKg,
            // The form only asks for a date; the time of day is when it was saved.
            timestamp: toUtcIsoTimestamp(data.date, getLocalDateTimeDefaults().time),
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Label htmlFor="weightKg">
                    Weight (kg)
                </Label>

                <Input
                    id="weightKg"
                    type="number"
                    step="0.01"
                    min="0"
                    {...register("weightKg", {valueAsNumber: true})}
                />
                {errors.weightKg && (
                    <p className="text-sm text-destructive">
                        {errors.weightKg.message}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="date">
                    Date
                </Label>

                <Input id="date" type="date" {...register("date")}/>
                {errors.date && (
                    <p className="text-sm text-destructive">
                        {errors.date.message}
                    </p>
                )}
            </div>

            <Button type="submit">
                Save weight
            </Button>
        </form>
    )
}
