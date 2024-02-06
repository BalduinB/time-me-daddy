"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateSubject } from "@/schemas/subject";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function NoSubjects() {
    const { mutate } = api.category.create.useMutation();
    const form = useForm<CreateSubject>({
        resolver: zodResolver(CreateSubject),
    });
    return (
        <Card className="m-auto hidden max-w-3xl first:block">
            <CardHeader>
                <CardTitle>Erstelle das erste Thema </CardTitle>
                <CardDescription>
                    Erstelle ein neues Thema, zu welchem du eine Zeiterfassung starten möchtest.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((d) => mutate(d))}>
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder={"Wähle einen Namen"} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
