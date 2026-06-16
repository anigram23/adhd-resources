import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {updateProfessionalType} from "@/api_service/professionalType.ts";
import * as React from "react";
import {
    Box, Button, Field, FieldRequiredIndicator, Heading, HStack, Input, Separator, Stack, Switch, Text
} from "@chakra-ui/react";
import {FiAlertCircle, FiInfo} from "react-icons/fi";
import type {ProfessionalType} from "@/utils/types.ts";

export default function EditProfessionalTypeForm({ professionalType, onClose }: { professionalType: ProfessionalType, onClose?: () => void }) {
    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        title: professionalType.title,
        doctor: professionalType.doctor,
        canDiagnose: professionalType.canDiagnose,
        canPrescribeMeds: professionalType.canPrescribeMeds,
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

                <Box bg="blue.50" borderRadius="lg" p={4} borderLeft="4px solid" borderColor="blue.200">
                    <HStack gap={2} mb={3}>
                        <Box color="blue.400"><FiInfo size={14} /></Box>
                        <Heading as="h3" fontSize="sm" fontWeight="semibold" color="blue.900" textTransform="uppercase" letterSpacing="wider">
                            Capabilities
                        </Heading>
                    </HStack>

                    <Stack gap={3}>
                        <Switch.Root
                            checked={form.doctor}
                            onCheckedChange={(e) => setForm({...form, doctor: e.checked as unknown as boolean})}
                        >
                            <Switch.HiddenInput />
                            <HStack gap={3}>
                                <Switch.Control />
                                <Switch.Label color="gray.700" fontSize="sm">Is Doctor?</Switch.Label>
                            </HStack>
                        </Switch.Root>

                        <Separator borderColor="blue.100" />

                        <Switch.Root
                            checked={form.canDiagnose}
                            onCheckedChange={(e) => setForm({...form, canDiagnose: e.checked as unknown as boolean})}
                        >
                            <Switch.HiddenInput />
                            <HStack gap={3}>
                                <Switch.Control />
                                <Switch.Label color="gray.700" fontSize="sm">Can Diagnose ADHD?</Switch.Label>
                            </HStack>
                        </Switch.Root>

                        <Separator borderColor="blue.100" />

                        <Switch.Root
                            checked={form.canPrescribeMeds}
                            onCheckedChange={(e) => setForm({...form, canPrescribeMeds: e.checked as unknown as boolean})}
                        >
                            <Switch.HiddenInput />
                            <HStack gap={3}>
                                <Switch.Control />
                                <Switch.Label color="gray.700" fontSize="sm">Can Prescribe Medication?</Switch.Label>
                            </HStack>
                        </Switch.Root>
                    </Stack>
                </Box>

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
