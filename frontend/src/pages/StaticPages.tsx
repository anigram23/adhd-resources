import {useQuery} from "@tanstack/react-query";
import {getAllStaticPages} from "@/api_service/staticPages.ts";
import FullPageLoader from "@/components/FullPageLoader.tsx";
import type {Key, ReactNode} from "react";
import {Button, Card, CloseButton, Dialog, Flex, Grid, GridItem, Portal, VStack} from "@chakra-ui/react";
import CreateStaticPageForm from "@/components/CreateStaticPageForm.tsx";

export default function StaticPages() {
    const {isPending, isError, data, error} = useQuery({
        queryKey: ["staticPages"],
        queryFn: getAllStaticPages
    });

    if (isPending) {
        return <FullPageLoader/>
    }

    if (isError) {
        return <p>Error: {error.message}</p>
    }

    console.log(data);

    return (
        <VStack gap={4} px={{smDown: 4, sm: 0}} pt={{smDown: 4, sm: 8, lg: 4}}>
            <Grid templateColumns={{smDown: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)"}} gap={2} w="70%">
                {data.map((page: {
                    title: ReactNode;
                    slug: ReactNode;
                    id: Key; }) => (
                    <GridItem key={page.id as Key}>
                        <Card.Root h="full">
                            <Card.Header minH="55%">
                                <Card.Title>{page.title}</Card.Title>
                                <Card.Description>/{page.slug}</Card.Description>
                            </Card.Header>

                            <Card.Body>
                                <Flex w="full" gap={2}>
                                    <Button colorPalette="blue">Edit</Button>
                                    <Button colorPalette="red">Delete</Button>
                                </Flex>

                            </Card.Body>

                        </Card.Root>
                    </GridItem>
                ))}
            </Grid>

            <Dialog.Root size="md" placement="center" motionPreset="slide-in-bottom">
                <Dialog.Trigger asChild>
                    <Button colorPalette="green">Create new page</Button>
                </Dialog.Trigger>

                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Create New Page</Dialog.Title>
                                <Dialog.CloseTrigger asChild>
                                    <CloseButton size="sm" />
                                </Dialog.CloseTrigger>
                            </Dialog.Header>

                            <Dialog.Body>
                                <CreateStaticPageForm />
                            </Dialog.Body>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>

        </VStack>
    )
}