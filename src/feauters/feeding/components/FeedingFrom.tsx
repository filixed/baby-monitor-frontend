import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type {Feeding} from "@/feauters/feeding/types.ts";
import { useForm } from "react-hook-form";
import { zodResolver} from "@hookform/resolvers/zod";
import { feedingFormSchema} from "@/feauters/feeding/schema.ts";
import {z} from "zod";
import {getLocalDateTimeDefaults, toUtcIsoTimestamp} from "@/lib/dateTime.ts";

interface FeedingFormProps {
    onSubmitFeeding: (feeding: Feeding) => void;
}

type FeedingFormData = z.infer<typeof feedingFormSchema>;

export function FeedingForm({ onSubmitFeeding, }: FeedingFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<FeedingFormData>({
        resolver: zodResolver(feedingFormSchema),
        defaultValues: {
            type: "bottle",
            amountMl: undefined,
            ...getLocalDateTimeDefaults(),
        }
    });

    const feedingType = watch("type")

    const onSubmit = (data: FeedingFormData)=> {

        if (data.type === "bottle") {
            onSubmitFeeding({
                id: crypto.randomUUID(),
                type: "bottle",
                amountMl: data.amountMl,
                timestamp: toUtcIsoTimestamp(data.date, data.time),
            });

            return;
        }

        onSubmitFeeding({
            id: crypto.randomUUID(),
            type: "breast",
            side: data.side,
            durationMinutes: data.durationMinutes,
            timestamp: toUtcIsoTimestamp(data.date, data.time),
        });
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

            {feedingType === "bottle" && (
                <div className="flex flex-col gap-2">
                    <Label htmlFor="amountMl">
                        Amount (ml)
                    </Label>

                    <Input
                        id="amountMl"
                        type="number"
                        {...register("amountMl", {
                            setValueAs: (value) =>
                                value === "" ? undefined : Number(value)
                        })}
                    />
                    {"amountMl" in errors && errors.amountMl && (
                        <p className="text-sm text-destructive">
                            {errors.amountMl.message}
                        </p>
                    )}
                </div>
            )}

            {feedingType === "breast" && (
                <>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="side">
                            Side
                        </Label>

                        <select
                            id="side"
                            {...register("side")}
                            className="border rounded-md p-2"
                        >
                            <option value="left">
                                Left
                            </option>

                            <option value="right">
                                Right
                            </option>
                        </select>

                        {"side" in errors && errors.side && (
                            <p className="text-sm text-destructive">
                                {errors.side.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="durationMinutes">
                            Duration (minutes)
                        </Label>

                        <Input
                            id="durationMinutes"
                            type="number"
                            {...register("durationMinutes", {
                                valueAsNumber: true,
                            })}
                        />

                        {"durationMinutes" in errors && errors.durationMinutes && (
                            <p className="text-sm text-destructive">
                                {errors.durationMinutes.message}
                            </p>
                        )}
                    </div>
                </>
            )}



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