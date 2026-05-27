import {Flex, Spinner, Text, VStack} from "@chakra-ui/react";

export default function FullPageLoader() {
    return (
        <Flex minH="100vh" align="center" justify="center" bg="blue.50">
            <VStack gap={4}>
                <Spinner
                    size="lg"
                    borderWidth="4px"
                    animationDuration="0.65s"
                    colorPalette="blue"
                />
                <Text fontSize="lg" color="gray.700">Loading...</Text>
            </VStack>
        </Flex>
    )
}
