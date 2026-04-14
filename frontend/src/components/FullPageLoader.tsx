import {Flex, Heading, Spinner, VStack, Text } from "@chakra-ui/react";

export default function FullPageLoader() {
    return (
        <Flex
            minH="100vh"
            align="center"
            justify="center"
        >
            <VStack gap={4}>
                <Heading size="md">ADHD Resources</Heading>

                <Spinner size="lg" borderWidth="4px" animationDuration="0.65s" />

                <Text fontSize="lg">
                    Loading...
                </Text>
            </VStack>
        </Flex>
    )
}