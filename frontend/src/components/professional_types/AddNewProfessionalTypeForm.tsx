import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {createProfessionalType} from "@/api_service/professionalType.ts";
import * as React from "react";
import {
    Button, Field, FieldRequiredIndicator, HStack, Input, Stack, Text
} from "@chakra-ui/react";
import {FiAlertCircle} from "react-icons/fi";

export default function AddNewProfessionalTypeForm({ onClose }: { onClose?: () => void }) {
    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        title: ""
    });

    const mutation = useMutation({
        mutationFn: createProfessionalType,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["professionalTypes"] });
            onClose?.();
        }
    });

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        mutation.mutate(form);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={6}>
                <Field.Root required>
                    <Field.Label color="gray.700">Title <FieldRequiredIndicator /></Field.Label>
                    <Input
                        placeholder="e.g. Psychiatrist"
                        value={form.title}
                        onChange={(e) => setForm({...form, title: e.target.value})}
                    />
                </Field.Root>


                {mutation.isError && (
                    <HStack gap={2} color="red.500">
                        <FiAlertCircle size={22} />
                        <Text fontSize="sm">{mutation.error.message}</Text>
                    </HStack>
                )}

                <Button type="submit" colorPalette="blue" w="full" disabled={mutation.isPending}>
                    {mutation.isPending ? "Submitting..." : "Submit"}
                </Button>
            </Stack>
        </form>
    )
}
