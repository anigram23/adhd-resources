import {Container, HStack, Text} from "@chakra-ui/react"
import {FiAlertCircle} from "react-icons/fi"

export default function ErrorDisplay({message}: { message: string }) {
    return (
        <Container maxW="3xl" py={20}>
            <HStack gap={3} color="red.500" justify="center">
                <FiAlertCircle size={22}/>
                <Text fontSize="lg">{message}</Text>
            </HStack>
        </Container>
    )
}
