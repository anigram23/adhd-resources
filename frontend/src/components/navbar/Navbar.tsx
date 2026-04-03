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
            gap={{base: 5, lg: 12}}
            py={3}
            maxW="full"
            mx="auto"
            px={{base: 6, lg: 12}}
            shadow="xs"
        >
                <Logo />

                <Box display={{smDown: "block", sm: "none"}}>
                    <MobileDrawer />
                </Box>

                <Box display={{smDown: "none", sm: "block"}}>
                    <Links isMobile={false} />
                </Box>
        </Flex>
    )
}