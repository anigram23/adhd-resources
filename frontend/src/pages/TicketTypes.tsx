import {useQuery} from "@tanstack/react-query";
import {getAllTicketTypes} from "@/api_service/ticketType.ts";
import ErrorDisplay from "@/components/utils/ErrorDisplay.tsx";
import FullPageLoader from "@/components/utils/FullPageLoader.tsx";
import {Box, Card, Container, Flex, Grid, GridItem, Heading, HStack, VStack} from "@chakra-ui/react";
import type {TicketType} from "@/utils/types.ts";
import GenericDialog from "@/components/utils/GenericDialog.tsx";
import AddNewTicketTypeForm from "@/components/ticket_types/AddNewTicketTypeForm.tsx";
import EditTicketTypeForm from "@/components/ticket_types/EditTicketTypeForm.tsx";
import ConfirmDeleteTicketType from "@/components/ticket_types/ConfirmDeleteTicketType.tsx";
import {FiEdit2, FiPlus, FiTrash2} from "react-icons/fi";

export default function TicketTypes() {
    const { data, error, isError, isPending } = useQuery({
        queryKey: ["ticketTypes"],
        queryFn: getAllTicketTypes
    });

    if (isError) {
        return <ErrorDisplay message={error.message} />;
    }

    if (isPending) {
        return <FullPageLoader />;
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
                        Ticket Types
                    </Heading>
                </Container>
            </Box>

            <Container maxW="5xl" py={10} px={{base: 4, md: 8}}>
                <VStack gap={8} align="stretch">
                    <Grid
                        templateColumns={{base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)"}}
                        gap={4}
                    >
                        {data.map((type: TicketType) => (
                            <GridItem key={type.id}>
                                <Card.Root h="full" shadow="sm" display="flex" flexDirection="column">
                                    <Card.Header flex={1}>
                                        <Card.Title color="gray.800" fontWeight="semibold">
                                            {type.title}
                                        </Card.Title>
                                        <Card.Description color="blue.400" fontFamily="mono" fontSize="sm" mt={1}>
                                            #{type.id}
                                        </Card.Description>
                                    </Card.Header>

                                    <Card.Footer pt={2}>
                                        <HStack gap={2}>
                                            <GenericDialog
                                                component={({ onClose }) => <EditTicketTypeForm ticketType={type} onClose={onClose} />}
                                                title="Edit Ticket Type"
                                                buttonText="Edit"
                                                size={"md" as never}
                                                variant="subtle"
                                                buttonSize="sm"
                                                icon={<FiEdit2 />}
                                            />
                                            <GenericDialog
                                                component={({ onClose }) => <ConfirmDeleteTicketType id={type.id} onClose={onClose} />}
                                                title="Delete Ticket Type"
                                                buttonText="Delete"
                                                size={"md" as never}
                                                colorPalette="red"
                                                variant="subtle"
                                                buttonSize="sm"
                                                icon={<FiTrash2 />}
                                            />
                                        </HStack>
                                    </Card.Footer>
                                </Card.Root>
                            </GridItem>
                        ))}
                    </Grid>

                    <Flex justify="flex-start">
                        <GenericDialog
                            component={AddNewTicketTypeForm}
                            title="New Ticket Type"
                            buttonText="Add New Ticket Type"
                            size={"md" as never}
                            icon={<FiPlus />}
                        />
                    </Flex>
                </VStack>
            </Container>
        </Box>
    );
}
