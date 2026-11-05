import {useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {getReviewsForProfessional} from "@/api_service/professional.ts";
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
    HStack,
    RatingGroup,
    Separator,
    Text,
    VStack,
} from "@chakra-ui/react";
import type {Review} from "@/utils/types.ts";
import {useAuth} from "@/auth/useAuth.ts";
import {FaPhone, FaRupeeSign, FaStethoscope} from "react-icons/fa";
import {HiOfficeBuilding, HiOutlineFlag} from "react-icons/hi";
import {MdComputer} from "react-icons/md";
import {FiEdit2, FiPlus, FiTrash2} from "react-icons/fi";
import ReviewContent from "@/components/reviews/ReviewContent.tsx";
import GenericDialog from "@/components/utils/GenericDialog.tsx";
import CreateReviewForm from "@/components/reviews/CreateReviewForm.tsx";
import LoginOrRegister from "@/components/auth/LoginOrRegister.tsx";
import EditReviewForm from "@/components/reviews/EditReviewForm.tsx";
import DeleteReviewConfirmation from "@/components/reviews/DeleteReviewConfirmation.tsx";
import CreateTicketForm from "@/components/tickets/CreateTicketForm.tsx";
import PageHeader from "@/components/utils/PageHeader.tsx";

export default function Reviews() {
    const {id} = useParams();
    const {user} = useAuth();

    const {data, error, isPending, isError} = useQuery({
        queryKey: ["reviews", id],
        queryFn: () => getReviewsForProfessional(id as string)
    });

    if (isPending) return <FullPageLoader />;
    if (isError) return <ErrorDisplay message={error.message} />;

    const averageRating = data.length
        ? data.reduce((sum: number, r: Review) => sum + r.rating, 0) / data.length
        : 0;

    return (
        <Box>
            <PageHeader title={data.length ? `Reviews For ${data[0].professional.name}` : "Reviews"}>
                <HStack gap={6} flexWrap="wrap">
                    <Text color="gray.700" fontSize="md">
                        {data.length} review{data.length !== 1 ? "s" : ""}
                    </Text>
                    {data.length > 0 && (
                        <HStack gap={2}>
                            <RatingGroup.Root readOnly allowHalf defaultValue={averageRating} count={5} size="sm">
                                <RatingGroup.HiddenInput />
                                <RatingGroup.Control />
                            </RatingGroup.Root>
                            <Text color="gray.700" fontSize="md">{averageRating.toFixed(1)} avg</Text>
                        </HStack>
                    )}
                </HStack>
            </PageHeader>

            <Container maxW="5xl" py={{base: 8, md: 12}} px={{base: 4, md: 8}}>
                <VStack gap={6} align="stretch" mb={8}>
                    <Box
                        p={4}
                        bg="blue.50"
                        borderRadius="md"
                        borderLeft="4px solid"
                        borderColor="blue.200"
                    >
                        <Text color="gray.700" fontSize="md" lineHeight="1.8">
                            These reviews reflect the subjective opinions of our users, based on their unique
                            perspective and experiences. If you find any factually wrong or inappropriate content,
                            please report it to the admins.
                        </Text>
                    </Box>
                    <Box>
                        { user ? (
                            <GenericDialog
                                component={({ onClose }) => <CreateReviewForm
                                    id={id as string}
                                    city={null}
                                    professionalType={null}
                                    onClose={onClose}
                                    />}
                                title="Share Your Thoughts"
                                buttonText="Add a Review"
                                size={"xl" as never}
                                icon={<FiPlus />}
                            />
                        ) : (
                            <GenericDialog
                                key="login"
                                component={() => <LoginOrRegister /> }
                                title="Please Login or Register to Continue"
                                buttonText="Add a Review"
                                size={"md" as never}
                                icon={<FiPlus />}
                            />
                        )}
                    </Box>
                </VStack>

                {data.length === 0 && (
                    <Text color="gray.500" fontSize="md" textAlign="center">
                        No reviews yet. Be the first to add one.
                    </Text>
                )}

                <Grid templateColumns={{base: "1fr", md: "repeat(2, 1fr)"}} gap={4}>
                    {data.map((review: Review) => (
                        <GridItem key={review.id}>
                            <Card.Root shadow="sm" h="480px" display="flex" flexDirection="column">
                                <Card.Header pb={2}>
                                    <HStack justify="space-between" w="full">
                                        <VStack align="start" gap={1}>
                                            <RatingGroup.Root readOnly allowHalf defaultValue={review.rating} count={5} size="sm">
                                                <RatingGroup.HiddenInput />
                                                <RatingGroup.Control />
                                            </RatingGroup.Root>
                                            <Text fontSize="xs" color="gray.500">
                                                {new Date(review.createdAt).toLocaleDateString("en-IN", {
                                                    year: "numeric", month: "short", day: "numeric"
                                                })}
                                            </Text>
                                            {user?.role === "ADMIN" && (
                                                <Text fontSize="xs" color="gray.500">ID: {review.id}</Text>
                                            )}
                                        </VStack>

                                        <HStack gap={1}>
                                            {review.owner && (
                                                <GenericDialog
                                                    component={({ onClose }) => <EditReviewForm review={review} onClose={onClose} />}
                                                    title="Edit Review"
                                                    buttonText=""
                                                    size={"xl" as never}
                                                    icon={<FiEdit2 />}
                                                    variant="ghost"
                                                    colorPalette="blue"
                                                    buttonSize="sm"
                                                />
                                            )}
                                            {(review.owner || user?.role === "ADMIN") ? (
                                                <GenericDialog
                                                    component={({ onClose }) => <DeleteReviewConfirmation id={review.id} professionalId={review.professional.id} onClose={onClose} />}
                                                    title="Delete this review?"
                                                    buttonText=""
                                                    size={"sm" as never}
                                                    icon={<FiTrash2 />}
                                                    variant="ghost"
                                                    colorPalette="red.400"
                                                    buttonSize="sm"
                                                />
                                            ) : user ? (
                                                <GenericDialog
                                                    component={({onClose}) => <CreateTicketForm reviewerId={user!.id} onClose={onClose} review={review.id} />}
                                                    title="Report Review"
                                                    buttonText=""
                                                    size={"sm" as never}
                                                    icon={<HiOutlineFlag />}
                                                    variant="ghost"
                                                    colorPalette="gray.500"
                                                />
                                            ) : (
                                                <GenericDialog
                                                    key="login"
                                                    component={() => <LoginOrRegister /> }
                                                    title="Please Login or Register to Continue"
                                                    buttonText=""
                                                    size={"sm" as never}
                                                    icon={<HiOutlineFlag />}
                                                    variant="ghost"
                                                    colorPalette="gray.500"
                                                />
                                            )}
                                        </HStack>
                                    </HStack>
                                </Card.Header>

                                <Card.Body pt={0} display="flex" flexDirection="column" minH={0}>
                                    <VStack align="start" gap={2} flex={1} minH={0}>
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
                                        {review.wasDiagnosed && (
                                            <HStack gap={2} fontSize="sm">
                                                <Box color="blue.400"><FaStethoscope size={13} /></Box>
                                                <Text color="gray.700">Was diagnosed with ADHD by {review.professional.name}</Text>
                                            </HStack>
                                        )}

                                        <Separator />

                                        <ReviewContent review={review}/>
                                    </VStack>
                                </Card.Body>
                            </Card.Root>
                        </GridItem>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
