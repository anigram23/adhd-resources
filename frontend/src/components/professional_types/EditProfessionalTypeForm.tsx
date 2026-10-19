import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {updateProfessionalType} from "@/api_service/professionalType.ts";
import * as React from "react";
import {
    Button, Field, FieldRequiredIndicator, HStack, Input, Stack, Text
} from "@chakra-ui/react";
import {FiAlertCircle} from "react-icons/fi";
import type {ProfessionalType} from "@/utils/types.ts";

export default function EditProfessionalTypeForm({ professionalType, onClose }: { professionalType: ProfessionalType, onClose?: () => void }) {
    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        title: professionalType.title
    });

    const mutation = useMutation({
        mutationFn: () => updateProfessionalType(professionalType.id, form),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["professionalTypes"] });
            onClose?.();
        }
    });

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        mutation.mutate();
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={6}>
                <Field.Root required>
                    <Field.Label color="gray.700">Title <FieldRequiredIndicator /></Field.Label>
                    <Input
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
                    {mutation.isPending ? "Saving..." : "Save"}
                </Button>
            </Stack>
        </form>
    )
}
