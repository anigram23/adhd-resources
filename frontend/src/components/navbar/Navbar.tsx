import { Box, Flex } from "@chakra-ui/react";
import Logo from "./Logo";
import Links from "./Links";
import MobileDrawer from "./MobileDrawer";

export default function Navbar() {

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            gap={{base: 6, lg: 12}}
            py={3}
            maxW="full"
            mx="auto"
            px={{base: 6, lg: 12}}
            shadow="xs"
        >
                <Logo />

                <Box display={{smDown: "block", md: "none"}}>
                    <MobileDrawer />
                </Box>

                <Box display={{smDown: "none", md: "block"}}>
                    <Links isMobile={false} />
                </Box>
        </Flex>
    )
}