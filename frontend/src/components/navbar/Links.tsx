import {Box, Button, HStack, VStack} from "@chakra-ui/react";
import {useAuth} from "@/auth/AuthContext.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {adminLogout} from "@/api_service/admin.ts";
import {useNavigate} from "react-router";
import {reviewerLogout} from "@/api_service/reviewer.ts";

const links = [
    {name: "Home", path: "/"},
    {name: "Resources", path: "/resources"},
    {name: "About", path: "/about"},
];

type LinksProps = { isMobile?: boolean };

export default function Links({isMobile = true}: LinksProps) {
    const {isAuthenticated, user} = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const StackType = isMobile ? VStack : HStack;

    const handleLogout = () => {
        // @ts-expect-error - role will definitely exist if user does
        const role = user?.role;
        if (role === "ADMIN") adminLogoutMutation.mutate();
        else if (role === "REVIEWER") reviewerLogoutMutation.mutate();
    };

    const adminLogoutMutation = useMutation({
        mutationFn: adminLogout,
        onSuccess: () => {
            queryClient.setQueryData(["currentUser"], null);
            navigate("/admin/login");
        },
    });

    const reviewerLogoutMutation = useMutation({
        mutationFn: reviewerLogout,
        onSuccess: () => {
            queryClient.setQueryData(["currentUser"], null);
            navigate("/");
        },
    });

    return (
        <StackType gap={isMobile ? 5 : 6} align={isMobile ? "start" : "center"}>
            {links.map(link => (
                <Box
                    key={link.name}
                    asChild
                    fontSize="sm"
                    fontWeight="medium"
                    color="gray.600"
                    _hover={{color: "blue.600"}}
                    transition="color 0.15s"
                >
                    <a href={link.path}>{link.name}</a>
                </Box>
            ))}

            {isAuthenticated ? (
                <Button size="sm" variant="outline" colorPalette="blue" onClick={handleLogout}>
                    Logout
                </Button>
            ) : (
                <HStack gap={2}>
                    <Button size="sm" variant="outline" colorPalette="blue" asChild>
                        <a href="/login">Login</a>
                    </Button>
                    <Button size="sm" colorPalette="blue" asChild>
                        <a href="/register">Register</a>
                    </Button>
                </HStack>
            )}
        </StackType>
    );
}
