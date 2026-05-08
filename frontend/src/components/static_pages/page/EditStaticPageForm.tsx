import {Button, Field, HStack, Input, Stack, Switch, Text} from "@chakra-ui/react";
import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateStaticPage} from "@/api_service/staticPages.ts";
import * as React from "react";
import {FiAlertCircle} from "react-icons/fi";

export default function EditStaticPageForm (
    { page }: { page: { id: number, title: string, slug: string, active: boolean } }
) {

    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        title: page.title,
        slug: page.slug,
        active: page.active,
    });

    const mutation = useMutation({
        mutationFn: ({ id, ...credentials }: { id: number, title: string, slug: string, active: boolean }) =>
            updateStaticPage(id, credentials),
        onSuccess: (data: {title: string, slug: string, active: boolean}) => {
            queryClient.setQueryData(["staticPage", page.slug], (oldData: {sections: unknown[]}) => ({
                ...oldData,
                ...data,
            }));
            queryClient.setQueryData(["staticPages"], (oldData: Array<{title: string, slug: string, active: boolean}>) => {
                return oldData?.map(item => item.slug === page.slug ? { ...item, ...data } : item);
            });
        }
    })

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        mutation.mutate({ id: page.id, ...form });
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Field.Root>
                    <Field.Label>Title</Field.Label>
                    <Input
                        value={form.title}
                        onChange={(e) => setForm({...form, title: e.target.value})} />
                </Field.Root>

                <Field.Root>
                    <Field.Label>Slug</Field.Label>
                    <Input value={form.slug} onChange={(e) => setForm({...form, slug: e.target.value})} />
                </Field.Root>

                <Switch.Root
                    checked={form.active}
                    onCheckedChange={(e) => setForm({...form, active: e.checked as unknown as boolean})}
                >
                    <Switch.HiddenInput />

                    <Switch.Label>Active</Switch.Label>

                    <Switch.Control />

                </Switch.Root>

                {mutation.isError && (
                    <HStack gap={2} color="red.500">
                        <FiAlertCircle size={16}/>
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