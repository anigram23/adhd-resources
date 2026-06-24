import {useAuth} from "@/auth/useAuth.ts";
import {Box, Button, Container, Heading, HStack, Text, VStack} from "@chakra-ui/react";
import GenericDialog from "@/components/utils/GenericDialog.tsx";
import ChangePasswordForm from "@/components/auth/ChangePasswordForm.tsx";
import {FiMail, FiLock, FiTag, FiStar} from "react-icons/fi";
import {Link} from "react-router";

export default function Profile() {
    const { user } = useAuth();

    return (
        <Box>
            <Box bg="blue.50" py={14} px={4} borderBottom="1px solid" borderColor="blue.100">
                <Container maxW="3xl">
                    <Heading
                        as="h1"
                        fontSize={{base: "3xl", md: "5xl"}}
                        fontWeight="bold"
                        color="blue.900"
                        lineHeight="1.15"
                    >
                        Your Profile
                    </Heading>
                    <Text color="gray.700" fontSize="md" lineHeight="1.8" mt={3}>
                        Manage your account details and security settings.
                    </Text>
                </Container>
            </Box>

            <Container maxW="3xl" py={12} px={{base: 4, md: 8}}>
                <VStack gap={8} align="stretch">
                    <Box>
                        <Heading as="h2" fontSize="2xl" fontWeight="semibold" color="gray.800" mb={4}>
                            Account Details
                        </Heading>
                        <Box
                            border="1px solid"
                            borderColor="gray.200"
                            borderRadius="lg"
                            px={6}
                            py={5}
                            bg="white"
                        >
                            <HStack gap={3}>
                                <Box color="blue.400">
                                    <FiMail size={20} />
                                </Box>
                                <VStack gap={0} align="start">
                                    <Text fontSize="xs" color="gray.500" fontWeight="medium" textTransform="uppercase" letterSpacing="wide">
                                        Email Address
                                    </Text>
                                    <Text color="gray.800" fontWeight="medium">
                                        {user!.email}
                                    </Text>
                                </VStack>
                            </HStack>
                        </Box>
                    </Box>

                    <Box>
                        <Heading as="h2" fontSize="2xl" fontWeight="semibold" color="gray.800" mb={4}>
                            Reviews
                        </Heading>
                        <Box
                            border="1px solid"
                            borderColor="gray.200"
                            borderRadius="lg"
                            px={6}
                            py={5}
                            bg="white"
                        >
                            <HStack justify="space-between" align="center">
                                <HStack gap={3}>
                                    <Box color="blue.400">
                                        <FiStar size={20} />
                                    </Box>
                                    <VStack gap={0} align="start">
                                        <Text color="gray.800" fontWeight="medium">My Reviews</Text>
                                        <Text fontSize="sm" color="gray.500">View and manage your reviews</Text>
                                    </VStack>
                                </HStack>
                                <Button size="sm" colorPalette="blue" variant="subtle" asChild>
                                    <Link to="/my-reviews">View</Link>
                                </Button>
                            </HStack>
                        </Box>
                    </Box>

                    <Box>
                        <Heading as="h2" fontSize="2xl" fontWeight="semibold" color="gray.800" mb={4}>
                            Tickets
                        </Heading>
                        <Box
                            border="1px solid"
                            borderColor="gray.200"
                            borderRadius="lg"
                            px={6}
                            py={5}
                            bg="white"
                        >
                            <HStack justify="space-between" align="center">
                                <HStack gap={3}>
                                    <Box color="blue.400">
                                        <FiTag size={20} />
                                    </Box>
                                    <VStack gap={0} align="start">
                                        <Text color="gray.800" fontWeight="medium">My Tickets</Text>
                                        <Text fontSize="sm" color="gray.500">View and manage your support tickets</Text>
                                    </VStack>
                                </HStack>
                                <Button size="sm" colorPalette="blue" variant="subtle" asChild>
                                    <Link to="/my-tickets">View</Link>
                                </Button>
                            </HStack>
                        </Box>
                    </Box>

                    <Box>
                        <Heading as="h2" fontSize="2xl" fontWeight="semibold" color="gray.800" mb={4}>
                            Security
                        </Heading>
                        <Box
                            border="1px solid"
                            borderColor="gray.200"
                            borderRadius="lg"
                            px={6}
                            py={5}
                            bg="white"
                        >
                            <HStack justify="space-between" align="center">
                                <HStack gap={3}>
                                    <Box color="blue.400">
                                        <FiLock size={20} />
                                    </Box>
                                    <VStack gap={0} align="start">
                                        <Text color="gray.800" fontWeight="medium">Password</Text>
                                        <Text fontSize="sm" color="gray.500">Update your login password</Text>
                                    </VStack>
                                </HStack>
                                <GenericDialog
                                    component={() => <ChangePasswordForm email={user!.email} />}
                                    title="Change Your Password"
                                    buttonText="Change"
                                    size={"md" as never}
                                />
                            </HStack>
                        </Box>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
}
