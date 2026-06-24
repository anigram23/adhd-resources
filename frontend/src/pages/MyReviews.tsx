import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getReviewsByReviewer} from "@/api_service/reviewer.ts";
import FullPageLoader from "@/components/utils/FullPageLoader.tsx";
import ErrorDisplay from "@/components/utils/ErrorDisplay.tsx";
import {
    Badge,
    Box,
    Card,
    Container,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack,
    RatingGroup,
    Separator,
    Text,
    VStack,
} from "@chakra-ui/react";
import type {Review} from "@/utils/types.ts";
import {useAuth} from "@/auth/useAuth.ts";
import {FaPhone, FaRupeeSign} from "react-icons/fa";
import {HiOfficeBuilding} from "react-icons/hi";
import {MdComputer} from "react-icons/md";
import {FiEdit2, FiTrash2} from "react-icons/fi";
import {Prose} from "@/components/ui/prose.tsx";
import GenericDialog from "@/components/utils/GenericDialog.tsx";
import EditReviewForm from "@/components/reviews/EditReviewForm.tsx";
import DeleteReviewConfirmation from "@/components/reviews/DeleteReviewConfirmation.tsx";

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
            <Box bg="blue.50" py={14} px={4} borderBottom="1px solid" borderColor="blue.100">
                <Container maxW="5xl">
                    <Heading
                        as="h1"
                        fontSize={{base: "3xl", md: "5xl"}}
                        fontWeight="bold"
                        color="blue.900"
                        lineHeight="1.15"
                        mb={4}
                    >
                        My Reviews
                    </Heading>
                    <Text color="gray.700" fontSize="md">
                        {data.length} review{data.length !== 1 ? "s" : ""}
                    </Text>
                </Container>
            </Box>

            <Container maxW="5xl" py={12} px={{base: 4, md: 8}}>
                {data.length === 0 ? (
                    <Text color="gray.500" fontSize="md" textAlign="center">
                        You haven't posted any reviews yet.
                    </Text>
                ) : (
                    <Grid templateColumns={{base: "1fr", sm: "repeat(2, 1fr)"}} gap={4}>
                        {data.map((review: Review) => (
                            <GridItem key={review.id}>
                                <Card.Root shadow="sm" h="full" display="flex" flexDirection="column">
                                    <Card.Header pb={2}>
                                        <VStack align="start" gap={2} w="full">
                                            <HStack justify="space-between" w="full">
                                                <VStack align="start" gap={0}>
                                                    <Text fontWeight="semibold" color="gray.800" fontSize="md">
                                                        {review.professional.name}
                                                    </Text>
                                                    <Text fontSize="sm" color="blue.400" fontFamily="mono">
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
                                            <RatingGroup.Root readOnly allowHalf defaultValue={review.rating} count={5} size="sm">
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

                                    <Card.Body pt={0}>
                                        <VStack align="start" gap={2}>
                                            <HStack gap={2} fontSize="sm">
                                                <Box color="blue.400"><FaPhone size={13} /></Box>
                                                <Text color="gray.700">{review.contactNumber}</Text>
                                            </HStack>
                                            <HStack gap={2} fontSize="sm">
                                                <Box color="blue.400"><HiOfficeBuilding size={15} /></Box>
                                                <Text color="gray.700">{review.address}</Text>
                                            </HStack>
                                            <Badge
                                                colorPalette={review.doesOnlineConsultations ? "green" : "gray"}
                                                variant="subtle"
                                                size="sm"
                                                gap={1}
                                            >
                                                <MdComputer />
                                                {review.doesOnlineConsultations ? "Online consultations available" : "No online consultations"}
                                            </Badge>

                                            <Separator />

                                            <HStack gap={4} fontSize="sm" flexWrap="wrap">
                                                <Flex align="center" gap={1} color="gray.700">
                                                    <Box color="blue.400"><FaRupeeSign size={12} /></Box>
                                                    <Text>{review.consultationFee} per consultation</Text>
                                                </Flex>
                                                {review.diagnosisFee > 0 && (
                                                    <Flex align="center" gap={1} color="gray.700">
                                                        <Box color="blue.400"><FaRupeeSign size={12} /></Box>
                                                        <Text>{review.diagnosisFee} diagnosis</Text>
                                                    </Flex>
                                                )}
                                            </HStack>

                                            <Separator />

                                            <Prose
                                                size="lg"
                                                color="gray.700"
                                                lineHeight="1.8"
                                                maxW="none"
                                                dangerouslySetInnerHTML={{__html: review.content}}
                                            />
                                        </VStack>
                                    </Card.Body>
                                </Card.Root>
                            </GridItem>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
}
