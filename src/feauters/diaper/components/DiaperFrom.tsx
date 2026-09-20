import type {Diaper} from '@/feauters/diaper/types.ts';
import {z} from "zod";
import {diaperFormSchema} from "@/feauters/diaper/schema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

interface DiaperFromProps {
    onSubmitDiaper: (diaper: Diaper) => void;
}

type DiaperFormData = z.infer<typeof diaperFormSchema>;

export function DiaperForm({ onSubmitDiaper, } : DiaperFromProps){
    const today = new Date();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<DiaperFormData>({
        resolver: zodResolver(diaperFormSchema),
        defaultValues: {
            type: "wet",
            description: undefined,
            date: today.toISOString().split("T")[0],
            time: today.toISOString().slice(0, 5),
        }
    });

    const onSubmit = (data: DiaperFormData) => {
        onSubmitDiaper({
            id: crypto.randomUUID(),
            type: data.type,
            description: data.description,
            timestamp: `${data.date}T${data.time}:00`,
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Label htmlFor="type">
                    Diaper type
                </Label>

                <select
                    id="type"
                    {...register("type")}
                    className="border rounded-md p-2"
                >
                    <option value="wet">
                        Wet
                    </option>

                    <option value="dirty">
                        Dirty
                    </option>

                    <option value="both">
                        Both
                    </option>
                </select>

                {errors.type && (
                    <p className="text-sm text-destructive">
                        {errors.type.message}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="description">
                    Description (optional)
                </Label>

                <Input
                    id="description"
                    type="text"
                    required={false}
                    {...register("description", { })}
                />
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
                Save diaper
            </Button>
        </form>
    )
}