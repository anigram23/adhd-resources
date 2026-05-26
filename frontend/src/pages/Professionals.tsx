import {useSearchParams} from "react-router";
import {VStack, Text, Box, Grid, GridItem, Card, Button, Container, HStack} from "@chakra-ui/react";
import FindProfessionals from "@/components/professionals/FindProfessionals.tsx";
import {useQuery} from "@tanstack/react-query";
import getAllProfessionals from "@/api_service/professional.ts";
import FullPageLoader from "@/components/utils/FullPageLoader.tsx";
import type {Professional} from "@/utils/types.ts";
import {FiAlertCircle} from "react-icons/fi";

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
            <VStack gap={2}>
                <Text fontSize="4xl">Find Professionals In Your City</Text>
                <FindProfessionals />
            </VStack>
        )
    }

    if (isPending) {
        return <FullPageLoader />;
    }

    if (isError) {
        return (
            <Container maxW="5xl" py={20}>
                <HStack gap={3} color="red.500" justify="center">
                    <FiAlertCircle size={22}/>
                    <Text fontSize="lg">Failed to load: {error.message}</Text>
                </HStack>
            </Container>
        );
    }

    return (
        <Box>
            <Text fontSize="3xl">{type}s in {city}</Text>
            { !data ? (
                <Text>
                    Currently, there are no reviews for {type}s in {city}s. If you have visited one,
                    please leave a review.
                </Text>
            ) : (
                <Grid
                    templateColumns={{base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)"}}
                    gap={4}
                >
                    {data.map((professional: Professional) => (
                        <GridItem key={professional.id}>
                            <Card.Root>
                                <Card.Header>
                                    <Card.Title>{professional.name}</Card.Title>
                                </Card.Header>

                                <Card.Footer>
                                    <Button>Reviews</Button>
                                </Card.Footer>
                            </Card.Root>
                        </GridItem>
                    ))}
                </Grid>
            )}
        </Box>
    )


}