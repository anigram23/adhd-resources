import {useMutation, useQueryClient} from "@tanstack/react-query";
import {type Key, useState} from "react";
import {updateSectionBlock} from "@/api_service/sectionBlocks.ts";
import * as React from "react";
import {Button, HStack, Stack, Text} from "@chakra-ui/react";
import {FiAlertCircle, FiEdit2} from "react-icons/fi";
import {useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Control, RichTextEditor } from "@/components/ui/rich-text-editor.tsx"

type SectionBlock = {
    id: Key,
    content: string,
}

export default function EditSectionBlockForm({ block, slug, onSuccess } : { block: SectionBlock, slug: string, onSuccess?: () => void }) {
    const queryClient = useQueryClient();

    const [content, setContent] = useState(block.content);

    const mutation = useMutation({
        mutationFn: ({id, content}: {id: number, content: string}) =>
            updateSectionBlock(id, {content}),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["staticPage", slug] });
            onSuccess?.();
        }
    });

    const editor = useEditor({
        extensions: [StarterKit],
        content: content,
        onUpdate( { editor }){
            setContent(editor.getHTML())
        },
    })

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        mutation.mutate({ id: block.id as number, content });
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
                    {mutation.isPending ? "Saving..." : "Save"}
                </Button>
            </Stack>
        </form>
    )
}
