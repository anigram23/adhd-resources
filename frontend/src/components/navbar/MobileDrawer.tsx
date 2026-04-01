import { Button, Drawer, Portal } from "@chakra-ui/react";
import { IoIosMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import Logo from "./Logo";
import Links from "./Links";

export default function MobileDrawer() {
    const [open, setOpen] = useState(false);

    return (
        <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
            <Drawer.Trigger asChild>
                <Button variant="outline">
                    <IoIosMenu size={24} />
                </Button>
            </Drawer.Trigger>

            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content>

                        <Drawer.Header>
                            <Drawer.Title>
                                <Logo />
                            </Drawer.Title>
                        </Drawer.Header>

                        <Drawer.Body>
                            <Links isMobile={true} />
                        </Drawer.Body>

                        <Drawer.CloseTrigger asChild>
                            <Button variant="outline">
                                <IoCloseSharp size={24} />
                            </Button>
                        </Drawer.CloseTrigger>

                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>

    )
}