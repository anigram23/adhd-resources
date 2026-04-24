import {useQuery} from "@tanstack/react-query";
import {getAllStaticPages} from "@/api_service/staticPages.ts";
import FullPageLoader from "@/components/FullPageLoader.tsx";
import type {Key, ReactNode} from "react";
import {Button, Card, Center, Grid, GridItem} from "@chakra-ui/react";

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

    return (
        <Center>
            <Grid templateColumns={{smDown: "1fr", sm: "repeat(3, 1fr)", lg: "repeat(4, 1fr)"}} gap={2} w="80%" px={{smDown: 4, sm: 0}} py={4}>
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
                                <Button>View</Button>
                            </Card.Body>

                        </Card.Root>
                    </GridItem>
                ))}
            </Grid>
        </Center>
    )
}