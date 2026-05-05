import {Button, Drawer, Portal, VStack} from "@chakra-ui/react";
import {IoIosMenu} from "react-icons/io";
import {IoCloseSharp} from "react-icons/io5";
import {useState} from "react";
import Logo from "./Logo";
import Links from "./Links";
import SearchBar from "./SearchBar";

export default function MobileDrawer() {
    const [open, setOpen] = useState(false);

    return (
        <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
            <Drawer.Trigger asChild>
                <Button variant="ghost" size="sm" color="blue.700">
                    <IoIosMenu size={22}/>
                </Button>
            </Drawer.Trigger>

            <Portal>
                <Drawer.Backdrop/>
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header borderBottom="1px solid" borderColor="blue.100">
                            <Drawer.Title>
                                <Logo/>
                            </Drawer.Title>
                            <Drawer.CloseTrigger asChild position="absolute" top={3} right={3}>
                                <Button variant="ghost" size="sm" color="gray.500">
                                    <IoCloseSharp size={20}/>
                                </Button>
                            </Drawer.CloseTrigger>
                        </Drawer.Header>

                        <Drawer.Body pt={5}>
                            <VStack gap={6} align="stretch">
                                <SearchBar/>
                                <Links isMobile={true}/>
                            </VStack>
                        </Drawer.Body>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    );
}
