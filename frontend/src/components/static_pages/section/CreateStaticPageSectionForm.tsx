import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createStaticPageSection} from "@/api_service/staticPageSections.ts";
import {useState} from "react";
import {Button, Field, FieldRequiredIndicator, HStack, Input, NumberInput, Stack, Text} from "@chakra-ui/react";
import * as React from "react";
import {FiAlertCircle} from "react-icons/fi";
import {useEditor} from "@tiptap/react";
import {defaultEditorExtensions} from "@/components/ui/editor-extensions.ts";
import {Control, RichTextEditor} from "@/components/ui/rich-text-editor.tsx";


export default function CreateStaticPageSectionForm({ pageId, slug, onSuccess }: { pageId: string, slug: string, onSuccess?: () => void }) {
    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        staticPageId: pageId,
        title: "",
        content: "",
        orderIndex: 1
    })
    const mutation = useMutation({
        mutationFn: createStaticPageSection,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["staticPage", slug] });
            onSuccess?.();
        }
    })

    const editor = useEditor({
        extensions: defaultEditorExtensions,
        content: form.content,
        onUpdate({ editor }) {
            setForm(prev => ({ ...prev, content: editor.getHTML() }));
        },
    })

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        mutation.mutate(form);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Field.Root required>
                    <Field.Label>
                        Title
                        <FieldRequiredIndicator />
                    </Field.Label>

                    <Input
                        placeholder="Introduction"
                        value={form.title}
                        onChange={(e) => setForm({...form, title: e.target.value})}
                    />
                </Field.Root>

                <Field.Root required>
                    <Field.Label>
                        Content
                        <FieldRequiredIndicator />
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

                <Field.Root required>
                    <Field.Label>
                        Order Index
                        <FieldRequiredIndicator />
                    </Field.Label>
                    <NumberInput.Root
                        value={form.orderIndex as unknown as string}
                        onValueChange={(e) => setForm({...form, orderIndex: e.value as unknown as number})}
                        min={1}
                        defaultValue="1"
                    >
                        <NumberInput.Control />
                        <NumberInput.Input />
                    </NumberInput.Root>
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
                    {mutation.isPending ? "Creating..." : "Create"}
                </Button>
            </Stack>
        </form>
    )
}
