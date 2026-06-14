import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {createSectionBlock} from "@/api_service/sectionBlocks.ts";
import * as React from "react";
import {Button, Field, FieldRequiredIndicator, HStack, NumberInput, Stack, Text} from "@chakra-ui/react";
import {FiAlertCircle, FiEdit2} from "react-icons/fi";
import {useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {Control, RichTextEditor} from "@/components/ui/rich-text-editor.tsx";


export default function CreateSectionBlockForm({ sectionId, slug, onSuccess }: { sectionId: number, slug: string, onSuccess?: () => void }) {
    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        staticPageSectionId: sectionId,
        content: "",
        orderIndex: 1
    });

    const mutation = useMutation({
        mutationFn: createSectionBlock,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["staticPage", slug] });
            onSuccess?.();
        }
    });

    const editor = useEditor({
        extensions: [StarterKit],
        content: form.content,
        onUpdate({ editor }) {
            setForm(prev => ({ ...prev, content: editor.getHTML() }));
        },
    });

    const handleSubmit = (e: React.SyntheticEvent)=> {
        e.preventDefault();
        mutation.mutate(form);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={5}>
                <HStack gap={2}>
                    <FiEdit2 size={15} color="var(--chakra-colors-blue-400)" />
                    <Text fontSize="sm" fontWeight="semibold" color="gray.700">Block Content</Text>
                </HStack>

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
                        <FiAlertCircle size={22}/>
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