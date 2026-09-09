import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteReviewer} from "@/api_service/reviewer.ts";
import {Box, Button, HStack, Text, VStack} from "@chakra-ui/react";
import {FiAlertCircle, FiAlertTriangle} from "react-icons/fi";

export default function BanReviewerConfirmation({
    reviewerId,
    reviewerEmail,
    onClose,
}: {
    reviewerId: number;
    reviewerEmail: string;
    onClose?: () => void;
}) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => deleteReviewer(reviewerId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["adminReviewers"]});
            onClose?.();
        }
    });

    return (
        <VStack gap={6} align="stretch">
            <Box bg="red.50" borderRadius="lg" p={4} borderLeft="4px solid" borderColor="red.200">
                <HStack gap={3} align="start">
                    <Box color="red.500" mt={0.5} flexShrink={0}>
                        <FiAlertTriangle size={18} />
                    </Box>
                    <VStack align="start" gap={1}>
                        <Text fontWeight="semibold" color="red.800" fontSize="sm">
                            Ban {reviewerEmail}?
                        </Text>
                        <Text color="red.700" fontSize="sm" lineHeight="1.6">
                            This will permanently delete the reviewer's account and all of their support tickets.
                            Any reviews they have written will remain but will no longer be linked to their account.
                            This action cannot be undone.
                        </Text>
                    </VStack>
                </HStack>
            </Box>

            {mutation.isError && (
                <HStack gap={2} color="red.500">
                    <FiAlertCircle size={16} />
                    <Text fontSize="sm">{mutation.error.message}</Text>
                </HStack>
            )}

            <HStack gap={3} justify="flex-end">
                <Button variant="ghost" colorPalette="gray" disabled={mutation.isPending} onClick={onClose}>
                    Cancel
                </Button>
                <Button colorPalette="red" onClick={() => mutation.mutate()} disabled={mutation.isPending}>
                    {mutation.isPending ? "Banning..." : "Ban Reviewer"}
                </Button>
            </HStack>
        </VStack>
    );
}