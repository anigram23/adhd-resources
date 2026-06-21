import {useSearchParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {getTickets} from "@/api_service/ticket.ts";
import ErrorDisplay from "@/components/utils/ErrorDisplay.tsx";
import FullPageLoader from "@/components/utils/FullPageLoader.tsx";
import {Badge, Box, Card, Container, Flex, Grid, GridItem, Heading, HStack, Text, VStack} from "@chakra-ui/react";
import {useAuth} from "@/auth/useAuth.ts";
import ChooseTicketTypeStatus from "@/components/tickets/ChooseTicketTypeStatus.tsx";
import type {Ticket} from "@/utils/types.ts";
import GenericDialog from "@/components/utils/GenericDialog.tsx";
import DeleteTicketConfirmation from "@/components/tickets/DeleteTicketConfirmation.tsx";
import CreateTicketForm from "@/components/tickets/CreateTicketForm.tsx";
import {FiPlus, FiTrash2} from "react-icons/fi";

const STATUS_COLORS: Record<string, string> = {
    OPEN: "green",
    ONGOING: "blue",
    CLOSED: "gray",
};

export default function MyTickets() {
    const [searchParams] = useSearchParams();
    const {user} = useAuth();

    const status = searchParams.get("status");

    const {isPending, isError, data, error} = useQuery({
        queryFn: () => getTickets(user?.id, status),
        queryKey: ["tickets", user?.id, status],
        enabled: !!user?.id && !!status,
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
                        My Tickets
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
                    <Flex justify="space-between" align="flex-end" flexWrap="wrap" gap={4}>
                        <Box flex="1" minW="260px">
                            <ChooseTicketTypeStatus/>
                        </Box>
                        {user?.id && (
                            <GenericDialog
                                component={({onClose}) => (
                                    <CreateTicketForm reviewerId={user.id} onClose={onClose}/>
                                )}
                                title="Raise a Ticket"
                                buttonText="New Ticket"
                                size={"md" as never}
                                icon={<FiPlus/>}
                            />
                        )}
                    </Flex>

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
                                                <Text color="gray.700" fontSize="sm" lineHeight="1.8">
                                                    {ticket.content}
                                                </Text>
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
