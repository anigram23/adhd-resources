import {useMutation, useQueryClient} from "@tanstack/react-query";
import {type Key, useState} from "react";
import {updateSectionBlock} from "@/api_service/sectionBlocks.ts";
import * as React from "react";
import {Button, Field, HStack, NumberInput, Stack, Text, Textarea} from "@chakra-ui/react";
import {FiAlertCircle} from "react-icons/fi";

type SectionBlock = {
    id: Key,
    content: string,
    orderIndex: number
}

export default function EditSectionBlockForm({ block, slug, onSuccess } : { block: SectionBlock, slug: string, onSuccess?: () => void }) {
    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        content: block.content,
        orderIndex: block.orderIndex,
    });

    const mutation = useMutation({
        mutationFn: ({id, ...credentials}: {id: number, content: string, orderIndex: number}) =>
            updateSectionBlock(id, credentials),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["staticPage", slug] });
            onSuccess?.();
        }
    });

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        mutation.mutate({ id: block.id as number, ...form });
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Field.Root>
                    <Field.Label>
                        Content
                    </Field.Label>

                    <Textarea
                        size="xl"
                        variant="outline"
                        value={form.content}
                        onChange={(e) => setForm({...form, content: e.target.value})}
                    />
                </Field.Root>

                <Field.Root>
                    <Field.Label>
                        Order Index
                    </Field.Label>
                    <NumberInput.Root
                        value={form.orderIndex as unknown as string}
                        onValueChange={(e) => setForm({...form, orderIndex: e.value as unknown as number})}
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
                    {mutation.isPending ? "Saving..." : "Save"}
                </Button>
            </Stack>
        </form>
    )
}