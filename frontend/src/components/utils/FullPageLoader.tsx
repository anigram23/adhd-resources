import {Center, Flex, Spinner, Text, VStack} from "@chakra-ui/react";

export default function FullPageLoader({inline = false}: { inline?: boolean }) {
    const spinner = (
        <Spinner
            size="lg"
            borderWidth="4px"
            animationDuration="0.65s"
            colorPalette="blue"
        />
    );

    if (inline) return <Center py={12}>{spinner}</Center>;

    return (
        <Flex minH="100vh" align="center" justify="center" bg="blue.50">
            <VStack gap={4}>
                {spinner}
                <Text fontSize="lg" color="gray.700">Loading...</Text>
            </VStack>
        </Flex>
    )
}
