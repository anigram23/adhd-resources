import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {changePassword} from "@/api_service/reviewer.ts";
import {useNavigate} from "react-router";
import {Button, Field, FieldRequiredIndicator, HStack, Input, Stack, Text} from "@chakra-ui/react";
import * as React from "react";
import {FiAlertCircle} from "react-icons/fi";

export default function ChangePasswordForm({ email }: { email: string }) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: email,
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });

    const [passwordsNotMatching, setPasswordsNotMatching] = useState(false);

    const mutation = useMutation({
        mutationFn: changePassword,
        onSuccess: async() => {
            await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            navigate("/");
        }
    });

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        setPasswordsNotMatching(false);

        if (form.newPassword !== form.confirmNewPassword) {
            setPasswordsNotMatching(true);
            return;
        }

        mutation.mutate(form);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={5} pb={2}>
                <Field.Root required>
                    <Field.Label color="gray.700" fontWeight="medium">
                        Current Password <FieldRequiredIndicator />
                    </Field.Label>
                    <Input
                        type="password"
                        value={form.oldPassword}
                        placeholder="Enter your current password"
                        onChange={(e) =>
                            setForm({...form, oldPassword: e.target.value})}
                    />
                </Field.Root>

                <Field.Root required>
                    <Field.Label color="gray.700" fontWeight="medium">
                        New Password <FieldRequiredIndicator />
                    </Field.Label>
                    <Input
                        type="password"
                        value={form.newPassword}
                        placeholder="Enter your new password"
                        onChange={(e) =>
                            setForm({...form, newPassword: e.target.value})}
                    />
                </Field.Root>

                <Field.Root required>
                    <Field.Label color="gray.700" fontWeight="medium">
                        Confirm New Password <FieldRequiredIndicator />
                    </Field.Label>
                    <Input
                        type="password"
                        value={form.confirmNewPassword}
                        placeholder="Re-enter your new password"
                        onChange={(e) =>
                            setForm({...form, confirmNewPassword: e.target.value})}
                    />
                </Field.Root>

                {mutation.isError && (
                    <HStack gap={3} color="red.500">
                        <FiAlertCircle size={22} />
                        <Text fontSize="sm">{mutation.error.message}</Text>
                    </HStack>
                )}

                {passwordsNotMatching && (
                    <HStack gap={3} color="red.500">
                        <FiAlertCircle size={22} />
                        <Text fontSize="sm">Your passwords do not match</Text>
                    </HStack>
                )}

                <Button
                    type="submit"
                    colorPalette="blue"
                    w="full"
                    size="lg"
                    disabled={mutation.isPending}
                    mt={1}
                >
                    {mutation.isPending ? "Updating..." : "Update Password"}
                </Button>
            </Stack>
        </form>
    )
}
