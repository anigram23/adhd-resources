import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {updateStaticPageSectionOrder} from "@/api_service/staticPageSections.ts";
import * as React from "react";
import {Button, Field, HStack, NumberInput, Stack, Text} from "@chakra-ui/react";
import {FiAlertCircle} from "react-icons/fi";

type SectionOrder = { id: number; title: string; orderIndex: number };

export default function ReorderStaticPageSectionsForm({sections, slug, onSuccess}: { sections: SectionOrder[], slug: string, onSuccess?: () => void }) {
    const queryClient = useQueryClient();

    const [orders, setOrders] = useState<SectionOrder[]>(
        sections.map(s => ({id: s.id, title: s.title, orderIndex: s.orderIndex}))
    );
    const [validationError, setValidationError] = useState<string | null>(null);

    const mutation = useMutation({
        mutationFn: (updates: { id: number; orderIndex: number }[]) =>
            updateStaticPageSectionOrder(updates),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["staticPage", slug]});
            onSuccess?.();
        }
    });

    const validate = (): string | null => {
        const n = sections.length;
        const indices = orders.map(o => o.orderIndex);
        for (const idx of indices) {
            if (!Number.isFinite(idx) || idx < 1 || idx > n) {
                return `Each order index must be between 1 and ${n}.`;
            }
        }
        if (new Set(indices).size !== indices.length) {
            return "No two sections can have the same order index.";
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
        mutation.mutate(orders.map(o => ({id: o.id, orderIndex: o.orderIndex})));
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
                        <Field.Label>{o.title}</Field.Label>
                        <NumberInput.Root
                            value={String(o.orderIndex)}
                            min={1}
                            max={sections.length}
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