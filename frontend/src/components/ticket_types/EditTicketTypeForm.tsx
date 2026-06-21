import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import * as React from "react";
import {updateTicketType} from "@/api_service/ticketType.ts";
import {Button, Field, FieldRequiredIndicator, HStack, Input, Stack, Text} from "@chakra-ui/react";
import {FiAlertCircle} from "react-icons/fi";
import type {TicketType} from "@/utils/types.ts";

export default function EditTicketTypeForm({ ticketType, onClose }: { ticketType: TicketType, onClose?: () => void }) {
    const queryClient = useQueryClient();
    const [title, setTitle] = useState(ticketType.title);

    const mutation = useMutation({
        mutationFn: () => updateTicketType(ticketType.id, { title }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["ticketTypes"] });
            onClose?.();
        }
    });

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        mutation.mutate();
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={6}>
                <Field.Root required>
                    <Field.Label color="gray.700">Title <FieldRequiredIndicator /></Field.Label>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Field.Root>

                {mutation.isError && (
                    <HStack gap={2} color="red.500">
                        <FiAlertCircle size={22} />
                        <Text fontSize="sm">{mutation.error.message}</Text>
                    </HStack>
                )}

                <Button type="submit" colorPalette="blue" w="full" disabled={mutation.isPending}>
                    {mutation.isPending ? "Saving..." : "Save"}
                </Button>
            </Stack>
        </form>
    );
}
