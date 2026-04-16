import { Button, HStack, VStack } from "@chakra-ui/react";
import {useAuth} from "@/auth/AuthContext.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {adminLogout} from "@/api_service/admin.ts";
import {useNavigate} from "react-router";
import {reviewerLogout} from "@/api_service/reviewer.ts";

const links = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: "About", path: "/about" },
]

type LinksProps = {
    isMobile?: boolean;
};

export default function Links({ isMobile = true }: LinksProps) {
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const StackType = isMobile ? VStack : HStack;


    const handleLogout = () => {
        // @ts-ignore
        const role = user?.role;

        if (role === "ADMIN") {
            adminLogoutMutation.mutate();
        } else if (role === "REVIEWER") {
            reviewerLogoutMutation.mutate();
        }
    }

    const adminLogoutMutation = useMutation({
        mutationFn: adminLogout,
        onSuccess: () => {
            queryClient.setQueryData(["currentUser"], null);
            // queryClient.removeQueries({ queryKey: ["currentUser"] });
            navigate("/admin/login");
        }
    });

    const reviewerLogoutMutation = useMutation({
        mutationFn: reviewerLogout,
        onSuccess: () => {
            queryClient.setQueryData(["currentUser"], null);
            navigate("/");
        }
    })

    return (
        <StackType gap={isMobile ? 4 : 8} align={isMobile ? "start" : "center"}>
            {links.map(link => (
                <a key={link.name} href={link.path}>{link.name}</a>
            ))}

            {isAuthenticated ? (
                <Button variant="outline" onClick={handleLogout}>Logout</Button>
            ): (
                <>
                    <Button variant="outline"><a href="/login">Login</a></Button>
                    <Button variant="outline"><a href="/register">Register</a></Button>
                </>
            )}

        </StackType>
    )
}