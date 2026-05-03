import {useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {getStaticPageBySlug} from "@/api_service/staticPages.ts";
import FullPageLoader from "@/components/FullPageLoader.tsx";
import {Box, Center, Text} from "@chakra-ui/react";
import type {Key} from "react";

export default function StaticPage() {
    const { slug } = useParams();

    const {isPending, isError, data, error} = useQuery({
        queryFn: ({queryKey}) => getStaticPageBySlug(queryKey[1] as string),
        queryKey: ["staticPage", slug]
    });

    if (isPending) {
        return <FullPageLoader/>
    }

    if (isError) {
        return <p>Error: {error.message}</p>
    }

    console.log(data);

    return (
        <Box>
            <Center my={8}>
                <Text fontSize="5xl">{data.title}</Text>
            </Center>
            <Box mx="15%">
                {data.sections.map((section: {id: Key, title: string, orderIndex: number, sectionBlocks: []}) => (
                    <Box key={section.id} my={10}>
                        <Text fontSize="2xl">{section.title}</Text>
                        {section.sectionBlocks.map((block: {id: Key, content: string, orderIndex: number}) => (
                            <div key={block.id}>
                                <Text>{block.content}</Text>
                            </div>

                        ))}
                    </Box>
                ))}
            </Box>
        </Box>


    )
}