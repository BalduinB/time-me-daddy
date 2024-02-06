"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { CreateStopWatch } from "@/schemas/stop-watch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function NoWatchesFound() {
    const form = useForm<CreateStopWatch>({
        resolver: zodResolver(CreateStopWatch),
    });
    return (
        <div className="hidden first:block">
            <Card className="mx-auto max-w-lg">
                <CardHeader>
                    <CardTitle>Erstelle deine erste Stopuhr.</CardTitle>
                    <CardDescription>Du kannst Stopuhren pausieren, Notizen hinzufügen.</CardDescription>
                </CardHeader>
                <Form {...form}>
                    <CardContent></CardContent>
                    <CardFooter></CardFooter>
                </Form>
            </Card>
            {/* <Button
                onClick={() => {
                    toast.info("Standort mit sehr langer Warteliste", {
                        description:
                            "Der Standort Aggua hat aktuell lange Wartezeiten. Wir empfehlen zusätzlich unseren Standort Lohmer zu wählen.",
                    });
                }}
                className="mx-auto"
            >
                toast
            </Button> */}
        </div>
    );
}
