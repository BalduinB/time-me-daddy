"use client";
import { MinimalTiptapEditor } from "@/components/rich-text";
import { Button } from "@/components/ui/button";
import { P } from "@/components/ui/typography";
import { api } from "@/trpc/react";
import { JSONContent } from "@tiptap/react";
import { Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
export function ProjectDescription({
    description,
    projectId,
}: {
    description: JSONContent | null;
    projectId: string;
}) {
    const [isEditing, setIsEditing] = useState(!description);
    const { mutate, isPending } = api.projects.edit.useMutation({
        onSuccess: () => {
            setIsEditing(false);
            toast.success("Beschreibung gespeichert");
        },
        onError() {
            toast.error("Fehler beim Speichern der Beschreibung");
        },
    });

    useEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            setIsEditing(false);
        }
    });
    const [value, setValue] = useState<JSONContent | null>(description);
    return (
        <>
            <P size={"sm"}>Beschreibung </P>
            <div className="relative">
                <MinimalTiptapEditor
                    immediatelyRender={false}
                    value={value}
                    onChange={(v) => setValue(v as JSONContent)}
                    className="w-full"
                    editorContentClassName=""
                    output="json"
                    placeholder="Type your description here..."
                    autofocus={true}
                    editable={isPending === true ? true : isEditing}
                    editorClassName="focus:outline-none"
                />
                {!isEditing && (
                    <Button
                        size={"sm"}
                        variant={"outline"}
                        onClick={() => setIsEditing((v) => !v)}
                        className="absolute bottom-0 right-0 rounded-bl-none rounded-tr-none"
                    >
                        <Edit className="size-4" /> bearbeiten
                    </Button>
                )}
            </div>

            {isEditing && (
                <div className="flex justify-end gap-2">
                    <Button
                        variant="ghost"
                        onClick={() => {
                            setValue(description);
                            setIsEditing(false);
                        }}
                    >
                        Abbrechen
                    </Button>
                    <Button
                        isLoading={isPending}
                        onClick={() =>
                            mutate({ id: projectId, description: value })
                        }
                    >
                        Speichern
                    </Button>
                </div>
            )}
        </>
    );
}
