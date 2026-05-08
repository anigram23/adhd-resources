import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {updateStaticPageSection} from "@/api_service/staticPageSections.ts";
import * as React from "react";
import {Button, Field, HStack, Input, NumberInput, Stack, Text} from "@chakra-ui/react";
import {FiAlertCircle} from "react-icons/fi";

type StaticPageSection = {
    id: number,
    title: string,
    orderIndex: number
}

export default function EditStaticPageSectionForm({ section, slug, onSuccess }: { section: StaticPageSection, slug: string, onSuccess?: () => void }) {
    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        title: section.title,
        orderIndex: section.orderIndex,
    });

    const mutation = useMutation({
        mutationFn: ({id, ...credentials}: {id: number, title: string, orderIndex: number}) =>
            updateStaticPageSection(id, credentials),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["staticPage", slug] });
            onSuccess?.();
        }
    });

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        mutation.mutate({ id: section.id, ...form });
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Field.Root>
                    <Field.Label>
                        Title
                    </Field.Label>

                    <Input
                        value={form.title}
                        onChange={(e) => setForm({...form, title: e.target.value})}
                    />
                </Field.Root>

                <Field.Root>
                    <Field.Label>
                        Order Index
                    </Field.Label>
                    <NumberInput.Root
                        value={form.orderIndex as unknown as string}
                        onValueChange={(e) => setForm({...form, orderIndex: e.value as unknown as number})}
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
                    {mutation.isPending ? "Saving..." : "Save"}
                </Button>
            </Stack>
        </form>
    )
}