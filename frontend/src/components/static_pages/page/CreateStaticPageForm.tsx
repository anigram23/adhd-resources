import {Button, Field, FieldRequiredIndicator, HStack, Input, Stack, Text} from "@chakra-ui/react";
import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createStaticPage} from "@/api_service/staticPages.ts";
import * as React from "react";
import {FiAlertCircle} from "react-icons/fi";

export default function CreateStaticPageForm({ onClose }: { onClose?: () => void }) {
    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        title: "",
        slug: ""
    });

    const mutation = useMutation({
        mutationFn: createStaticPage,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["staticPages"] });
            onClose?.();
        }
    });

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        mutation.mutate(form);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Field.Root required>
                    <Field.Label>
                        Title
                        <FieldRequiredIndicator/>
                    </Field.Label>
                    <Input
                        placeholder="About"
                        value={form.title}
                        onChange={(e) => setForm({...form, title: e.target.value})}
                    />
                </Field.Root>

                <Field.Root required>
                    <Field.Label>
                        Slug
                        <FieldRequiredIndicator/>
                    </Field.Label>
                    <Input
                        placeholder="about"
                        value={form.slug}
                        onChange={(e) => setForm({...form, slug: e.target.value})}
                    />
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
                    {mutation.isPending ? "Creating..." : "Create"}
                </Button>
            </Stack>
        </form>
    );
}
