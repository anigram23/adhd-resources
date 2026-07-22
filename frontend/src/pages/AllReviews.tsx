import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useSearchParams} from "react-router";
import {type AdminReviewFilters, getReviewsForAdmin} from "@/api_service/review.ts";
import ErrorDisplay from "@/components/utils/ErrorDisplay.tsx";
import FullPageLoader from "@/components/utils/FullPageLoader.tsx";
import {
    Badge,
    Box,
    Button,
    Card,
    Container,
    Field,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack,
    Input,
    RatingGroup,
    Separator,
    Text,
    VStack,
} from "@chakra-ui/react";
import {useEffect, type SyntheticEvent} from "react";
import type {PrivateReview} from "@/utils/types.ts";
import {FaPhone, FaRupeeSign} from "react-icons/fa";
import {HiOfficeBuilding} from "react-icons/hi";
import {MdComputer} from "react-icons/md";
import {FiTrash2} from "react-icons/fi";
import {Prose} from "@/components/ui/prose.tsx";
import GenericDialog from "@/components/utils/GenericDialog.tsx";
import DeleteReviewConfirmation from "@/components/reviews/DeleteReviewConfirmation.tsx";

const REVIEW_FILTER_KEYS = ["id", "reviewerId", "professionalId", "fromDate", "toDate"];

function todayStartISO(): string {
    const d = new Date();
    return d.toISOString().split("T")[0] + "T00:00:00.000Z";
}

function todayEndISO(): string {
    const d = new Date();
    return d.toISOString().split("T")[0] + "T23:59:59.999Z";
}

function toDateInputValue(iso: string | null): string {
    if (!iso) return "";
    return iso.split("T")[0];
}

function toOptionalNumber(value: string | null): number | undefined {
    if (!value) return undefined;

    const numberValue = Number(value);
    return Number.isNaN(numberValue) ? undefined : numberValue;
}

function getAdminReviewFilters(searchParams: URLSearchParams): AdminReviewFilters {
    return {
        id: toOptionalNumber(searchParams.get("id")),
        reviewerId: toOptionalNumber(searchParams.get("reviewerId")),
        professionalId: toOptionalNumber(searchParams.get("professionalId")),
        fromDate: searchParams.get("fromDate") || undefined,
        toDate: searchParams.get("toDate") || undefined,
    };
}

