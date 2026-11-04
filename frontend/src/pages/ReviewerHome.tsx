import {
    Box,
    Card,
    Container,
    Grid,
    GridItem,
    Heading,
    VStack,
    Button
} from "@chakra-ui/react";
import FindProfessionals from "@/components/professionals/FindProfessionals.tsx";
import {useQuery} from "@tanstack/react-query";
import {getAllStaticPages} from "@/api_service/staticPages.ts";
import FullPageLoader from "@/components/utils/FullPageLoader.tsx";
import type {StaticPage} from "@/utils/types.ts";
import {Link} from "react-router";
import ErrorDisplay from "@/components/utils/ErrorDisplay.tsx";
import PageHeader from "@/components/utils/PageHeader.tsx";

export default function ReviewerHome() {

    const staticPagesQuery = useQuery({
        queryKey: ["staticPages"],
        queryFn: getAllStaticPages,
    });

    if (staticPagesQuery.isPending) {
        return <FullPageLoader />;
    }

    return (
        <Box>
            <PageHeader title="ADHD Resources for Indians" subtitle="Crowdsourced reviews of psychologists and psychiatrists."/>

            <Container maxW="5xl" py={{base: 8, md: 12}} px={{base: 4, md: 8}}>
                <VStack gap={12} align="stretch">
                    <Box>
                        <Heading as="h2" fontSize="2xl" fontWeight="semibold" color="gray.800" mb={6}>
                            Find a Professional
                        </Heading>
                        <FindProfessionals />
                    </Box>

                    <Box>
                        <Heading as="h2" fontSize="2xl" fontWeight="semibold" color="gray.800" mb={6}>
                            Learn About ADHD and How To Get Diagnosed
                        </Heading>

                        {staticPagesQuery.isError ? (
                            <ErrorDisplay message={"Failed to load pages"} />
                        ) : (
                            <Grid
                                templateColumns={{base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)"}}
                                gap={4}
                            >
                                {staticPagesQuery.data.filter((page: StaticPage) => page.active).map((page: StaticPage) => (
                                    <GridItem key={page.id}>
                                        <Card.Root shadow="sm" h="full" display="flex" flexDirection="column">
                                            <Card.Header flex={1}>
                                                <Card.Title color="gray.800" fontWeight="semibold">
                                                    {page.title}
                                                </Card.Title>
                                            </Card.Header>
                                            <Card.Footer pt={2}>
                                                <Button size="sm" colorPalette="blue" variant="subtle" asChild>
                                                    <Link to={`/${page.slug}`}>Read</Link>
                                                </Button>
                                            </Card.Footer>
                                        </Card.Root>
                                    </GridItem>
                                ))}
                            </Grid>
                        )}
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
}
