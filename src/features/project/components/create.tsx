"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
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
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useRef } from "react";

export function CreateProjectDialog() {
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const utils = api.useUtils();
    const router = useRouter();
    const { isPending, mutate } = api.projects.create.useMutation({
        onSuccess: async (proj) => {
            router.push(`/p/${proj.id}`);
            closeButtonRef.current?.click();
            await utils.projects.getList.invalidate();
        },
    });
    const form = useForm<CreateProjectSchema>({
        resolver: zodResolver(CreateProjectSchema),
    });
    return (
        <Dialog>
            <DialogTrigger asChild>
                <SidebarMenuButton isActive>
                    <PlusCircle />
                    Neues Projekt
                </SidebarMenuButton>
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
                            <DialogClose asChild ref={closeButtonRef}>
                                <Button variant={"ghost"}>Abbrechen</Button>
                            </DialogClose>
                            <Button isLoading={isPending}>Erstellen</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
