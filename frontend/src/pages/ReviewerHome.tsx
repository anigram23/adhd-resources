import {
    Box,
    Card,
    Grid, GridItem,
    Text,
    VStack
} from "@chakra-ui/react";
import FindProfessionals from "@/components/professionals/FindProfessionals.tsx";
import {useQuery} from "@tanstack/react-query";
import {getAllStaticPages} from "@/api_service/staticPages.ts";
import FullPageLoader from "@/components/utils/FullPageLoader.tsx";
import type {StaticPage} from "@/utils/types.ts";

export default function ReviewerHome() {

    const staticPagesQuery = useQuery({
        queryKey: ["staticPages"],
        queryFn: getAllStaticPages,
    });

    if (staticPagesQuery.isPending) {
        return <FullPageLoader />;
    }

    return (
        <VStack>
            <Text fontSize="4xl" textAlign="center">ADHD Resources for Indians</Text>
            <Text fontSize="xl" textAlign="center">
                Crowdsourced reviews of psychologists and psychiatrists.
            </Text>

            <Text fontSize="2xl" textAlign="center">Find a professional:</Text>
            <FindProfessionals />

            <Text fontSize="xl" textAlign="center">Learn About ADHD and How To Get Diagnosed</Text>
            <Grid
                templateColumns={{base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)"}}
                gap={4}
            >
                {staticPagesQuery.data.map((page: StaticPage) => (
                    <GridItem key={page.id}>
                        <Card.Root>
                            <Card.Header>
                                <Card.Title>{page.title}</Card.Title>
                            </Card.Header>

                            <Card.Footer>
                                <Box asChild>
                                    <a href={page.slug}>Read</a>
                                </Box>
                            </Card.Footer>
                        </Card.Root>
                    </GridItem>
                ))}
            </Grid>

        </VStack>
    )
}