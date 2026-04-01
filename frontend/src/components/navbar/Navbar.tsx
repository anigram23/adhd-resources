import { Box, Flex } from "@chakra-ui/react";
import Logo from "./Logo";
import Links from "./Links";

export default function Navbar() {

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            gap={{base: 6, lg: 12}}
            py={3}
            maxW="full">
                <Logo />

                <Box display={{smDown: "block", md: "none"}}>
                    <Links isMobile={true} />
                </Box>

                <Box display={{smDown: "none", md: "block"}}>
                    <Links isMobile={false} />
                </Box>

        </Flex>
    )
}