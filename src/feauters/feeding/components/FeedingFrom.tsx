import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type {Feeding} from "@/feauters/feeding/types.ts";
import { useForm } from "react-hook-form";
import { zodResolver} from "@hookform/resolvers/zod";
import { feedingFormSchema} from "@/feauters/feeding/schema.ts";
import {z} from "zod";

interface FeedingFormProps {
    onSubmitFeeding: (feeding: Feeding) => void;
}

type FeedingFormData = z.infer<typeof feedingFormSchema>;

export function FeedingForm({ onSubmitFeeding, }: FeedingFormProps) {
    const today = new Date();
    
    const form = useForm<FeedingFormData>({
        resolver: zodResolver(feedingFormSchema),
        defaultValues: {
            type: "bottle",
            amountMl: undefined,
            date: today.toISOString().split("T")[0],
            time: today.toISOString().slice(0, 5),
        }
    });
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form;

    const onSubmit = (data: FeedingFormData)=> {
        const feeding: Feeding = {
            id: crypto.randomUUID(),
            type: data.type,
            amountMl: data.amountMl,
            timestamp: `${data.date}T${data.time}:00`,
        };

        onSubmitFeeding(feeding);
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
        >
            <div className="flex flex-col gap-2">
                <Label htmlFor="type">
                    Feeding type
                </Label>

                <select
                    id="type"
                    {...register("type")}
                    className="border rounded-md p-2"
                >
                    <option value="bottle">
                        Bottle
                    </option>

                    <option value="breast">
                        Breast
                    </option>
                </select>

                {errors.type && (
                    <p className="text-sm text-destructive">
                        {errors.type.message}
                    </p>
                )}
            </div>
            
            <div className="flex flex-col gap-2">
                <Label htmlFor="amountMl">
                    Amount (ml)
                </Label>

                <Input
                    id="amountMl"
                    type="number"
                    {...register("amountMl", {
                        valueAsNumber: true,
                    })}
                />
                {errors.amountMl && (
                    <p className="text-sm text-destructive">
                        {errors.amountMl.message}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="date">
                    Date
                </Label>

                <Input
                    id="date"
                    type="date"
                    {...register(("date"))
                    }
                />
                {errors.date && (
                    <p className="text-sm text-destructive">
                        {errors.date.message}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="time">
                    Time
                </Label>

                <Input
                    id="time"
                    type="time"
                    {...register("time")}
                />
                {errors.time && (
                    <p className="text-sm text-destructive">
                        {errors.time.message}
                    </p>
                )}
            </div>

            <Button type="submit">
                Save feeding
            </Button>
        </form>
    );
}