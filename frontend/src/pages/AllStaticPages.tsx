import {useQuery} from "@tanstack/react-query";
import {getAllStaticPages} from "@/api_service/staticPages.ts";
import FullPageLoader from "@/components/FullPageLoader.tsx";
import type {Key, ReactNode} from "react";
import {Button, Card, Flex, Grid, GridItem, VStack} from "@chakra-ui/react";
import CreateStaticPageForm from "@/components/CreateStaticPageForm.tsx";
import GenericDialog from "@/components/GenericDialog.tsx";

export default function AllStaticPages() {
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
                    id: Key;
                    active: ReactNode;
                }) => (
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
                                    <Button colorPalette="green">{page.active ? "Deactivate" : "Activate"}</Button>
                                </Flex>

                            </Card.Body>

                        </Card.Root>
                    </GridItem>
                ))}
            </Grid>

            <GenericDialog component={CreateStaticPageForm} title={"Create New Page"} buttonText={"Create New Page"} size={"md"} />

        </VStack>
    )
}