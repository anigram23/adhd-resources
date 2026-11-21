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
    // Frontend validation errors, keyed by section id
    const [validationErrors, setValidationErrors] = useState<Record<number, string>>({});

    const mutation = useMutation({
        mutationFn: (updates: { id: number; orderIndex: number }[]) =>
            updateStaticPageSectionOrder(updates),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["staticPage", slug]});
            onSuccess?.();
        }
    });

    const validate = (): Record<number, string> => {
        const n = sections.length;
        const errors: Record<number, string> = {};
        for (const o of orders) {
            if (!Number.isFinite(o.orderIndex) || o.orderIndex < 1 || o.orderIndex > n) {
                errors[o.id] = `Order index must be between 1 and ${n}.`;
            } else if (orders.some(other => other.id !== o.id && other.orderIndex === o.orderIndex)) {
                errors[o.id] = "Another section has the same order index.";
            }
        }
        return errors;
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const errors = validate();
        setValidationErrors(errors);
        if (Object.keys(errors).length > 0) {
            mutation.reset();
            return;
        }
        mutation.mutate(orders.map(o => ({id: o.id, orderIndex: o.orderIndex})));
    };

    const updateOrder = (id: number, value: string) => {
        const parsed = parseInt(value, 10);
        setOrders(prev => prev.map(o => o.id === id ? {...o, orderIndex: parsed} : o));
        setValidationErrors({});
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={4}>
                {orders.map(o => (
                    <Field.Root key={o.id} invalid={!!validationErrors[o.id]}>
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
                        <Field.ErrorText>{validationErrors[o.id]}</Field.ErrorText>
                    </Field.Root>
                ))}

                {/* Backend sends the whole list in one request, so its errors can't be tied to a single row */}
                {mutation.isError && (
                    <HStack gap={2} color="red.500">
                        <FiAlertCircle size={16}/>
                        <Text fontSize="sm">{mutation.error.message}</Text>
                    </HStack>
                )}

                <Button type="submit" colorPalette="blue" w="full" disabled={mutation.isPending}>
                    {mutation.isPending ? "Saving..." : "Save Order"}
                </Button>
            </Stack>
        </form>
    );
}