import {Box, HStack, Text} from "@chakra-ui/react";
import {TbBrain} from "react-icons/tb";

export default function Logo() {
    return (
        <HStack gap={2} align="center" flexShrink={0}>
            <Box color="blue.500">
                <TbBrain size={24}/>
            </Box>
            <Text fontSize="lg" fontWeight="bold" color="blue.900" whiteSpace="nowrap">
                <a href="/">ADHD Resources</a>
            </Text>
        </HStack>
    );
}
