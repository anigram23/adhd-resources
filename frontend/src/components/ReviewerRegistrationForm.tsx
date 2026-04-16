import {Button, Card, Center, Field, FieldRequiredIndicator, Input, Stack, Text} from "@chakra-ui/react";
import {useState} from "react";
import * as React from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {register} from "@/api_service/reviewer.ts";
import {useNavigate} from "react-router";

export default function ReviewerRegistrationForm() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [passwordsNotMatching, setPasswordsNotMatching] = useState(false);

    const mutation = useMutation({
        mutationFn: register,
        onSuccess: async(data) => {
            console.log("Registered successfully", data);
            await queryClient.invalidateQueries({ queryKey: ["currentUser"]});
            navigate("/");
        }
    })

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setPasswordsNotMatching(false);

        if (form.password !== form.confirmPassword) {
            setPasswordsNotMatching(true);
            return;
        }

        setPasswordsNotMatching(false);
        mutation.mutate(form);

    }

    return (
        <Center minH={{smDown: "auto", sm: "auto", lg: "50vh"}} px={{smDown: 4, sm: 0}} pt={{smDown: 4, sm: 8, lg: 4}}>
            <form style={{width: "100%"}} onSubmit={handleSubmit}>
                <Center>
                    <Card.Root w={{smDown: "100%", sm: "80%", lg: "70%"}}>
                        <Card.Header>
                            <Card.Title fontSize={{smDown: "lg", sm: "2xl"}}>Register to Leave Reviews</Card.Title>
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
                                        onChange={(e) => setForm({...form, password: e.target.value})}
                                    />
                                </Field.Root>

                                <Field.Root required>
                                    <Field.Label>
                                        Confirm Password
                                        <FieldRequiredIndicator />
                                    </Field.Label>

                                    <Input
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={form.confirmPassword}
                                        onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
                                    />
                                </Field.Root>

                                {mutation.isError && (
                                    <Text color="red.500" fontSize="sm">
                                        {mutation.error.message}
                                    </Text>
                                )}

                                {passwordsNotMatching && (
                                    <Text color="red.500" fontSize="sm">Your passwords do not match</Text>
                                )}

                                <Button
                                    type="submit"
                                    colorPalette="green"
                                    width="30%"
                                    disabled={mutation.isPending}
                                >
                                    {mutation.isPending ? "Registering..." : "Register"}
                                </Button>
                            </Stack>
                        </Card.Body>
                    </Card.Root>
                </Center>
            </form>
        </Center>
    )
}