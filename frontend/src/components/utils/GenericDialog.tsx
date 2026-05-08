import * as React from "react";
import {useState} from "react";
import {Button, CloseButton, Dialog, Portal} from "@chakra-ui/react";

export default function GenericDialog({
    component: Component,
    title,
    buttonText,
    size,
    colorPalette = "blue",
    variant,
    buttonSize,
    icon,
}: {
    component: React.FC<{onClose?: () => void}>,
    title: string,
    buttonText: string,
    size: never,
    colorPalette?: string,
    variant?: string,
    buttonSize?: string,
    icon?: React.ReactNode,
}) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog.Root size={size} placement="center" motionPreset="slide-in-bottom" open={open} onOpenChange={(e) => setOpen(e.open)}>
            <Dialog.Trigger asChild>
                <Button
                    colorPalette={colorPalette as never}
                    variant={variant as never}
                    size={buttonSize as never}
                >
                    {icon}{buttonText}
                </Button>
            </Dialog.Trigger>

            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>{title}</Dialog.Title>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Header>

                        <Dialog.Body>
                            <Component onClose={() => setOpen(false)} />
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}
