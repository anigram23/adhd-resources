import { Button, HStack, VStack } from "@chakra-ui/react";

const links = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: "About", path: "/about" },
]

type LinksProps = {
    isMobile?: boolean;
};

export default function Links({ isMobile = true }: LinksProps) {
    const StackType = isMobile ? VStack : HStack;
    return (
        <StackType>
            {links.map(link => (
                <a key={link.name} href={link.path}>{link.name}</a>
            ))}

            <Button>Login</Button>
            <Button>Sign Up</Button>
        </StackType>
    )
}