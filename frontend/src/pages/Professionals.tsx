import {useSearchParams} from "react-router";
import {Box, Button, Card, Container, Grid, GridItem, Heading, Text, VStack} from "@chakra-ui/react";
import FindProfessionals from "@/components/professionals/FindProfessionals.tsx";
import {useQuery} from "@tanstack/react-query";
import getAllProfessionals from "@/api_service/professional.ts";
import FullPageLoader from "@/components/utils/FullPageLoader.tsx";
import type {Professional} from "@/utils/types.ts";
import ErrorDisplay from "@/components/utils/ErrorDisplay.tsx";

export default function Professionals() {
    const [searchParams] = useSearchParams();

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
                        <Box>
                            <Heading as="h2" fontSize="2xl" fontWeight="semibold" color="gray.800" mb={6}>
                                Search Again
                            </Heading>
                            <FindProfessionals />
                        </Box>
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
                                        <Card.Title color="gray.800" fontWeight="semibold">
                                            {professional.type.doctor && (<div>Dr.</div>)}{professional.name}
                                        </Card.Title>
                                    </Card.Header>
                                    <Card.Footer pt={2}>
                                        <Button size="sm" colorPalette="blue" variant="subtle">
                                            Reviews
                                        </Button>
                                    </Card.Footer>
                                </Card.Root>
                            </GridItem>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
}
