import {Button, HStack} from "@chakra-ui/react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteStaticPageSection} from "@/api_service/staticPageSections.ts";

export default function DeleteStaticPageSectionConfirmation(
    { sectionId, slug, onCancel }: { sectionId: number; slug: string; onCancel: () => void }
) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: number) => deleteStaticPageSection(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["staticPage", slug] })
    });

    return (
        <HStack gap={3} justify="flex-end">
            <Button
                variant="ghost"
                onClick={onCancel}
                disabled={mutation.isPending}
            >
                Cancel
            </Button>
            <Button
                colorPalette="red"
                onClick={() => mutation.mutate(sectionId)}
                disabled={mutation.isPending}
            >
                {mutation.isPending ? "Deleting..." : "Delete"}
            </Button>
        </HStack>
    );
}
