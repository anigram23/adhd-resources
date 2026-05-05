import {Box, Flex} from "@chakra-ui/react";
import Logo from "./Logo";
import Links from "./Links";
import MobileDrawer from "./MobileDrawer";
import SearchBar from "./SearchBar";

export default function Navbar() {
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            gap={6}
            py={3}
            px={{base: 4, lg: 10}}
            bg="white"
            borderBottom="1px solid"
            borderColor="blue.100"
            position="sticky"
            top={0}
            zIndex={100}
        >
            <Logo/>

            <Box display={{smDown: "none", sm: "flex"}} flex={1} maxW="480px">
                <SearchBar/>
            </Box>

            <Box display={{smDown: "none", sm: "block"}}>
                <Links isMobile={false}/>
            </Box>

            <Box display={{smDown: "block", sm: "none"}}>
                <MobileDrawer/>
            </Box>
        </Flex>
    );
}
