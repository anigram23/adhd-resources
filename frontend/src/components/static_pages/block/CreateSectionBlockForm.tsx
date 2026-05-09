import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {createSectionBlock} from "@/api_service/sectionBlocks.ts";
import * as React from "react";
import {Button, Field, FieldRequiredIndicator, HStack, NumberInput, Stack, Text, Textarea} from "@chakra-ui/react";
import {FiAlertCircle} from "react-icons/fi";


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

    const handleSubmit = (e: React.SyntheticEvent)=> {
        e.preventDefault();
        mutation.mutate(form);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Field.Root required>
                    <Field.Label>
                        Content
                        <FieldRequiredIndicator />
                    </Field.Label>

                    <Textarea
                        size="xl"
                        variant="outline"
                        value={form.content}
                        onChange={(e) => setForm({...form, content: e.target.value})}
                    />
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