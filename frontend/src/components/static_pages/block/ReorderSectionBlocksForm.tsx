import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {updateSectionBlockOrder} from "@/api_service/sectionBlocks.ts";
import * as React from "react";
import {Button, Field, HStack, NumberInput, Stack, Text} from "@chakra-ui/react";
import {FiAlertCircle} from "react-icons/fi";

type BlockOrder = { id: number; orderIndex: number };

export default function ReorderSectionBlocksForm({blocks, slug, onSuccess}: { blocks: BlockOrder[], slug: string, onSuccess?: () => void }) {
    const queryClient = useQueryClient();

    const [orders, setOrders] = useState<BlockOrder[]>(
        blocks.map(b => ({id: b.id, orderIndex: b.orderIndex}))
    );
    const [validationError, setValidationError] = useState<string | null>(null);

    const mutation = useMutation({
        mutationFn: (updates: BlockOrder[]) => updateSectionBlockOrder(updates),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["staticPage", slug]});
            onSuccess?.();
        }
    });

    const validate = (): string | null => {
        const n = blocks.length;
        const indices = orders.map(o => o.orderIndex);
        for (const idx of indices) {
            if (!Number.isFinite(idx) || idx < 1 || idx > n) {
                return `Each order index must be between 1 and ${n}.`;
            }
        }
        if (new Set(indices).size !== indices.length) {
            return "No two blocks can have the same order index.";
        }
        return null;
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const error = validate();
        if (error) {
            setValidationError(error);
            return;
        }
        setValidationError(null);
        mutation.mutate(orders);
    };

    const updateOrder = (id: number, value: string) => {
        const parsed = parseInt(value, 10);
        setOrders(prev => prev.map(o => o.id === id ? {...o, orderIndex: parsed} : o));
        setValidationError(null);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={4}>
                {orders.map(o => (
                    <Field.Root key={o.id}>
                        <Field.Label>Block {o.orderIndex}</Field.Label>
                        <NumberInput.Root
                            value={String(o.orderIndex)}
                            min={1}
                            max={blocks.length}
                            onValueChange={(e) => updateOrder(o.id, e.value)}
                        >
                            <NumberInput.Control/>
                            <NumberInput.Input/>
                        </NumberInput.Root>
                    </Field.Root>
                ))}

                {(validationError || mutation.isError) && (
                    <HStack gap={2} color="red.500">
                        <FiAlertCircle size={16}/>
                        <Text fontSize="sm">{validationError ?? mutation.error?.message}</Text>
                    </HStack>
                )}

                <Button type="submit" colorPalette="blue" w="full" disabled={mutation.isPending}>
                    {mutation.isPending ? "Saving..." : "Save Order"}
                </Button>
            </Stack>
        </form>
    );
}
