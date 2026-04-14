import { Button, HStack, VStack } from "@chakra-ui/react";
import {useAuth} from "@/auth/AuthContext.tsx";

const links = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: "About", path: "/about" },
]

type LinksProps = {
    isMobile?: boolean;
};

export default function Links({ isMobile = true }: LinksProps) {
    const { isAuthenticated } = useAuth();
    const StackType = isMobile ? VStack : HStack;
    return (
        <StackType gap={isMobile ? 4 : 8} align={isMobile ? "start" : "center"}>
            {links.map(link => (
                <a key={link.name} href={link.path}>{link.name}</a>
            ))}

            {isAuthenticated ? (
                <Button variant="outline">Logout</Button>
            ): (
                <>
                    <Button variant="outline" asChild><a href="/login">Login</a></Button><Button
                    variant="outline">Register</Button>
                </>
            )}

        </StackType>
    )
}