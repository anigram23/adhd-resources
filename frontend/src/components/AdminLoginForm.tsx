import {login} from "@/api_service/admin";
import {Box, Button, Card, Center, Field, HStack, Input, Stack, Text} from "@chakra-ui/react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {useNavigate} from "react-router";
import * as React from "react";
import {FiAlertCircle, FiLock} from "react-icons/fi";

export default function AdminLoginForm() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [form, setForm] = useState({ email: "", password: "" });

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            navigate("/admin");
        },
    });

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate(form);
    };

    return (
        <Center bg="blue.50" minH="80vh" px={4}>
            <form style={{width: "100%", maxWidth: "420px"}} onSubmit={handleSubmit}>
                <Card.Root shadow="md">
                    <Card.Header pb={2}>
                        <HStack gap={2} mb={1}>
                            <Box color="blue.400">
                                <FiLock size={20}/>
                            </Box>
                            <Card.Title fontSize="2xl" fontWeight="bold" color="blue.900">
                                Admin Login
                            </Card.Title>
                        </HStack>
                        <Card.Description color="gray.500">
                            If you have forgotten your credentials, contact the administrator.
                        </Card.Description>
                    </Card.Header>

                    <Card.Body>
                        <Stack gap={5}>
                            <Field.Root required>
                                <Field.Label>Email ID</Field.Label>
                                <Input
                                    type="email"
                                    placeholder="Enter your email ID"
                                    value={form.email}
                                    onChange={(e) => setForm({...form, email: e.target.value})}
                                />
                            </Field.Root>

                            <Field.Root required>
                                <Field.Label>Password</Field.Label>
                                <Input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={form.password}
                                    onChange={(e) => setForm({...form, password: e.target.value})}
                                />
                            </Field.Root>

                            {mutation.isError && (
                                <HStack gap={2} color="red.500">
                                    <FiAlertCircle size={16}/>
                                    <Text fontSize="sm">{mutation.error.message}</Text>
                                </HStack>
                            )}

                            <Button type="submit" colorPalette="blue" w="full" disabled={mutation.isPending}>
                                {mutation.isPending ? "Logging in..." : "Login"}
                            </Button>
                        </Stack>
                    </Card.Body>
                </Card.Root>
            </form>
        </Center>
    );
}
