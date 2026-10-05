import type {Sleep} from "@/feauters/sleep/types.ts";
import {z} from "zod";
import {sleepFormSchema} from "@/feauters/sleep/schema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {getLocalDateTimeDefaults, toUtcIsoTimestamp} from "@/lib/dateTime.ts";

interface SleepFormProps {
    onSubmitSleep: (sleep: Sleep) => void;
}

type SleepFormData = z.infer<typeof sleepFormSchema>;

export function SleepForm({onSubmitSleep}: SleepFormProps) {
    const now = getLocalDateTimeDefaults();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<SleepFormData>({
        resolver: zodResolver(sleepFormSchema),
        defaultValues: {
            description: undefined,
            startDate: now.date,
            startTime: now.time,
            endDate: now.date,
            endTime: now.time,
        }
    });

    const onSubmit = (data: SleepFormData) => {
        onSubmitSleep({
            id: crypto.randomUUID(),
            description: data.description,
            startTimestamp: toUtcIsoTimestamp(data.startDate, data.startTime),
            endTimestamp: toUtcIsoTimestamp(data.endDate, data.endTime),
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Label htmlFor="description">
                    Description (optional)
                </Label>

                <Input
                    id="description"
                    type="text"
                    {...register("description")}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="startDate">
                        Start date
                    </Label>

                    <Input id="startDate" type="date" {...register("startDate")}/>
                    {errors.startDate && (
                        <p className="text-sm text-destructive">
                            {errors.startDate.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="startTime">
                        Start time
                    </Label>

                    <Input id="startTime" type="time" {...register("startTime")}/>
                    {errors.startTime && (
                        <p className="text-sm text-destructive">
                            {errors.startTime.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="endDate">
                        End date
                    </Label>

                    <Input id="endDate" type="date" {...register("endDate")}/>
                    {errors.endDate && (
                        <p className="text-sm text-destructive">
                            {errors.endDate.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="endTime">
                        End time
                    </Label>

                    <Input id="endTime" type="time" {...register("endTime")}/>
                    {errors.endTime && (
                        <p className="text-sm text-destructive">
                            {errors.endTime.message}
                        </p>
                    )}
                </div>
            </div>

            <Button type="submit">
                Save sleep
            </Button>
        </form>
    )
}
