import {Link as RouterLink, useSearchParams} from "react-router";
import {Box, Button, Card, Container, Grid, GridItem, Heading, HStack, Link as ChakraLink, Text, VStack} from "@chakra-ui/react";
import FindProfessionals from "@/components/professionals/FindProfessionals.tsx";
import {useQuery} from "@tanstack/react-query";
import getAllProfessionals from "@/api_service/professional.ts";
import FullPageLoader from "@/components/utils/FullPageLoader.tsx";
import type {Professional} from "@/utils/types.ts";
import ErrorDisplay from "@/components/utils/ErrorDisplay.tsx";
import GenericDialog from "@/components/utils/GenericDialog.tsx";
import {useAuth} from "@/auth/useAuth.ts";
import {FiPlus} from "react-icons/fi";
import CreateReviewForm from "@/components/reviews/CreateReviewForm.tsx";
import LoginOrRegister from "@/components/auth/LoginOrRegister.tsx";

export default function Professionals() {
    const [searchParams] = useSearchParams();
    const { user } = useAuth();

    const type = searchParams.get("type");
    const city = searchParams.get("city");

    const {isPending, isError, data, error} = useQuery({
        queryFn: () => getAllProfessionals(type, city),
        queryKey: ["professionals", type, city],
        enabled: !!type && !!city
    });

    if (!type || !city) {
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
                            Find Professionals In Your City
                        </Heading>
                    </Container>
                </Box>
                <Container maxW="5xl" py={12} px={{base: 4, md: 8}}>
                    <FindProfessionals />
                </Container>
            </Box>
        );
    }

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
                        {type}s in {city}
                    </Heading>
                </Container>
            </Box>

            <Container maxW="5xl" py={12} px={{base: 4, md: 8}}>
                {data.length === 0 ? (
                    <VStack gap={8} align="stretch">
                        <Text color="gray.700" fontSize="md" lineHeight="1.8">
                            Currently, there are no {type}s from {city} in our database. If you have visited
                            one, please leave a review. You may also search for professionals of a different
                            type or from a different city.
                        </Text>

                        <Heading as="h2" fontSize="2xl" fontWeight="semibold" color="gray.800" mb={6}>
                            Search Again
                        </Heading>

                        <FindProfessionals />

                    </VStack>
                ) : (
                    <Grid
                        templateColumns={{base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)"}}
                        gap={4}
                    >
                        {data.map((professional: Professional) => (
                            <GridItem key={professional.id}>
                                <Card.Root shadow="sm" h="full" display="flex" flexDirection="column">
                                    <Card.Header flex={1}>
                                        <Card.Title fontWeight="semibold">
                                            <ChakraLink asChild color="gray.800" _hover={{color: "blue.600", textDecoration: "underline"}}>
                                                <RouterLink to={`/reviews/${professional.id}/${professional.slug}`}>
                                                    {professional.name}
                                                </RouterLink>
                                            </ChakraLink>
                                        </Card.Title>
                                    </Card.Header>
                                    <Card.Footer pt={2}>
                                        <Button size="sm" colorPalette="blue" variant="subtle" asChild>
                                            <RouterLink to={`/reviews/${professional.id}/${professional.slug}`}>Reviews</RouterLink>
                                        </Button>
                                    </Card.Footer>
                                </Card.Root>
                            </GridItem>
                        ))}
                    </Grid>
                )}

                <Box mt={10} p={5} bg="blue.50" borderRadius="lg" borderLeft="4px solid" borderColor="blue.200">
                    <VStack align="start" gap={3}>
                        <HStack gap={2}>
                            <Box color="blue.400"><FiPlus size={16} /></Box>
                            <Heading as="h2" fontSize="lg" fontWeight="semibold" color="blue.900">
                                Can't find the {type} you're looking for?
                            </Heading>
                        </HStack>
                        <Text color="gray.700" fontSize="sm" lineHeight="1.8">
                            If you've visited a {type} in {city} who isn't listed here, you can add them by leaving a review.
                        </Text>
                        {user ? (
                            <GenericDialog
                                component={({onClose}) => <CreateReviewForm
                                    id={null}
                                    city={city}
                                    professionalType={type}
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
                                component={() => <LoginOrRegister calledFrom={location.pathname} />}
                                title="Please Login or Register to Continue"
                                buttonText="Add a Review"
                                size={"lg" as never}
                                icon={<FiPlus />}
                            />
                        )}
                    </VStack>
                </Box>
            </Container>
        </Box>
    );
}
