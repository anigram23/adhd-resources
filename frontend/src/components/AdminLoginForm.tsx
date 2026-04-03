import { Button, Card, Center, Field, Input, Stack } from "@chakra-ui/react";

export default function AdminLoginForm() {
    return (
        <Center minH={{smDown: "auto", sm: "auto", lg: "50vh"}} px={{smDown: 4, sm: 0}} pt={{smDown: 4, sm: 8, lg: 0}}>
            <form style={{width: "100%"}}>
                <Center>
                    <Card.Root w={{smDown: "100%", sm: "80%", lg: "70%"}}>
                        <Card.Header>
                            <Card.Title fontSize={{smDown: "lg", sm: "2xl"}}>Admin Login</Card.Title>

                            <Card.Description>Please use the credentials that were given to you by the administrator. If you have forgotten them, contact the administrator.</Card.Description>
                        </Card.Header>

                        <Card.Body>
                            <Stack gap={6}>
                                <Field.Root>
                                    <Field.Label>Email ID</Field.Label>
                                    <Input type="email" placeholder="Enter your email ID" />
                                </Field.Root>

                                <Field.Root>
                                    <Field.Label>Password</Field.Label>
                                    <Input type="password" placeholder="Enter your password" />
                                </Field.Root>

                                <Button type="submit" colorPalette="green" width="30%">Login</Button>
                            </Stack>
                        </Card.Body>
                    </Card.Root>
                </Center>
            </form>
        </Center>
    )
}