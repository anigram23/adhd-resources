import { Button, Card, Center, Field, FieldRequiredIndicator, Input, Stack } from "@chakra-ui/react";

export default function ReviewerLoginForm() {
    return (
        <Center minH={{smDown: "auto", sm: "auto", lg: "50vh"}} px={{smDown: 4, sm: 0}} pt={{smDown: 4, sm: 8, lg: 0}}>
            <form style={{width: "100%"}}>
                <Center>
                    <Card.Root w={{smDown: "100%", sm: "80%", lg: "70%"}}>
                        <Card.Header>
                            <Card.Title fontSize={{smDown: "lg", sm: "2xl"}}>Login or Register to Leave Reviews</Card.Title>
                            <Card.Description>An OTP will be sent to your email ID to verify your identity.</Card.Description>
                        </Card.Header>

                        <Card.Body>
                            <Stack gap={4}>
                                <Field.Root required>
                                    <Field.Label>
                                        Email ID
                                        <FieldRequiredIndicator />
                                    </Field.Label>

                                    <Input type="email" placeholder="Enter your email ID" />
                                </Field.Root>

                                <Button type="submit" colorPalette="blue" width="30%">Send OTP</Button>
                            </Stack>
                        </Card.Body>
                    </Card.Root>
                </Center>
            </form>
        </Center>
    )
}