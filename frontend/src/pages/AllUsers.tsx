import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "react-router";
import {type AdminReviewerFilters, getReviewersForAdmin} from "@/api_service/reviewer.ts";
import ErrorDisplay from "@/components/utils/ErrorDisplay.tsx";
import FullPageLoader from "@/components/utils/FullPageLoader.tsx";
import {
    Box,
    Button,
    Card,
    Container,
    Field,
    Grid,
    GridItem,
    Heading,
    HStack,
    Input,
    Text,
    VStack,
} from "@chakra-ui/react";
import type {SyntheticEvent} from "react";
import {FiMail} from "react-icons/fi";

function hasAnyFilter(searchParams: URLSearchParams): boolean {
    return searchParams.has("id") || searchParams.has("email");
}

function getAdminReviewerFilters(searchParams: URLSearchParams): AdminReviewerFilters {
    const id = searchParams.get("id")?.trim();
    const email = searchParams.get("email")?.trim();
    return {
        id: id || undefined,
        email: email || undefined,
    };
}

export default function AllUsers() {
    const [searchParams, setSearchParams] = useSearchParams();
    const filters = getAdminReviewerFilters(searchParams);
    const isSearching = hasAnyFilter(searchParams);

    const {data: reviewers = [], isFetching, isError, error} = useQuery({
        queryKey: ["adminReviewers", searchParams.toString()],
        queryFn: () => getReviewersForAdmin(filters),
        enabled: isSearching,
    });

    function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const idVal = String(formData.get("id") ?? "").trim();
        const emailVal = String(formData.get("email") ?? "").trim();

        const params = new URLSearchParams();
        if (idVal) params.set("id", idVal);
        if (emailVal) params.set("email", emailVal);

        setSearchParams(params, {replace: true});
    }

    function handleReset() {
        setSearchParams({}, {replace: true});
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
                        mb={4}
                    >
                        All Reviewers
                    </Heading>
                    <Text color="gray.700" fontSize="md">
                        {isSearching && reviewers.length > 0
                            ? `${reviewers.length} reviewer${reviewers.length !== 1 ? "s" : ""} found`
                            : "Search reviewers by ID or email."}
                    </Text>
                </Container>
            </Box>

            <Container maxW="5xl" py={8} px={{base: 4, md: 8}}>
                <Box
                    bg="blue.50"
                    borderRadius="lg"
                    p={6}
                    borderLeft="4px solid"
                    borderColor="blue.200"
                    mb={8}
                >
                    <form key={searchParams.toString()} onSubmit={handleSubmit}>
                        <Grid
                            templateColumns={{base: "1fr", sm: "repeat(2, 1fr)"}}
                            gap={4}
                            mb={4}
                        >
                            <Field.Root>
                                <Field.Label>ID</Field.Label>
                                <Input
                                    name="id"
                                    type="text"
                                    defaultValue={searchParams.get("id") || ""}
                                    placeholder="Reviewer ID (partial match)"
                                    bg="white"
                                />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Email</Field.Label>
                                <Input
                                    name="email"
                                    type="text"
                                    defaultValue={searchParams.get("email") || ""}
                                    placeholder="Email (partial match)"
                                    bg="white"
                                />
                            </Field.Root>
                        </Grid>
                        <HStack gap={3}>
                            <Button type="submit" colorPalette="blue" loading={isFetching}>Search</Button>
                            <Button type="button" variant="outline" onClick={handleReset}>Reset</Button>
                        </HStack>
                    </form>
                </Box>

                {isError && <ErrorDisplay message={error.message} />}

                {!isSearching ? (
                    <Text color="gray.500" fontSize="md" textAlign="center">
                        Enter at least one search criterion to find reviewers.
                    </Text>
                ) : isFetching ? (
                    <FullPageLoader />
                ) : reviewers.length === 0 ? (
                    <Text color="gray.500" fontSize="md" textAlign="center">
                        No reviewers found matching the given criteria.
                    </Text>
                ) : (
                    <Grid templateColumns={{base: "1fr", sm: "repeat(2, 1fr)"}} gap={4}>
                        {reviewers.map((reviewer) => (
                            <GridItem key={reviewer.id}>
                                <Card.Root shadow="sm" h="full" display="flex" flexDirection="column">
                                    <Card.Header pb={2}>
                                        <HStack justify="space-between" w="full">
                                            <VStack align="start" gap={0}>
                                                <Text fontWeight="semibold" color="gray.800" fontSize="md">
                                                    {reviewer.email}
                                                </Text>
                                                <Text fontSize="xs" color="gray.500">ID: {reviewer.id}</Text>
                                            </VStack>
                                        </HStack>
                                    </Card.Header>

                                    <Card.Body pt={0}>
                                        <HStack gap={2} fontSize="sm">
                                            <Box color="blue.400" flexShrink={0}>
                                                <FiMail size={13} />
                                            </Box>
                                            <Text color="gray.700">{reviewer.email}</Text>
                                        </HStack>
                                        <Text fontSize="xs" color="gray.500" mt={2}>
                                            Joined: {new Date(reviewer.createdAt).toLocaleDateString("en-IN", {
                                                year: "numeric", month: "short", day: "numeric"
                                            })}
                                        </Text>
                                    </Card.Body>
                                </Card.Root>
                            </GridItem>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
}
