import {useQuery} from "@tanstack/react-query";
import {getAllStaticPages} from "@/api_service/staticPages.ts";
import FullPageLoader from "@/components/FullPageLoader.tsx";
import type {Key} from "react";
import {Box, Button, Card, Container, Flex, Grid, GridItem, Heading, HStack, Text, VStack} from "@chakra-ui/react";
import CreateStaticPageForm from "@/components/CreateStaticPageForm.tsx";
import GenericDialog from "@/components/GenericDialog.tsx";
import {FiAlertCircle, FiEdit2, FiTrash2} from "react-icons/fi";
import {BsToggleOff, BsToggleOn} from "react-icons/bs";

type StaticPage = { id: Key; title: string; slug: string; active: boolean };

export default function AllStaticPages() {
    const {isPending, isError, data, error} = useQuery({
        queryKey: ["staticPages"],
        queryFn: getAllStaticPages,
    });

    if (isPending) return <FullPageLoader/>;

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
                                <Card.Root h="full" shadow="sm">
                                    <Card.Header>
                                        <Card.Title color="gray.800" fontWeight="semibold">
                                            {page.title}
                                        </Card.Title>
                                        <Card.Description color="blue.400" fontFamily="mono" fontSize="sm">
                                            /{page.slug}
                                        </Card.Description>
                                    </Card.Header>

                                    <Card.Body>
                                        <Flex gap={2} wrap="wrap">
                                            <Button size="sm" colorPalette="blue" variant="subtle">
                                                <FiEdit2/>
                                                Edit
                                            </Button>
                                            <Button size="sm" colorPalette="red" variant="subtle">
                                                <FiTrash2/>
                                                Delete
                                            </Button>
                                            <Button
                                                size="sm"
                                                colorPalette={page.active ? "gray" : "green"}
                                                variant="subtle"
                                            >
                                                {page.active ? <BsToggleOn/> : <BsToggleOff/>}
                                                {page.active ? "Deactivate" : "Activate"}
                                            </Button>
                                        </Flex>
                                    </Card.Body>
                                </Card.Root>
                            </GridItem>
                        ))}
                    </Grid>

                    <GenericDialog
                        component={CreateStaticPageForm}
                        title="Create New Page"
                        buttonText="Create New Page"
                        size={"md" as never}
                    />
                </VStack>
            </Container>
        </Box>
    );
}
