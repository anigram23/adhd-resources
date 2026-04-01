import { Flex, Text } from "@chakra-ui/react";

export default function Logo() {
    return (
        <Flex align="center" gap={2}>
            {/* <img src="./navbar_pic.svg" alt="Logo" width={60} height={60} /> */}
            <Text fontSize="xl" fontWeight="bold">ADHD Resources</Text>
        </Flex>
    )
}