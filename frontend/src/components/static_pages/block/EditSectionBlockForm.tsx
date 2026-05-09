import {useMutation, useQueryClient} from "@tanstack/react-query";
import {type Key, useState} from "react";
import {updateSectionBlock} from "@/api_service/sectionBlocks.ts";
import * as React from "react";
import {Button, Field, HStack, Stack, Text, Textarea} from "@chakra-ui/react";
import {FiAlertCircle} from "react-icons/fi";

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

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        mutation.mutate({ id: block.id as number, content });
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Field.Root>
                    <Field.Label>Content</Field.Label>
                    <Textarea
                        size="xl"
                        variant="outline"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
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
