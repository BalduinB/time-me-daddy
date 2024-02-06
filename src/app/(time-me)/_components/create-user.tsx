"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateUser as CreateUserSchema } from "@/schemas/user";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function CreateUser() {
    const router = useRouter();
    const { mutate, isLoading: isMutating } = api.user.create.useMutation({
        onError: (e) => toast.error("Fehler", { description: e.message }),
        onSuccess: (e) => {
            toast.success("Daten erstellt");
            router.refresh();
        },
    });
    const form = useForm<CreateUserSchema>({
        resolver: zodResolver(CreateUserSchema),
    });
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full">Erstelle deine Nutzer</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editiere deine Namen</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((d) => mutate(d))}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder={"Wähle deine Name / Spitznamen"} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end">
                            <Button isLoading={isMutating}>Übernehmen</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
