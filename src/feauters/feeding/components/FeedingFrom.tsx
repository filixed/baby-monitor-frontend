import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type {Feeding} from "@/feauters/feeding/types.ts";

interface FeedingFormProps {
    onSubmit: (feeding: Feeding) => void;
}

export function FeedingForm({ onSubmit }: FeedingFormProps) {
    const today = new Date();

    const [amount, setAmount] = useState("");
    const [date, setDate] = useState(
        today.toISOString().split("T")[0]
    );
    const [time, setTime] = useState(
        today.toTimeString().slice(0, 5)
    );

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const feeding: Feeding = {
            id: crypto.randomUUID(),
            type: "bottle",
            amountMl: Number(amount),
            timestamp: `${date}T${time}:00`,
        };

        onSubmit(feeding);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
        >
            <div className="flex flex-col gap-2">
                <Label htmlFor="amount">
                    Amount (ml)
                </Label>

                <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(event) =>
                        setAmount(event.target.value)
                    }
                    placeholder="90"
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="date">
                    Date
                </Label>

                <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(event) =>
                        setDate(event.target.value)
                    }
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="time">
                    Time
                </Label>

                <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(event) =>
                        setTime(event.target.value)
                    }
                />
            </div>

            <Button type="submit">
                Save feeding
            </Button>
        </form>
    );
}