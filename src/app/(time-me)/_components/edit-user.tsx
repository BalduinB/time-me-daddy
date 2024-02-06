"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormCustomMessage,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditUser as EditUserSchema } from "@/schemas/user";
import { api } from "@/trpc/react";
import { api as serverApi } from "@/trpc/server";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function EditUser({ user }: { user: NonNullable<Awaited<ReturnType<typeof serverApi.user.get.query>>> }) {
    const router = useRouter();
    const { mutate, isLoading: isMutating } = api.user.update.useMutation({
        onError: (e) => toast.error("Fehler", { description: e.message }),
        onSuccess: (e) => {
            toast.success("Daten übernommen");
            router.refresh();
        },
    });
    const form = useForm<EditUserSchema>({
        resolver: zodResolver(EditUserSchema),
    });
    return (
        <Dialog onOpenChange={() => form.reset()}>
            <DialogTrigger asChild>
                <Button className="w-full">Deine Daten</Button>
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
                                        <Input {...field} placeholder={user.name} />
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
