import {Box, Button, Field, FieldRequiredIndicator, HStack, Input, Stack, Tabs, Text} from "@chakra-ui/react";
import {useState} from "react";
import * as React from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {login, register} from "@/api_service/reviewer.ts";
import {useNavigate} from "react-router";
import {FiAlertCircle} from "react-icons/fi";

function LoginForm({prev}: { prev: string }) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [form, setForm] = useState({email: "", password: ""});

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["currentUser"]});
            navigate(prev);
        },
    });

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        mutation.mutate(form);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Field.Root required>
                    <Field.Label color="gray.700">
                        Email ID <FieldRequiredIndicator />
                    </Field.Label>
                    <Input
                        type="email"
                        placeholder="Enter your email ID"
                        value={form.email}
                        onChange={(e) => setForm({...form, email: e.target.value})}
                    />
                </Field.Root>

                <Field.Root required>
                    <Field.Label color="gray.700">
                        Password <FieldRequiredIndicator />
                    </Field.Label>
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={(e) => setForm({...form, password: e.target.value})}
                    />
                </Field.Root>

                {mutation.isError && (
                    <HStack gap={2} color="red.500">
                        <FiAlertCircle size={16} />
                        <Text fontSize="sm">{mutation.error.message}</Text>
                    </HStack>
                )}

                <Button type="submit" colorPalette="blue" w="full" disabled={mutation.isPending}>
                    {mutation.isPending ? "Logging in..." : "Login"}
                </Button>
            </Stack>
        </form>
    );
}

function RegisterForm({prev}: { prev: string }) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [form, setForm] = useState({email: "", password: "", confirmPassword: ""});
    const [passwordsNotMatching, setPasswordsNotMatching] = useState(false);

    const mutation = useMutation({
        mutationFn: register,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["currentUser"]});
            navigate(prev);
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
        <form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Field.Root required>
                    <Field.Label color="gray.700">
                        Email ID <FieldRequiredIndicator />
                    </Field.Label>
                    <Input
                        type="email"
                        placeholder="Enter your email ID"
                        value={form.email}
                        onChange={(e) => setForm({...form, email: e.target.value})}
                    />
                </Field.Root>

                <Field.Root required>
                    <Field.Label color="gray.700">
                        Password <FieldRequiredIndicator />
                    </Field.Label>
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => setForm({...form, password: e.target.value})}
                    />
                </Field.Root>

                <Field.Root required>
                    <Field.Label color="gray.700">
                        Confirm Password <FieldRequiredIndicator />
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
                        <FiAlertCircle size={16} />
                        <Text fontSize="sm">{mutation.error.message}</Text>
                    </HStack>
                )}

                {passwordsNotMatching && (
                    <HStack gap={2} color="red.500">
                        <FiAlertCircle size={16} />
                        <Text fontSize="sm">Your passwords do not match</Text>
                    </HStack>
                )}

                <Button type="submit" colorPalette="blue" w="full" disabled={mutation.isPending}>
                    {mutation.isPending ? "Registering..." : "Register"}
                </Button>
            </Stack>
        </form>
    );
}

export default function LoginOrRegister({calledFrom}: { calledFrom: string }) {
    return (
        <Box>
            <Text color="gray.600" fontSize="sm" lineHeight="1.7" mb={5}>
                Log in to your existing account, or create a new one to continue.
            </Text>

            <Tabs.Root defaultValue="login" variant="line">
                <Tabs.List mb={5}>
                    <Tabs.Trigger value="login">Login</Tabs.Trigger>
                    <Tabs.Trigger value="register">Create Account</Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="login">
                    <LoginForm prev={calledFrom} />
                </Tabs.Content>

                <Tabs.Content value="register">
                    <RegisterForm prev={calledFrom} />
                </Tabs.Content>
            </Tabs.Root>
        </Box>
    );
}
