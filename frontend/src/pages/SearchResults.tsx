import {useSearchParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {getProfessionalsByName} from "@/api_service/professional.ts";
import {Box, Button, Card, Container, Flex, Grid, GridItem, Heading, HStack, Text, VStack} from "@chakra-ui/react";
import FindProfessionals from "@/components/professionals/FindProfessionals.tsx";
import FullPageLoader from "@/components/utils/FullPageLoader.tsx";
import ErrorDisplay from "@/components/utils/ErrorDisplay.tsx";
import type {Professional} from "@/utils/types.ts";
import {RiMentalHealthLine} from "react-icons/ri";
import {LiaCitySolid} from "react-icons/lia";
import {FiSearch} from "react-icons/fi";
import Professionals from "@/pages/Professionals.tsx";

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    const {isPending, isError, data, error} = useQuery({
        queryFn: () => getProfessionalsByName(query!),
        queryKey: ["professionals", query],
        enabled: !!query
    });

    if (!query) {
        return <Professionals />;
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
                    <VStack align="start" gap={2}>
                        <Heading
                            as="h1"
                            fontSize={{base: "3xl", md: "5xl"}}
                            fontWeight="bold"
                            color="blue.900"
                            lineHeight="1.15"
                        >
                            Results for "{query}"
                        </Heading>
                        <Text color="gray.700" fontSize="md">
                            {data.length} professional{data.length !== 1 ? "s" : ""} found
                        </Text>
                    </VStack>
                </Container>
            </Box>

            <Container maxW="5xl" py={12} px={{base: 4, md: 8}}>
                {data.length > 0 ? (
                    <Grid
                        templateColumns={{base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)"}}
                        gap={4}
                        mb={10}
                    >
                        {data.map((professional: Professional) => (
                            <GridItem key={professional.id}>
                                <Card.Root shadow="sm" h="full" display="flex" flexDirection="column">
                                    <Card.Header flex={1}>
                                        <Card.Title color="gray.800" fontWeight="semibold">
                                            <Flex gap={1}>
                                                {professional.professionalType.doctor && <span>Dr.</span>}
                                                {professional.name}
                                            </Flex>
                                        </Card.Title>
                                        <Card.Description>
                                            <Flex gap={1} align="center">
                                                <Box color="blue.400"><RiMentalHealthLine /></Box>
                                                {professional.professionalType.title}
                                            </Flex>
                                            <Flex gap={1} align="center">
                                                <Box color="blue.400"><LiaCitySolid /></Box>
                                                {professional.city.name}
                                            </Flex>
                                        </Card.Description>
                                    </Card.Header>
                                    <Card.Footer pt={2}>
                                        <Button size="sm" colorPalette="blue" variant="subtle" asChild>
                                            <a href={`/reviews/${professional.id}/${professional.slug}`}>Reviews</a>
                                        </Button>
                                    </Card.Footer>
                                </Card.Root>
                            </GridItem>
                        ))}
                    </Grid>
                ) : (
                    <Text color="gray.700" fontSize="md" lineHeight="1.8" mb={10}>
                        No professionals matched your search. Try searching by type and city below.
                    </Text>
                )}

                <Box p={5} bg="blue.50" borderRadius="lg" borderLeft="4px solid" borderColor="blue.200">
                    <VStack align="start" gap={4}>
                        <HStack gap={2}>
                            <Box color="blue.400"><FiSearch size={16} /></Box>
                            <Heading as="h2" fontSize="lg" fontWeight="semibold" color="blue.900">
                                {data.length > 0
                                    ? "Didn't find who you're looking for?"
                                    : "Search by type and city"}
                            </Heading>
                        </HStack>
                        <Text color="gray.700" fontSize="sm" lineHeight="1.8">
                            {data.length > 0
                                ? "Narrow your results by selecting a professional type and city."
                                : "Browse professionals in your area by selecting a type and city."}
                        </Text>
                        <FindProfessionals />
                    </VStack>
                </Box>
            </Container>
        </Box>
    );
}
