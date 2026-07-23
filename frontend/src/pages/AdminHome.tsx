import {Box, Button, Card, Container, Grid, GridItem, Heading, Text} from "@chakra-ui/react";
import {Link} from "react-router";

const sections = [
    {title: "Static Pages", description: "Manage informational pages shown to users.", to: "/admin/static-pages"},
    {title: "Tickets", description: "View and resolve tickets submitted by reviewers.", to: "/admin/tickets"},
    {title: "Ticket Types", description: "Configure the categories used for tickets.", to: "/admin/ticket-types"},
    {title: "Professional Types", description: "Manage the types of professionals listed in the directory.", to: "/admin/professional-types"},
    {title: "Reviews", description: "Browse and moderate reviews left by reviewers.", to: "/admin/reviews"},
    {title: "Reviewers", description: "Search and manage reviewer accounts.", to: "/admin/reviewers"},
];

export default function AdminHome() {
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
                        Admin Dashboard
                    </Heading>
                    <Text color="gray.700" fontSize="md" lineHeight="1.8" mt={3}>
                        Manage content, tickets, and configuration for the ADHD Resources directory.
                    </Text>
                </Container>
            </Box>

            <Container maxW="5xl" py={12} px={{base: 4, md: 8}}>
                <Grid templateColumns={{base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)"}} gap={4}>
                    {sections.map((section) => (
                        <GridItem key={section.to}>
                            <Card.Root shadow="sm" h="full" display="flex" flexDirection="column">
                                <Card.Header flex={1}>
                                    <Card.Title color="gray.800" fontWeight="semibold">{section.title}</Card.Title>
                                    <Text color="gray.700" fontSize="sm" mt={1}>{section.description}</Text>
                                </Card.Header>
                                <Card.Footer pt={2}>
                                    <Button size="sm" colorPalette="blue" variant="subtle" asChild>
                                        <Link to={section.to}>Go</Link>
                                    </Button>
                                </Card.Footer>
                            </Card.Root>
                        </GridItem>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