export default function AllReviews() {
    const [searchParams, setSearchParams] = useSearchParams();
    const hasFilters = REVIEW_FILTER_KEYS.some((key) => searchParams.has(key));
    const filters = getAdminReviewFilters(searchParams);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!hasFilters) {
            setSearchParams({
                fromDate: todayStartISO(),
                toDate: todayEndISO(),
            }, {replace: true});
        }
    }, [hasFilters, setSearchParams]);

    const {data: reviews = [], isPending, isError, error} = useQuery({
        queryKey: ["adminReviews", searchParams.toString()],
        queryFn: () => getReviewsForAdmin(filters),
        enabled: hasFilters,
    });

    function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const idVal = String(formData.get("id") ?? "").trim();
        const reviewerIdVal = String(formData.get("reviewerId") ?? "").trim();
        const professionalIdVal = String(formData.get("professionalId") ?? "").trim();
        const fromDateVal = String(formData.get("fromDate") ?? "").trim();
        const toDateVal = String(formData.get("toDate") ?? "").trim();

        const params = new URLSearchParams();
        if (idVal) params.set("id", idVal);
        if (reviewerIdVal) params.set("reviewerId", reviewerIdVal);
        if (professionalIdVal) params.set("professionalId", professionalIdVal);
        if (fromDateVal) params.set("fromDate", `${fromDateVal}T00:00:00.000Z`);
        if (toDateVal) params.set("toDate", `${toDateVal}T23:59:59.999Z`);

        setSearchParams(params, {replace: true});
    }

    function handleReset() {
        setSearchParams({
            fromDate: todayStartISO(),
            toDate: todayEndISO(),
        }, {replace: true});
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
                        All Reviews
                    </Heading>
                    <Text color="gray.700" fontSize="md">
                        {reviews.length > 0 ? `${reviews.length} review${reviews.length !== 1 ? "s" : ""} found` : "Manage reviews"}
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
                            templateColumns={{base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)"}}
                            gap={4}
                            mb={4}
                        >
                            <Field.Root>
                                <Field.Label>ID</Field.Label>
                                <Input
                                    name="id"
                                    type="number"
                                    min={0}
                                    defaultValue={searchParams.get("id") || ""}
                                    placeholder="Review ID"
                                    bg="white"
                                />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Reviewer ID</Field.Label>
                                <Input
                                    name="reviewerId"
                                    type="number"
                                    min={0}
                                    defaultValue={searchParams.get("reviewerId") || ""}
                                    placeholder="Reviewer ID"
                                    bg="white"
                                />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Professional ID</Field.Label>
                                <Input
                                    name="professionalId"
                                    type="number"
                                    min={0}
                                    defaultValue={searchParams.get("professionalId") || ""}
                                    placeholder="Professional ID"
                                    bg="white"
                                />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>From Date</Field.Label>
                                <Input
                                    name="fromDate"
                                    type="date"
                                    defaultValue={toDateInputValue(searchParams.get("fromDate"))}
                                    bg="white"
                                />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>To Date</Field.Label>
                                <Input
                                    name="toDate"
                                    type="date"
                                    defaultValue={toDateInputValue(searchParams.get("toDate"))}
                                    bg="white"
                                />
                            </Field.Root>
                        </Grid>
                        <HStack gap={3}>
                            <Button type="submit" colorPalette="blue" loading={isPending}>Search</Button>
                            <Button type="button" variant="outline" onClick={handleReset}>Reset</Button>
                        </HStack>
                    </form>
                </Box>

                {isError && <ErrorDisplay message={error.message} />}

                {!hasFilters || isPending ? (
                    <FullPageLoader />
                ) : reviews.length === 0 ? (
                    <Text color="gray.500" fontSize="md" textAlign="center">
                        No reviews found matching the given criteria.
                    </Text>
                ) : (
                    <Grid templateColumns={{base: "1fr", sm: "repeat(2, 1fr)"}} gap={4}>
                        {reviews.map((review: PrivateReview) => (
                            <GridItem key={review.id}>
                                <Card.Root shadow="sm" h="full" display="flex" flexDirection="column">
                                    <Card.Header pb={2}>
                                        <VStack align="start" gap={2} w="full">
                                            <HStack justify="space-between" w="full">
                                                <VStack align="start" gap={0}>
                                                    <Text fontWeight="semibold" color="gray.800" fontSize="md">
                                                        {review.professional.name}
                                                    </Text>
                                                    <Text fontSize="sm" color="blue.400" fontFamily="mono">
                                                        {review.professional.professionalType.title}, {review.professional.city.name}
                                                    </Text>
                                                    <Text fontSize="xs" color="gray.500">Professional ID: {review.professional.id}</Text>
                                                </VStack>
                                                <HStack gap={1}>
                                                    <Text fontSize="xs" color="gray.500">ID: {review.id}</Text>
                                                    <GenericDialog
                                                        component={({onClose}) => (
                                                            <DeleteReviewConfirmation
                                                                id={review.id}
                                                                professionalId={review.professional.id}
                                                                onClose={onClose}
                                                                afterSuccess={() => queryClient.invalidateQueries({queryKey: ["adminReviews", searchParams.toString()]})}
                                                            />
                                                        )}
                                                        title="Delete this review?"
                                                        buttonText=""
                                                        size={"sm" as never}
                                                        icon={<FiTrash2/>}
                                                        variant="ghost"
                                                        colorPalette="red"
                                                        buttonSize="sm"
                                                    />
                                                </HStack>
                                            </HStack>
                                            <VStack align="start" gap={1} fontSize="xs" color="gray.500">
                                                <Text>Reviewer ID: {review.reviewer.id}</Text>
                                                <Text>Reviewer Email: {review.reviewer.email}</Text>
                                                <Text>Updated: {new Date(review.updatedAt).toLocaleDateString("en-IN", {
                                                    year: "numeric", month: "short", day: "numeric"
                                                })}</Text>
                                            </VStack>
                                            <RatingGroup.Root readOnly allowHalf defaultValue={review.rating} count={5} size="sm">
                                                <RatingGroup.HiddenInput />
                                                <RatingGroup.Control />
                                            </RatingGroup.Root>
                                            <Text fontSize="xs" color="gray.500">
                                                {new Date(review.createdAt).toLocaleDateString("en-IN", {
                                                    year: "numeric", month: "short", day: "numeric"
                                                })}
                                            </Text>
                                        </VStack>
                                    </Card.Header>

                                    <Card.Body pt={0}>
                                        <VStack align="start" gap={2}>
                                            <HStack gap={2} fontSize="sm">
                                                <Box color="blue.400"><FaPhone size={13} /></Box>
                                                <Text color="gray.700">{review.contactNumber}</Text>
                                            </HStack>
                                            <HStack gap={2} fontSize="sm">
                                                <Box color="blue.400"><HiOfficeBuilding size={15} /></Box>
                                                <Text color="gray.700">{review.address}</Text>
                                            </HStack>
                                            <Badge
                                                colorPalette={review.doesOnlineConsultations ? "green" : "gray"}
                                                variant="subtle"
                                                size="sm"
                                                gap={1}
                                            >
                                                <MdComputer />
                                                {review.doesOnlineConsultations ? "Online consultations available" : "No online consultations"}
                                            </Badge>

                                            <Separator />

                                            <HStack gap={4} fontSize="sm" flexWrap="wrap">
                                                <Flex align="center" gap={1} color="gray.700">
                                                    <Box color="blue.400"><FaRupeeSign size={12} /></Box>
                                                    <Text>{review.consultationFee} per consultation</Text>
                                                </Flex>
                                                {review.diagnosisFee > 0 && (
                                                    <Flex align="center" gap={1} color="gray.700">
                                                        <Box color="blue.400"><FaRupeeSign size={12} /></Box>
                                                        <Text>{review.diagnosisFee} diagnosis</Text>
                                                    </Flex>
                                                )}
                                            </HStack>

                                            <Separator />

                                            <Prose
                                                size="lg"
                                                color="gray.700"
                                                lineHeight="1.8"
                                                maxW="none"
                                                dangerouslySetInnerHTML={{__html: review.content}}
                                            />
                                        </VStack>
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
