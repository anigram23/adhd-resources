import {Box, HStack, Input} from "@chakra-ui/react";
import {FiSearch} from "react-icons/fi";

export default function SearchBar() {
    return (
        <form style={{width: "100%"}}>
            <HStack
                w="full"
                bg="blue.50"
                border="1px solid"
                borderColor="blue.100"
                borderRadius="md"
                px={3}
                py={1.5}
                gap={2}
                transition="all 0.15s"
                _focusWithin={{borderColor: "blue.400", bg: "white"}}
            >
                <Box color="blue.400" flexShrink={0}>
                    <FiSearch size={15}/>
                </Box>
                <Input
                    border="none"
                    bg="transparent"
                    _focus={{boxShadow: "none", outline: "none"}}
                    placeholder="Search resources..."
                    fontSize="sm"
                    color="gray.700"
                    _placeholder={{color: "gray.400"}}
                    px={0}
                />
            </HStack>
        </form>
    );
}
