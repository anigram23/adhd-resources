import {login} from "@/api_service/admin";
import { Button, Card, Center, Field, Input, Stack, Text } from "@chakra-ui/react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import * as React from "react";

export default function AdminLoginForm() {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: async (data) => {
            console.log("Login successful:", data);
            await queryClient.invalidateQueries({ queryKey: ["currentUser"] });

            navigate("/admin");
        },
    });

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate(form);
    }

    return (
        <Center minH={{smDown: "auto", sm: "auto", lg: "50vh"}} px={{smDown: 4, sm: 0}} pt={{smDown: 4, sm: 8, lg: 4}}>
            <form style={{width: "100%"}} onSubmit={handleSubmit}>
                <Center>
                    <Card.Root w={{smDown: "100%", sm: "80%", lg: "70%"}}>
                        <Card.Header>
                            <Card.Title fontSize={{smDown: "lg", sm: "2xl"}}>Admin Login</Card.Title>
                            <Card.Description>If you have forgotten your credentials, contact the administrator.</Card.Description>
                        </Card.Header>

                        <Card.Body>
                            <Stack gap={6}>

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
                                    <Text color="red.500" fontSize="sm">
                                        {mutation.error.message}
                                    </Text>
                                )}

                                <Button type="submit" colorPalette="green" width="30%" disabled={mutation.isPending}>
                                    {mutation.isPending ? "Logging in..." : "Login"}
                                </Button>

                            </Stack>
                        </Card.Body>
                    </Card.Root>
                </Center>
            </form>
        </Center>
    )
}