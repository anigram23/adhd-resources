import {useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {getStaticPageBySlug} from "@/api_service/staticPages.ts";
import FullPageLoader from "../components/utils/FullPageLoader.tsx";
import {Box, Container, Heading, HStack, Separator, VStack} from "@chakra-ui/react";
import type {Key} from "react";
import {BsBookmark} from "react-icons/bs";
import ErrorDisplay from "@/components/utils/ErrorDisplay.tsx";
import {Prose} from "@/components/ui/prose.tsx";
import PageHeader from "@/components/utils/PageHeader.tsx";

type Section = { id: Key; title: string; content: string; orderIndex: number };

export default function StaticPage() {
    const { slug } = useParams();

    const {isPending, isError, data, error} = useQuery({
        queryFn: () => getStaticPageBySlug(slug as unknown as string),
        queryKey: ["staticPage", slug],
    });

    if (isPending) return <FullPageLoader/>;

    if (isError) {
        return <ErrorDisplay message={error.message} />;
    }

    if (!data.active) {
        return <ErrorDisplay message={"The page you're looking for doesn't exist. Please try again."} />;
    }

    return (
        <Box>
            <PageHeader title={data.title} maxW="3xl"/>

            <Container maxW="3xl" py={{base: 8, md: 12}} px={{base: 4, md: 8}}>
                <VStack gap={12} align="stretch">
                    {data.sections.map((section: Section, index: number) => (
                        <Box key={section.id}>
                            <HStack gap={2.5} mb={5} align="center">
                                <Box color="blue.400" mt="1px">
                                    <BsBookmark size={18}/>
                                </Box>
                                <Heading as="h2" fontSize="2xl" fontWeight="semibold" color="gray.800">
                                    {section.title}
                                </Heading>
                            </HStack>

                            <Box pl={7}>
                                <Prose
                                    size="lg"
                                    color="gray.700"
                                    lineHeight="1.8"
                                    maxW="none"
                                    dangerouslySetInnerHTML={{ __html: section.content }}
                                />
                            </Box>

                            {index < data.sections.length - 1 && (
                                <Separator mt={12} borderColor="gray.200"/>
                            )}
                        </Box>
                    ))}
                </VStack>
            </Container>
        </Box>
    );
}
