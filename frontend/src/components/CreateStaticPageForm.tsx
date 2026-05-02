import {Button, Field, FieldRequiredIndicator, Input, Stack} from "@chakra-ui/react";
import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createStaticPage} from "@/api_service/staticPages.ts";
import * as React from "react";

export default function CreateStaticPageForm() {
    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        title: "",
        slug: ""
    });

    const mutation = useMutation({
        mutationFn: createStaticPage,
        onSuccess: (data: {title: string, slug: string}) => {
            console.log("Static page created successfully", data);
            queryClient.setQueryData(["staticPages"], (oldData: Array<{title: string, slug: string}>) => {
                oldData.push(data);
            });
            window.location.reload();
        }
    })

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        mutation.mutate(form)
    }

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
                        placeholder="/about"
                        value={form.slug}
                        onChange={(e) => setForm({...form, slug: e.target.value})}
                    />
                </Field.Root>

                <Button
                    type="submit"
                    disabled={mutation.isPending}
                >
                    { mutation.isPending ? "Creating..." : "Create" }
                </Button>
            </Stack>
        </form>
    )
}