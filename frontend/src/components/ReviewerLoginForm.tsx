import {Button, Card, Center, Field, FieldRequiredIndicator, Input, Stack, Text} from "@chakra-ui/react";
import {useNavigate} from "react-router";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import * as React from "react";
import {login} from "@/api_service/reviewer.ts";

export default function ReviewerLoginForm() {
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

            navigate("/");
        }
    })

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        mutation.mutate(form);
    }

    return (
        <Center minH={{smDown: "auto", sm: "auto", lg: "50vh"}} px={{smDown: 4, sm: 0}} pt={{smDown: 4, sm: 8, lg: 4}}>
            <form style={{width: "100%"}} onSubmit={handleSubmit}>
                <Center>
                    <Card.Root w={{smDown: "100%", sm: "80%", lg: "70%"}}>
                        <Card.Header>
                            <Card.Title fontSize={{smDown: "lg", sm: "2xl"}}>Login or Register to Your Account</Card.Title>
                        </Card.Header>

                        <Card.Body>
                            <Stack gap={4}>
                                <Field.Root required>
                                    <Field.Label>
                                        Email ID
                                        <FieldRequiredIndicator />
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
                                        <FieldRequiredIndicator />
                                    </Field.Label>
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