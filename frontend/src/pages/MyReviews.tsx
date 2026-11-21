import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getReviewsByReviewer} from "@/api_service/reviewer.ts";
import FullPageLoader from "@/components/utils/FullPageLoader.tsx";
import ErrorDisplay from "@/components/utils/ErrorDisplay.tsx";
import {
    Box,
    Card,
    Container,
    Grid,
    GridItem,
    HStack,
    RatingGroup,
    Text,
    VStack,
} from "@chakra-ui/react";
import type {Review} from "@/utils/types.ts";
import {useAuth} from "@/auth/useAuth.ts";
import {FiEdit2, FiTrash2} from "react-icons/fi";
import ReviewCardBody from "@/components/reviews/ReviewCardBody.tsx";
import GenericDialog from "@/components/utils/GenericDialog.tsx";
import EditReviewForm from "@/components/reviews/EditReviewForm.tsx";
import DeleteReviewConfirmation from "@/components/reviews/DeleteReviewConfirmation.tsx";
import PageHeader from "@/components/utils/PageHeader.tsx";

export default function MyReviews() {
    const {user} = useAuth();
    const queryClient = useQueryClient();

    const {data, error, isPending, isError} = useQuery({
        queryKey: ["myReviews", user?.id],
        queryFn: () => getReviewsByReviewer(user!.id),
        enabled: !!user,
    });

    if (isPending) return <FullPageLoader />;
    if (isError) return <ErrorDisplay message={error.message} />;

    const invalidateMyReviews = () => {
        queryClient.invalidateQueries({queryKey: ["myReviews", user?.id]});
    };

    return (
        <Box>
            <PageHeader title="My Reviews" subtitle={`${data.length} review${data.length !== 1 ? "s" : ""}`}/>

            <Container maxW="5xl" py={{base: 8, md: 12}} px={{base: 4, md: 8}}>
                {data.length === 0 ? (
                    <Text color="gray.500" fontSize="md" textAlign="center">
                        You haven't posted any reviews yet.
                    </Text>
                ) : (
                    <Grid templateColumns={{base: "1fr", md: "repeat(2, 1fr)"}} gap={4}>
                        {data.map((review: Review) => (
                            <GridItem key={review.id}>
                                <Card.Root shadow="sm" h={{base: "430px", md: "400px"}} display="flex" flexDirection="column">
                                    <Card.Header pb={2}>
                                        <VStack align="start" gap={2} w="full">
                                            <HStack justify="space-between" w="full">
                                                <VStack align="start" gap={0}>
                                                    <Text fontWeight="semibold" color="gray.800" fontSize="md" lineClamp={1}>
                                                        {review.professional.name}
                                                    </Text>
                                                    <Text fontSize="sm" color="blue.400" fontFamily="mono" lineClamp={1}>
                                                        {review.professional.professionalType.title}, {review.professional.city.name}
                                                    </Text>
                                                </VStack>
                                                <HStack gap={1}>
                                                    <GenericDialog
                                                        component={({onClose}) => (
                                                            <EditReviewForm
                                                                review={review}
                                                                onClose={onClose}
                                                                afterSuccess={invalidateMyReviews}
                                                            />
                                                        )}
                                                        title="Edit Review"
                                                        buttonText=""
                                                        size={"xl" as never}
                                                        icon={<FiEdit2 />}
                                                        variant="ghost"
                                                        colorPalette="blue"
                                                        buttonSize="sm"
                                                    />
                                                    <GenericDialog
                                                        component={({onClose}) => (
                                                            <DeleteReviewConfirmation
                                                                id={review.id}
                                                                professionalId={review.professional.id}
                                                                onClose={onClose}
                                                                afterSuccess={invalidateMyReviews}
                                                            />
                                                        )}
                                                        title="Delete this review?"
                                                        buttonText=""
                                                        size={"sm" as never}
                                                        icon={<FiTrash2 />}
                                                        variant="ghost"
                                                        colorPalette="red.400"
                                                        buttonSize="sm"
                                                    />
                                                </HStack>
                                            </HStack>
                                            <RatingGroup.Root readOnly allowHalf value={review.rating} count={5} size="sm">
                                                <RatingGroup.HiddenInput />
                                                <RatingGroup.Control />
                                            </RatingGroup.Root>
                                            <Text fontSize="xs" color="gray.500">
                                                {new Date(review.createdAt).toLocaleDateString("en-IN", {
                                                    year: "numeric", month: "short", day: "numeric"
                                                })}
                                            </Text>
                                        </VStack>
                                    </Card.Header>

                                    <ReviewCardBody review={review}/>
                                </Card.Root>
                            </GridItem>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
}
