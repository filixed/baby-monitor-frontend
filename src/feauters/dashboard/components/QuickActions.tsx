import { Milk, Droplets, Moon, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuickActions() {
    return (
        <section className="space-y-3">
            <h3 className="text-lg font-semibold">
                Quick actions
            </h3>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Button variant="outline" className="h-20 flex-col gap-2">
                    <Milk />
                    Feeding
                </Button>

                <Button variant="outline" className="h-20 flex-col gap-2">
                    <Droplets />
                    Diaper
                </Button>

                <Button variant="outline" className="h-20 flex-col gap-2">
                    <Moon />
                    Sleep
                </Button>

                <Button variant="outline" className="h-20 flex-col gap-2">
                    <Scale />
                    Weight
                </Button>
            </div>
        </section>
    );
}