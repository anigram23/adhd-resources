import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {updateStaticPageSection} from "@/api_service/staticPageSections.ts";
import * as React from "react";
import {Button, Field, HStack, Input, Stack, Text} from "@chakra-ui/react";
import {FiAlertCircle} from "react-icons/fi";
import {useEditor} from "@tiptap/react";
import {defaultEditorExtensions} from "@/components/ui/editor-extensions.ts";
import {Control, RichTextEditor} from "@/components/ui/rich-text-editor.tsx";

type StaticPageSection = {
    id: number,
    title: string,
    content: string,
}

export default function EditStaticPageSectionForm({ section, slug, onSuccess }: { section: StaticPageSection, slug: string, onSuccess?: () => void }) {
    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        title: section.title,
        content: section.content,
    });

    const mutation = useMutation({
        mutationFn: ({id, ...credentials}: {id: number, title: string, content: string}) =>
            updateStaticPageSection(id, credentials),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["staticPage", slug] });
            onSuccess?.();
        }
    });

    const editor = useEditor({
        extensions: defaultEditorExtensions,
        content: form.content,
        onUpdate({ editor }) {
            setForm(prev => ({ ...prev, content: editor.getHTML() }));
        },
    })

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        mutation.mutate({ id: section.id, ...form });
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Field.Root>
                    <Field.Label>
                        Title
                    </Field.Label>

                    <Input
                        value={form.title}
                        onChange={(e) => setForm({...form, title: e.target.value})}
                    />
                </Field.Root>

                <Field.Root>
                    <Field.Label>
                        Content
                    </Field.Label>

                    <RichTextEditor.Root
                        editor={editor}
                        borderColor="blue.100"
                        _focusWithin={{ borderColor: "blue.300", shadow: "sm" }}
                        css={{ "--content-min-height": "160px" }}
                    >
                        <RichTextEditor.Toolbar>
                            <RichTextEditor.ControlGroup>
                                <Control.Bold />
                                <Control.Italic />
                                <Control.Underline />
                                <Control.Strikethrough />
                            </RichTextEditor.ControlGroup>
                            <RichTextEditor.ControlGroup>
                                <Control.BulletList />
                                <Control.OrderedList />
                            </RichTextEditor.ControlGroup>
                            <RichTextEditor.ControlGroup>
                                <Control.Undo />
                                <Control.Redo />
                            </RichTextEditor.ControlGroup>
                        </RichTextEditor.Toolbar>

                        <RichTextEditor.Content />
                    </RichTextEditor.Root>
                </Field.Root>

                {mutation.isError && (
                    <HStack gap={2} color="red.500">
                        <FiAlertCircle size={16}/>
                        <Text fontSize="sm">{mutation.error.message}</Text>
                    </HStack>
                )}

                <Button
                    type="submit"
                    colorPalette="blue"
                    w="full"
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? "Saving..." : "Save"}
                </Button>
            </Stack>
        </form>
    )
}
