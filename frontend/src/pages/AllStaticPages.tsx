import {useQuery} from "@tanstack/react-query";
import {getAllStaticPages} from "@/api_service/staticPages.ts";
import FullPageLoader from "../components/utils/FullPageLoader.tsx";
import {Badge, Box, Card, Container, Flex, Grid, GridItem, Heading, HStack, VStack} from "@chakra-ui/react";
import CreateStaticPageForm from "../components/static_pages/page/CreateStaticPageForm.tsx";
import GenericDialog from "../components/utils/GenericDialog.tsx";
import {FiEdit2, FiPlus, FiTrash2} from "react-icons/fi";
import StaticPageDetails from "../components/static_pages/StaticPageDetails.tsx";
import DeleteStaticPageConfirmation from "../components/static_pages/page/DeleteStaticPageConfirmation.tsx";
import type {StaticPage} from "@/utils/types.ts";
import ErrorDisplay from "@/components/utils/ErrorDisplay.tsx";

export default function AllStaticPages() {
    const {isPending, isError, data, error} = useQuery({
        queryKey: ["staticPages"],
        queryFn: getAllStaticPages,
    });

    if (isPending) return <FullPageLoader/>;

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
                        Static Pages
                    </Heading>
                </Container>
            </Box>

            <Container maxW="5xl" py={10} px={{base: 4, md: 8}}>
                <VStack gap={8} align="stretch">
                    <Grid
                        templateColumns={{base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)"}}
                        gap={4}
                    >
                        {data.map((page: StaticPage) => (
                            <GridItem key={page.id}>
                                <Card.Root h="full" shadow="sm" display="flex" flexDirection="column">
                                    <Card.Header flex={1}>
                                        <HStack justify="space-between" align="flex-start">
                                            <Box flex={1}>
                                                <Card.Title color="gray.800" fontWeight="semibold">
                                                    {page.title}
                                                </Card.Title>
                                                <Card.Description color="blue.400" fontFamily="mono" fontSize="sm" mt={1}>
                                                    /{page.slug}
                                                </Card.Description>
                                            </Box>
                                            <Badge
                                                colorPalette={page.active ? "green" : "gray"}
                                                variant="subtle"
                                                size="sm"
                                                flexShrink={0}
                                            >
                                                {page.active ? "Active" : "Inactive"}
                                            </Badge>
                                        </HStack>
                                    </Card.Header>

                                    <Card.Footer pt={2}>
                                        <HStack gap={2}>
                                            <GenericDialog
                                                component={() => <StaticPageDetails slug={page.slug}/>}
                                                title="Edit Page"
                                                buttonText="Edit"
                                                size={"full" as never}
                                                variant="subtle"
                                                buttonSize="sm"
                                                icon={<FiEdit2/>}
                                            />
                                            <GenericDialog
                                                component={() => <DeleteStaticPageConfirmation pageId={page.id as number}/>}
                                                title="Are you sure you want to delete this page?"
                                                buttonText="Delete"
                                                size={"md" as never}
                                                colorPalette="red"
                                                variant="subtle"
                                                buttonSize="sm"
                                                icon={<FiTrash2/>}
                                            />
                                        </HStack>
                                    </Card.Footer>
                                </Card.Root>
                            </GridItem>
                        ))}
                    </Grid>

                    <Flex justify="flex-start">
                        <GenericDialog
                            component={CreateStaticPageForm}
                            title="Create New Page"
                            buttonText="Create New Page"
                            size={"md" as never}
                            icon={<FiPlus/>}
                        />
                    </Flex>
                </VStack>
            </Container>
        </Box>
    );
}
