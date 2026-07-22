import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Box, Button, HStack, Text, VStack} from "@chakra-ui/react";
import {FiAlertCircle, FiAlertTriangle} from "react-icons/fi";
import {useNavigate} from "react-router";
import {deleteReviewer, reviewerLogout} from "@/api_service/reviewer.ts";

export default function DeleteAccountConfirmation({
    userId,
    onClose,
}: {
    userId: number;
    onClose?: () => void;
}) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: () => deleteReviewer(userId),
        onSuccess: async () => {
            try {
                await reviewerLogout();
            } catch {
                // account is gone regardless; proceed with client-side cleanup
            }
            queryClient.setQueryData(["currentUser"], null);
            onClose?.();
            navigate("/");
        },
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
                            This action cannot be undone
                        </Text>
                        <Text color="red.700" fontSize="sm" lineHeight="1.6">
                            Your reviewer account and all of your support tickets will be permanently removed.
                            Any reviews you have written will remain but will no longer be linked to your account.
                            You will need to register again if you wish to come back.
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
                <Button
                    variant="ghost"
                    colorPalette="gray"
                    disabled={mutation.isPending}
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    colorPalette="red"
                    onClick={() => mutation.mutate()}
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? "Deleting..." : "Delete Account"}
                </Button>
            </HStack>
        </VStack>
    );
}
