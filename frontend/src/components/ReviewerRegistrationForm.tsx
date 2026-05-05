import {Box, Button, Card, Center, Field, FieldRequiredIndicator, HStack, Input, Stack, Text} from "@chakra-ui/react";
import {useState} from "react";
import * as React from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {register} from "@/api_service/reviewer.ts";
import {useNavigate} from "react-router";
import {FiAlertCircle, FiUserPlus} from "react-icons/fi";

export default function ReviewerRegistrationForm() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
    const [passwordsNotMatching, setPasswordsNotMatching] = useState(false);

    const mutation = useMutation({
        mutationFn: register,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            navigate("/");
        },
    });

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setPasswordsNotMatching(false);

        if (form.password !== form.confirmPassword) {
            setPasswordsNotMatching(true);
            return;
        }

        mutation.mutate(form);
    };

    return (
        <Center bg="blue.50" minH="80vh" px={4}>
            <form style={{width: "100%", maxWidth: "420px"}} onSubmit={handleSubmit}>
                <Card.Root shadow="md">
                    <Card.Header pb={2}>
                        <HStack gap={2} mb={1}>
                            <Box color="blue.400">
                                <FiUserPlus size={20}/>
                            </Box>
                            <Card.Title fontSize="2xl" fontWeight="bold" color="blue.900">
                                Create an Account
                            </Card.Title>
                        </HStack>
                    </Card.Header>

                    <Card.Body>
                        <Stack gap={5}>
                            <Field.Root required>
                                <Field.Label>
                                    Email ID
                                    <FieldRequiredIndicator/>
                                </Field.Label>
                                <Input
                                    type="email"
                                    placeholder="Enter your email ID"
                                    value={form.email}
                                    onChange={(e) => setForm({...form, email: e.target.value})}
                                />
                            </Field.Root>

                            <Field.Root required>
                                <Field.Label>
                                    Password
                                    <FieldRequiredIndicator/>
                                </Field.Label>
                                <Input
                                    type="password"
                                    placeholder="Enter your password"
                                    onChange={(e) => setForm({...form, password: e.target.value})}
                                />
                            </Field.Root>

                            <Field.Root required>
                                <Field.Label>
                                    Confirm Password
                                    <FieldRequiredIndicator/>
                                </Field.Label>
                                <Input
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={form.confirmPassword}
                                    onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
                                />
                            </Field.Root>

                            {mutation.isError && (
                                <HStack gap={2} color="red.500">
                                    <FiAlertCircle size={16}/>
                                    <Text fontSize="sm">{mutation.error.message}</Text>
                                </HStack>
                            )}

                            {passwordsNotMatching && (
                                <HStack gap={2} color="red.500">
                                    <FiAlertCircle size={16}/>
                                    <Text fontSize="sm">Your passwords do not match</Text>
                                </HStack>
                            )}

                            <Button type="submit" colorPalette="blue" w="full" disabled={mutation.isPending}>
                                {mutation.isPending ? "Registering..." : "Register"}
                            </Button>
                        </Stack>
                    </Card.Body>
                </Card.Root>
            </form>
        </Center>
    );
}
