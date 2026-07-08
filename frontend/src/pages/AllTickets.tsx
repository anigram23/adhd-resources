import {useSearchParams, useNavigate} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {getTickets} from "@/api_service/ticket.ts";
import ErrorDisplay from "@/components/utils/ErrorDisplay.tsx";
import FullPageLoader from "@/components/utils/FullPageLoader.tsx";
import {
    Badge,
    Box,
    Button,
    Card,
    Container,
    Grid,
    GridItem,
    Heading,
    HStack,
    Separator,
    Text,
    VStack,
} from "@chakra-ui/react";
import type {Ticket} from "@/utils/types.ts";
import GenericDialog from "@/components/utils/GenericDialog.tsx";
import DeleteTicketConfirmation from "@/components/tickets/DeleteTicketConfirmation.tsx";
import EditTicketStatusForm from "@/components/tickets/EditTicketStatusForm.tsx";
import {FiEdit2, FiEye, FiMail, FiTag, FiTrash2} from "react-icons/fi";
import ReviewDetailsDialog from "@/components/reviews/ReviewDetailsDialog.tsx";

const STATUS_COLORS: Record<string, string> = {
    OPEN: "green",
    ONGOING: "blue",
    CLOSED: "gray",
};

const STATUSES = [
    {label: "Open", value: "OPEN", colorPalette: "green"},
    {label: "Ongoing", value: "ONGOING", colorPalette: "blue"},
    {label: "Closed", value: "CLOSED", colorPalette: "gray"},
];

export default function AllTickets() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const status = searchParams.get("status");

    const {isPending, isError, data, error} = useQuery({
        queryFn: () => getTickets(null, status),
        queryKey: ["tickets", status],
        enabled: !!status,
    });

    if (isError) {
        return <ErrorDisplay message={error.message}/>;
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
                        All Tickets
                    </Heading>
                    {status && (
                        <Text color="gray.600" fontSize="md">
                            Showing <strong>{status.toLowerCase()}</strong> tickets
                        </Text>
                    )}
                </Container>
            </Box>

            <Container maxW="5xl" py={10} px={{base: 4, md: 8}}>
                <VStack gap={8} align="stretch">
                    <VStack align="start" gap={2}>
                        <Text fontSize="sm" fontWeight="medium" color="gray.600">Filter by status</Text>
                        <HStack gap={2} flexWrap="wrap">
                            {STATUSES.map(({label, value, colorPalette}) => (
                                <Button
                                    key={value}
                                    size="sm"
                                    colorPalette={colorPalette}
                                    variant={status === value ? "solid" : "outline"}
                                    onClick={() => navigate({pathname: "/admin/tickets", search: `status=${value}`})}
                                >
                                    {label}
                                </Button>
                            ))}
                        </HStack>
                    </VStack>

                    {status && (
                        isPending ? (
                            <FullPageLoader/>
                        ) : data?.length === 0 ? (
                            <Box
                                p={8}
                                bg="blue.50"
                                borderRadius="md"
                                borderLeft="4px solid"
                                borderColor="blue.200"
                                textAlign="center"
                            >
                                <Text color="gray.600">No {status.toLowerCase()} tickets found.</Text>
                            </Box>
                        ) : (
                            <Grid templateColumns={{base: "1fr", md: "repeat(2, 1fr)"}} gap={4}>
                                {data?.map((ticket: Ticket) => (
                                    <GridItem key={ticket.id}>
                                        <Card.Root shadow="sm" h="full" display="flex" flexDirection="column">
                                            <Card.Header pb={2}>
                                                <HStack justify="space-between" align="start">
                                                    <VStack align="start" gap={1}>
                                                        <Text fontWeight="semibold" color="gray.800">
                                                            {ticket.ticketType.title}
                                                        </Text>
                                                        <Text color="blue.400" fontFamily="mono" fontSize="xs">
                                                            #{ticket.id}
                                                        </Text>
                                                    </VStack>
                                                    <HStack gap={2}>
                                                        <Badge
                                                            colorPalette={STATUS_COLORS[ticket.status]}
                                                            variant="subtle"
                                                            size="sm"
                                                        >
                                                            {ticket.status}
                                                        </Badge>
                                                        <GenericDialog
                                                            component={({onClose}) => (
                                                                <EditTicketStatusForm ticket={ticket} onClose={onClose}/>
                                                            )}
                                                            title="Update Ticket Status"
                                                            buttonText=""
                                                            size={"sm" as never}
                                                            icon={<FiEdit2/>}
                                                            variant="ghost"
                                                            colorPalette="blue"
                                                            buttonSize="sm"
                                                        />
                                                        {ticket.status === "OPEN" && (
                                                            <GenericDialog
                                                                component={({onClose}) => (
                                                                    <DeleteTicketConfirmation id={ticket.id} onClose={onClose}/>
                                                                )}
                                                                title="Delete this ticket?"
                                                                buttonText=""
                                                                size={"sm" as never}
                                                                icon={<FiTrash2/>}
                                                                variant="ghost"
                                                                colorPalette="red"
                                                                buttonSize="sm"
                                                            />
                                                        )}
                                                    </HStack>
                                                </HStack>
                                            </Card.Header>

                                            <Card.Body pt={0}>
                                                <VStack align="start" gap={3}>
                                                    <HStack gap={2} fontSize="sm">
                                                        <Box color="blue.400" flexShrink={0}>
                                                            <FiMail size={13}/>
                                                        </Box>
                                                        <Text color="gray.600">{ticket.reviewer.email}</Text>
                                                    </HStack>
                                                    <HStack gap={2} fontSize="sm">
                                                        <Box color="blue.400" flexShrink={0}>
                                                            <FiTag size={13}/>
                                                        </Box>
                                                        <Text color="gray.600">{ticket.ticketType.title}</Text>
                                                    </HStack>

                                                    <Separator/>

                                                    <Text color="gray.700" fontSize="sm" lineHeight="1.8">
                                                        {ticket.content}
                                                    </Text>

                                                    { ticket.review && (
                                                        <Box mt={4}>
                                                            <GenericDialog
                                                                component={() => <ReviewDetailsDialog review={ticket.review} />}
                                                                title="Review Information"
                                                                buttonText="See Review"
                                                                size={"xl" as never}
                                                                variant="outline"
                                                                buttonSize="sm"
                                                                icon={<FiEye/>}
                                                            />
                                                        </Box>
                                                    )}
                                                </VStack>
                                            </Card.Body>
                                        </Card.Root>
                                    </GridItem>
                                ))}
                            </Grid>
                        )
                    )}
                </VStack>
            </Container>
        </Box>
    );
}
