import {Box, Button, Card, Container, Grid, GridItem, Text} from "@chakra-ui/react";
import {Link} from "react-router";
import PageHeader from "@/components/utils/PageHeader.tsx";

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
            <PageHeader title="Admin Dashboard" subtitle="Manage content, tickets, and configuration for the ADHD Resources directory."/>

            <Container maxW="5xl" py={{base: 8, md: 12}} px={{base: 4, md: 8}}>
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
