"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { DialogDescription } from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";

import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { CreateProjectSchema } from "../schema";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export function CreateProjectDialog() {
    const utils = api.useUtils();
    const router = useRouter();
    const { isPending, mutate } = api.projects.create.useMutation({
        onSuccess: async (proj) => {
            router.push(`/p/${proj.id}`);
            await utils.projects.getList.invalidate();
        },
    });
    const form = useForm<CreateProjectSchema>({
        resolver: zodResolver(CreateProjectSchema),
    });
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"sm"} className="w-full">
                    <PlusCircle />
                    Neues Projekt
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Erstelle ein neues Projekt</DialogTitle>
                    <DialogDescription>
                        Später kann eine Beschreibung hinzugefügt werden.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className="space-y-3"
                        onSubmit={form.handleSubmit((d) => mutate(d))}
                    >
                        <FormField
                            control={form.control}
                            name={"name"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Projektname"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button isLoading={isPending}>Erstellen</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
