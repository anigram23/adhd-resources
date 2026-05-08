import {Button, HStack} from "@chakra-ui/react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteSectionBlock} from "@/api_service/sectionBlocks.ts";

export default function DeleteSectionBlockConfirmation(
    { blockId, slug, onCancel }: { blockId: number; slug: string; onCancel: () => void }
) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: number) => deleteSectionBlock(id),
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
                onClick={() => mutation.mutate(blockId)}
                disabled={mutation.isPending}
            >
                {mutation.isPending ? "Deleting..." : "Delete"}
            </Button>
        </HStack>
    );
}
