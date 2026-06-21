import * as React from "react";
import {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createTicket} from "@/api_service/ticket.ts";
import {getAllTicketTypes} from "@/api_service/ticketType.ts";
import {Button, Field, FieldRequiredIndicator, HStack, NativeSelect, Stack, Text, Textarea} from "@chakra-ui/react";
import {FiAlertCircle} from "react-icons/fi";
import type {TicketType} from "@/utils/types.ts";

export default function CreateTicketForm({ reviewerId, onClose }: { reviewerId: number; onClose?: () => void }) {
    const queryClient = useQueryClient();
    const [ticketTypeId, setTicketTypeId] = useState("");
    const [content, setContent] = useState("");

    const { data: ticketTypes } = useQuery({
        queryKey: ["ticketTypes"],
        queryFn: getAllTicketTypes,
    });

    const mutation = useMutation({
        mutationFn: () => createTicket({ ticketTypeId: Number(ticketTypeId), reviewerId, content }),
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
                        Ticket Type <FieldRequiredIndicator />
                    </Field.Label>
                    <NativeSelect.Root>
                        <NativeSelect.Field
                            placeholder="Select a type"
                            value={ticketTypeId}
                            onChange={(e) => setTicketTypeId(e.currentTarget.value)}
                        >
                            {ticketTypes?.map((type: TicketType) => (
                                <option key={type.id} value={type.id}>{type.title}</option>
                            ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                </Field.Root>

                <Field.Root required>
                    <Field.Label color="gray.700">
                        Content <FieldRequiredIndicator />
                    </Field.Label>
                    <Textarea
                        placeholder="Describe your issue..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={5}
                    />
                </Field.Root>

                {mutation.isError && (
                    <HStack gap={2} color="red.500">
                        <FiAlertCircle size={22} />
                        <Text fontSize="sm">{mutation.error.message}</Text>
                    </HStack>
                )}

                <Button
                    type="submit"
                    colorPalette="blue"
                    w="full"
                    disabled={mutation.isPending || !ticketTypeId || !content.trim()}
                >
                    {mutation.isPending ? "Submitting..." : "Submit"}
                </Button>
            </Stack>
        </form>
    );
}
