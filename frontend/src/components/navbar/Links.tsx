import {Avatar, Box, Button, HStack, VStack} from "@chakra-ui/react";
import {useAuth} from "@/auth/useAuth.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {adminLogout} from "@/api_service/admin.ts";
import {Link as RouterLink, useNavigate} from "react-router";
import {reviewerLogout} from "@/api_service/reviewer.ts";

const links = [
    {name: "Reviews", path: "/professionals"},
    {name: "About", path: "/about"},
    {name: "Talk To Us", path: "/my-tickets"},
];

const adminLinks = [
    {name: "Pages", path: "/admin/static-pages"},
    {name: "Professional Types", path: "/admin/professional-types"},
    {name: "Reviews", path: "/admin/reviews"}
]

type LinksProps = { isMobile?: boolean };

export default function Links({isMobile = true}: LinksProps) {
    const {isAuthenticated, user} = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const StackType = isMobile ? VStack : HStack;

    const handleLogout = () => {
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
            { user?.role === "ADMIN" ? adminLinks.map((link) => (
                <Box
                    key={link.name}
                    asChild
                    fontSize="sm"
                    fontWeight="medium"
                    color="gray.600"
                    _hover={{color: "blue.600"}}
                    transition="color 0.15s"
                >
                    <RouterLink to={link.path}>{link.name}</RouterLink>
                </Box>
            )) : links.map((link) => (
                <Box
                    key={link.name}
                    asChild
                    fontSize="sm"
                    fontWeight="medium"
                    color="gray.600"
                    _hover={{color: "blue.600"}}
                    transition="color 0.15s"
                >
                    <RouterLink to={link.path}>{link.name}</RouterLink>
                </Box>
            ))}

            {isAuthenticated ? (
                <HStack gap={2}>
                    {user!.role === "REVIEWER" && (
                        <RouterLink to="/profile">
                            <Avatar.Root variant="outline">
                                <Avatar.Fallback />
                            </Avatar.Root>
                        </RouterLink>
                    )}

                    <Button size="sm" variant="outline" colorPalette="blue" onClick={handleLogout}>
                        Logout
                    </Button>
                </HStack>
            ) : (
                <HStack gap={2}>
                    <Button size="sm" variant="outline" colorPalette="blue" asChild>
                        <RouterLink to="/login">Login</RouterLink>
                    </Button>
                    <Button size="sm" colorPalette="blue" asChild>
                        <RouterLink to="/register">Register</RouterLink>
                    </Button>
                </HStack>
            )}
        </StackType>
    );
}
