import * as React from "react";
import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateTicket} from "@/api_service/ticket.ts";
import {Button, Field, FieldRequiredIndicator, HStack, NativeSelect, Stack, Text} from "@chakra-ui/react";
import {FiAlertCircle} from "react-icons/fi";
import type {Ticket} from "@/utils/types.ts";

const STATUSES = ["OPEN", "ONGOING", "CLOSED"] as const;

export default function EditTicketStatusForm({ ticket, onClose }: { ticket: Ticket; onClose?: () => void }) {
    const queryClient = useQueryClient();
    const [status, setStatus] = useState(ticket.status);

    const mutation = useMutation({
        mutationFn: () => updateTicket(ticket.id, { status }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["tickets"] });
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
                    <Field.Label color="gray.700">
                        Status <FieldRequiredIndicator />
                    </Field.Label>
                    <NativeSelect.Root>
                        <NativeSelect.Field
                            value={status}
                            onChange={(e) => setStatus(e.currentTarget.value as Ticket["status"])}
                        >
                            {STATUSES.map((s) => (
                                <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>
                            ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                </Field.Root>

                {mutation.isError && (
                    <HStack gap={2} color="red.500">
                        <FiAlertCircle size={22} />
                        <Text fontSize="sm">{mutation.error.message}</Text>
                    </HStack>
                )}

                <Button type="submit" colorPalette="blue" w="full" disabled={mutation.isPending || status === ticket.status}>
                    {mutation.isPending ? "Saving..." : "Save"}
                </Button>
            </Stack>
        </form>
    );
}
