import {Button, HStack} from "@chakra-ui/react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteStaticPage} from "@/api_service/staticPages.ts";
import {useNavigate} from "react-router";

export default function DeleteStaticPageConfirmation({ pageId }: { pageId: string }) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (pageId: string) => deleteStaticPage(pageId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["staticPages"] });
            navigate("/admin/static-pages");
        }
    });

    return (
        <HStack gap={3} justify="flex-end">
            <Button
                variant="ghost"
                onClick={() => navigate("/admin/static-pages")}
                disabled={mutation.isPending}
            >
                Cancel
            </Button>
            <Button
                colorPalette="red"
                onClick={() => mutation.mutate(pageId)}
                disabled={mutation.isPending}
            >
                {mutation.isPending ? "Deleting..." : "Delete"}
            </Button>
        </HStack>
    );
}
