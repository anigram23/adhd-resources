import { Button, Flex, Input } from "@chakra-ui/react";
import { IoSearchOutline } from "react-icons/io5";

export default function SearchBar() {
    return (
        <form>
            <Flex align="center" gap={2} w={{base: "1/3", md: "auto"}}>
                <Input placeholder="Search" />
                <Button type="submit" variant="outline">
                    <IoSearchOutline size={20} />
                </Button>
            </Flex>
        </form>
    )
}