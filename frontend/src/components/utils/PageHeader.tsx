import {Box, Container, Heading, Text} from "@chakra-ui/react";
import type {ReactNode} from "react";

export default function PageHeader({title, subtitle, maxW = "5xl", children}: {
    title: ReactNode,
    subtitle?: ReactNode,
    maxW?: "3xl" | "5xl",
    children?: ReactNode,
}) {
    return (
        <Box bg="blue.50" py={{base: 10, md: 14}} borderBottom="1px solid" borderColor="blue.100">
            <Container maxW={maxW} px={{base: 4, md: 8}}>
                <Heading
                    as="h1"
                    fontSize={{base: "3xl", md: "5xl"}}
                    fontWeight="bold"
                    color="blue.900"
                    lineHeight="1.15"
                >
                    {title}
                </Heading>
                {subtitle && (
                    <Text color="gray.700" fontSize="md" lineHeight="1.8" mt={3}>
                        {subtitle}
                    </Text>
                )}
                {children && <Box mt={3}>{children}</Box>}
            </Container>
        </Box>
    );
}
