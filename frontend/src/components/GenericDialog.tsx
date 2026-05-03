import * as React from "react";
import {Button, CloseButton, Dialog, Portal} from "@chakra-ui/react";

export default function GenericDialog({component: Component, title, buttonText, size}: {component: React.FC, title: string, buttonText: string, size: never}) {
    return (
        <Dialog.Root size={size} placement="center" motionPreset="slide-in-bottom">
            <Dialog.Trigger asChild>
                <Button colorPalette="black">{buttonText}</Button>
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
                            <Component />
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}