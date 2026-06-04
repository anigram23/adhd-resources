import {useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {getStaticPageBySlug} from "@/api_service/staticPages.ts";
import FullPageLoader from "../components/utils/FullPageLoader.tsx";
import {Box, Container, Heading, HStack, Separator, Text, VStack} from "@chakra-ui/react";
import type {Key} from "react";
import {BsBookmark} from "react-icons/bs";
import ErrorDisplay from "@/components/utils/ErrorDisplay.tsx";

type SectionBlock = { id: Key; content: string; orderIndex: number };
type Section = { id: Key; title: string; orderIndex: number; sectionBlocks: SectionBlock[] };

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
            <Box bg="blue.50" py={14} px={4} borderBottom="1px solid" borderColor="blue.100">
                <Container maxW="3xl">
                    <Heading
                        as="h1"
                        fontSize={{base: "3xl", md: "5xl"}}
                        fontWeight="bold"
                        color="blue.900"
                        lineHeight="1.15"
                    >
                        {data.title}
                    </Heading>
                </Container>
            </Box>

            <Container maxW="3xl" py={12} px={{base: 4, md: 8}}>
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
                                <VStack gap={4} align="stretch">
                                    {section.sectionBlocks.map((block: SectionBlock) => (
                                        <Text
                                            key={block.id}
                                            fontSize="md"
                                            lineHeight="1.8"
                                            color="gray.700"
                                        >
                                            {block.content}
                                        </Text>
                                    ))}
                                </VStack>
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
