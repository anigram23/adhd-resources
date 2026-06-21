import {Box, HStack, Text} from "@chakra-ui/react";
import {TbBrain} from "react-icons/tb";
import {useAuth} from "@/auth/useAuth.ts";

export default function Logo() {
    const {user} = useAuth();
    return (
        <HStack gap={2} align="center" flexShrink={0}>
            <Box color="blue.500">
                <TbBrain size={24}/>
            </Box>
            <Text fontSize="lg" fontWeight="bold" color="blue.900" whiteSpace="nowrap">
                <a href={user?.role === "ADMIN" ? "/admin" : "/"}>ADHD Resources</a>
            </Text>
        </HStack>
    );
}
