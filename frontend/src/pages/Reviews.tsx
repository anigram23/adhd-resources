import {useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {getReviewsForProfessional} from "@/api_service/professional.ts";
import FullPageLoader from "@/components/utils/FullPageLoader.tsx";
import ErrorDisplay from "@/components/utils/ErrorDisplay.tsx";
import {
    Box,
    Container,
    Grid,
    GridItem,
    Heading,
    Text,
    Card,
    HStack,
    Menu,
    Button,
    Portal,
    RatingGroup, ScrollArea, Flex
} from "@chakra-ui/react";
import { CiMenuKebab } from "react-icons/ci";
import type {Review} from "@/utils/types.ts";
import {useAuth} from "@/auth/useAuth.ts";
import {FaPhone, FaRupeeSign} from "react-icons/fa";
import {HiOfficeBuilding} from "react-icons/hi";
import {MdComputer} from "react-icons/md";

export default function Reviews() {
    const { id } = useParams();
    const { user } = useAuth();

    const { data, error, isPending, isError } = useQuery({
        queryKey: ["reviews", id],
        queryFn: () => getReviewsForProfessional(id as unknown as number)
    })

    if (isPending) {
        return <FullPageLoader />;
    }

    if (isError) {
        return <ErrorDisplay message={error.message} />;
    }

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
                    >
                        Reviews For {data[0].professional.name}
                    </Heading>
                </Container>
            </Box>

            <Box>
                <Text fontSize="2xl">
                    Note: These reviews reflect the subjective opinions of our users,
                    which is based on their unique perspective and experiences. If you find any factually wrong
                    or inappropriate content in any review, please report them to the admins.
                </Text>

                <Container maxW="5xl" py={12} px={{base: 4, md: 8}}>
                    <Grid
                        templateColumns={{base: "1fr", sm: "repeat(2, 1fr)"}}
                        gap={4}
                    >
                        { data.map((review: Review) => (
                            <GridItem key={review.id}>
                                <Card.Root shadow="sm" h="full" display="flex" flexDirection="column">
                                    <Card.Body>
                                        <HStack gap={5} w="full">
                                            <Text>{new Date(review.createdAt).toLocaleDateString()}</Text>

                                            <RatingGroup.Root readOnly allowHalf defaultValue={review.rating} count={5}>
                                                <RatingGroup.HiddenInput />
                                                <RatingGroup.Control />
                                            </RatingGroup.Root>

                                            <Flex><FaRupeeSign />{review.consultationFee}</Flex>

                                            <Menu.Root positioning={{placement: "right-end"}}>
                                                <Menu.Trigger asChild>
                                                    <Button variant="outline">
                                                        <CiMenuKebab />
                                                    </Button>
                                                </Menu.Trigger>

                                                <Portal>
                                                    <Menu.Positioner>
                                                        <Menu.Content>
                                                            {/*If current user is the same as the one who posted the*/}
                                                            {/*review, items should be edit and delete. If not, report.*/}
                                                            { user?.email === review.reviewer.email ? (
                                                                <>
                                                                    <Menu.Item value="edit">Edit</Menu.Item>
                                                                    <Menu.Item value="delete" color="fg.error">Delete</Menu.Item>
                                                                </>
                                                            ) : (
                                                                <Menu.Item value="report">Report</Menu.Item>
                                                            )}
                                                        </Menu.Content>
                                                    </Menu.Positioner>
                                                </Portal>
                                            </Menu.Root>
                                        </HStack>

                                        <Flex><FaPhone /> {review.contactNumber}</Flex>
                                        <Flex><HiOfficeBuilding /> {review.address}</Flex>
                                        <Flex>
                                            <MdComputer />
                                            <Text>{
                                                review.doesOnlineConsultations ? ("Offers") : ("Does not offer")} online consultations
                                            </Text>
                                        </Flex>

                                        <ScrollArea.Root variant="hover">
                                            <ScrollArea.Viewport>
                                                <ScrollArea.Content>{review.content}</ScrollArea.Content>
                                            </ScrollArea.Viewport>
                                            <ScrollArea.Scrollbar />
                                        </ScrollArea.Root>

                                    </Card.Body>
                                </Card.Root>
                            </GridItem>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}