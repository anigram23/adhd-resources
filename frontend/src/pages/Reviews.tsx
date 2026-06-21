import {useLocation, useParams} from "react-router";
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
import {HiOfficeBuilding, HiOutlineFlag} from "react-icons/hi";
import {MdComputer} from "react-icons/md";
import {FiEdit2, FiPlus, FiTrash2} from "react-icons/fi";
import {Prose} from "@/components/ui/prose.tsx";
import GenericDialog from "@/components/utils/GenericDialog.tsx";
import CreateReviewForm from "@/components/reviews/CreateReviewForm.tsx";
import LoginOrRegister from "@/components/auth/LoginOrRegister.tsx";
import EditReviewForm from "@/components/reviews/EditReviewForm.tsx";
import DeleteReviewConfirmation from "@/components/reviews/DeleteReviewConfirmation.tsx";
import CreateTicketForm from "@/components/tickets/CreateTicketForm.tsx";

export default function Reviews() {
    const {id} = useParams();
    const {user} = useAuth();
    const location = useLocation();
    console.log(location);

    const {data, error, isPending, isError} = useQuery({
        queryKey: ["reviews", id],
        queryFn: () => getReviewsForProfessional(id as unknown as number)
    });

    if (isPending) return <FullPageLoader />;
    if (isError) return <ErrorDisplay message={error.message} />;

    const averageRating = data.length
        ? data.reduce((sum: number, r: Review) => sum + r.rating, 0) / data.length
        : 0;

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
                        Reviews For {data[0].professional.name}
                    </Heading>
                    <HStack gap={6} flexWrap="wrap">
                        <Text color="gray.700" fontSize="md">
                            {data.length} review{data.length !== 1 ? "s" : ""}
                        </Text>
                        <HStack gap={2}>
                            <RatingGroup.Root readOnly allowHalf defaultValue={averageRating} count={5} size="sm">
                                <RatingGroup.HiddenInput />
                                <RatingGroup.Control />
                            </RatingGroup.Root>
                            <Text color="gray.700" fontSize="md">{averageRating.toFixed(1)} avg</Text>
                        </HStack>
                    </HStack>
                </Container>
            </Box>

            <Container maxW="5xl" py={12} px={{base: 4, md: 8}}>
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
                                    id={id as unknown as number}
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
                                component={() => <LoginOrRegister calledFrom={location.pathname} /> }
                                title="Please Login or Register to Continue"
                                buttonText="Add a Review"
                                size={"md" as never}
                                icon={<FiPlus />}
                            />
                        )}
                    </Box>
                </VStack>

                <Grid templateColumns={{base: "1fr", sm: "repeat(2, 1fr)"}} gap={4}>
                    {data.map((review: Review) => (
                        <GridItem key={review.id}>
                            <Card.Root shadow="sm" h="full" display="flex" flexDirection="column">
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
                                        </VStack>

                                        {user?.role === "ADMIN" && (
                                            <>
                                                <Text fontSize="sm" color="black">ID: {review.id}</Text>
                                                <Text fontSize="sm" color="black">By: {review.reviewer.email}</Text>
                                            </>
                                        )}

                                        <HStack gap={1}>
                                            {(user?.email === review.reviewer.email || user?.role === "ADMIN") ? (
                                                <>
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
                                                </>
                                            ) : (
                                                user ? (
                                                    <GenericDialog
                                                        component={({onClose}) => <CreateTicketForm reviewerId={user!.id} onClose={onClose}/>}
                                                        title="Report Review"
                                                        buttonText=""
                                                        size={"sm" as never}
                                                        icon={<HiOutlineFlag />}
                                                        variant="ghost"
                                                        colorPalette="gray.500"
                                                    />
                                                ) : (
                                                    <GenericDialog
                                                        component={() => <LoginOrRegister calledFrom={location.pathname} /> }
                                                        title="Please Login or Register to Continue"
                                                        buttonText="Add a Review"
                                                        size={"md" as never}
                                                        icon={<FiPlus />}
                                                    />
                                                )

                                            )}
                                        </HStack>
                                    </HStack>
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
                                            dangerouslySetInnerHTML={{ __html: review.content }}
                                        />
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
