import {Box, Button, Collapsible, Container, HStack, Tabs, Text, VStack} from "@chakra-ui/react";
import {useQuery} from "@tanstack/react-query";
import {getStaticPageBySlug} from "@/api_service/staticPages.ts"
import FullPageLoader from "@/components/utils/FullPageLoader"
import {FiAlertCircle, FiPlus, FiTrash2} from "react-icons/fi";
import EditStaticPageForm from "./page/EditStaticPageForm.tsx";
import CreateStaticPageSectionForm from "./section/CreateStaticPageSectionForm.tsx";
import type {Key} from "react";
import {useState} from "react";
import EditStaticPageSectionForm from "./section/EditStaticPageSectionForm.tsx";
import CreateSectionBlockForm from "./block/CreateSectionBlockForm.tsx";
import EditSectionBlockForm from "./block/EditSectionBlockForm.tsx";
import DeleteStaticPageSectionConfirmation from "./section/DeleteStaticPageSectionConfirmation.tsx";
import DeleteSectionBlockConfirmation from "./block/DeleteSectionBlockConfirmation.tsx";
import GenericDialog from "@/components/utils/GenericDialog.tsx";

type SectionBlock = { id: Key; content: string; orderIndex: number };
type Section = { id: Key; title: string; orderIndex: number; sectionBlocks: SectionBlock[] };

function toggleId(set: Set<Key>, id: Key): Set<Key> {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
}

function removeId(set: Set<Key>, id: Key): Set<Key> {
    const next = new Set(set);
    next.delete(id);
    return next;
}

export default function StaticPageDetails({ slug }: { slug: string }) {

    const {isPending, isError, data, error} = useQuery({
        queryFn: () => getStaticPageBySlug(slug as unknown as string),
        queryKey: ["staticPage", slug],
    });

    const [openSectionIds, setOpenSectionIds] = useState<Set<Key>>(new Set());
    const [createSectionOpen, setCreateSectionOpen] = useState(false);
    const [openBlockIds, setOpenBlockIds] = useState<Set<Key>>(new Set());
    const [openCreateBlockSectionIds, setOpenCreateBlockSectionIds] = useState<Set<Key>>(new Set());

    if (isPending) return <FullPageLoader/>;

    if (isError) {
        return (
            <Container maxW="3xl" py={20}>
                <HStack gap={3} color="red.500" justify="center">
                    <FiAlertCircle size={22}/>
                    <Text fontSize="lg">Failed to load: {error.message}</Text>
                </HStack>
            </Container>
        );
    }

    return (
        <Tabs.Root defaultValue="page-details">
            <Tabs.List>
                <Tabs.Trigger value="page-details">Page Details</Tabs.Trigger>
                <Tabs.Trigger value="sections">Sections</Tabs.Trigger>
                <Tabs.Trigger value="blocks">Section Blocks</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="page-details">
                <EditStaticPageForm page={data}/>
            </Tabs.Content>

            <Tabs.Content value="sections">
                <VStack gap={3} align="stretch" mt={4}>
                    {data.sections.map((section: Section) => (
                        <Collapsible.Root
                            key={section.id}
                            open={openSectionIds.has(section.id)}
                            onOpenChange={() => setOpenSectionIds(prev => toggleId(prev, section.id))}
                        >
                            <Box borderWidth={1} borderColor="gray.200" borderRadius="md" overflow="hidden">
                                <HStack px={4} py={3} bg="gray.50" justify="space-between" align="center">
                                    <Collapsible.Trigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            flex={1}
                                            justifyContent="flex-start"
                                            fontWeight="semibold"
                                            color="gray.800"
                                        >
                                            {section.title}
                                        </Button>
                                    </Collapsible.Trigger>
                                    <GenericDialog
                                        component={() => <DeleteStaticPageSectionConfirmation
                                            sectionId={section.id as number}
                                            slug={slug}
                                            onCancel={() => {}}
                                        />}
                                        title="Are you sure you want to delete this section?"
                                        buttonText="Delete"
                                        size={"md" as never}
                                        colorPalette="red"
                                        variant="subtle"
                                        buttonSize="sm"
                                        icon={<FiTrash2/>}
                                    />
                                </HStack>
                                <Collapsible.Content>
                                    <Box p={4}>
                                        <EditStaticPageSectionForm
                                            section={{
                                                id: section.id as number,
                                                title: section.title,
                                                orderIndex: section.orderIndex
                                            }}
                                            slug={slug}
                                            onSuccess={() => setOpenSectionIds(prev => removeId(prev, section.id))}
                                        />
                                    </Box>
                                </Collapsible.Content>
                            </Box>
                        </Collapsible.Root>
                    ))}

                    <Collapsible.Root
                        open={createSectionOpen}
                        onOpenChange={() => setCreateSectionOpen(prev => !prev)}
                    >
                        <Collapsible.Trigger asChild>
                            <Button colorPalette="blue" size="sm">
                                <FiPlus/> Create New Section
                            </Button>
                        </Collapsible.Trigger>
                        <Collapsible.Content>
                            <Box p={4} borderWidth={1} borderColor="gray.200" borderRadius="md" mt={2}>
                                <CreateStaticPageSectionForm
                                    pageId={data.id}
                                    slug={slug}
                                    onSuccess={() => setCreateSectionOpen(false)}
                                />
                            </Box>
                        </Collapsible.Content>
                    </Collapsible.Root>
                </VStack>
            </Tabs.Content>

            <Tabs.Content value="blocks">
                <VStack gap={4} align="stretch" mt={4}>
                    {data.sections.map((section: Section) => (
                        <Box key={section.id} borderWidth={1} borderColor="blue.100" borderRadius="md" overflow="hidden">
                            <Box px={4} py={3} bg="blue.50" borderBottom="1px solid" borderColor="blue.100">
                                <Text fontWeight="semibold" color="blue.900" fontSize="sm">
                                    {section.title}
                                </Text>
                            </Box>
                            <VStack gap={2} align="stretch" p={3}>
                                {section.sectionBlocks?.map((block: SectionBlock) => (
                                    <Collapsible.Root
                                        key={block.id}
                                        open={openBlockIds.has(block.id)}
                                        onOpenChange={() => setOpenBlockIds(prev => toggleId(prev, block.id))}
                                    >
                                        <Box borderWidth={1} borderColor="gray.200" borderRadius="md" overflow="hidden">
                                            <HStack px={3} py={2} bg="gray.50" justify="space-between" align="center">
                                                <Collapsible.Trigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        flex={1}
                                                        justifyContent="flex-start"
                                                        color="gray.700"
                                                    >
                                                        Block {block.orderIndex}
                                                    </Button>
                                                </Collapsible.Trigger>
                                                <GenericDialog
                                                    component={() => <DeleteSectionBlockConfirmation
                                                        blockId={block.id as number}
                                                        slug={slug}
                                                        onCancel={() => {}}
                                                    />}
                                                    title="Are you sure you want to delete this block?"
                                                    buttonText="Delete"
                                                    size={"md" as never}
                                                    colorPalette="red"
                                                    variant="subtle"
                                                    buttonSize="sm"
                                                    icon={<FiTrash2/>}
                                                />
                                            </HStack>
                                            <Collapsible.Content>
                                                <Box p={4}>
                                                    <EditSectionBlockForm
                                                        block={block}
                                                        slug={slug}
                                                        onSuccess={() => setOpenBlockIds(prev => removeId(prev, block.id))}
                                                    />
                                                </Box>
                                            </Collapsible.Content>
                                        </Box>
                                    </Collapsible.Root>
                                ))}

                                <Collapsible.Root
                                    open={openCreateBlockSectionIds.has(section.id)}
                                    onOpenChange={() => setOpenCreateBlockSectionIds(prev => toggleId(prev, section.id))}
                                >
                                    <Collapsible.Trigger asChild>
                                        <Button colorPalette="blue" size="sm">
                                            <FiPlus/> Create New Block
                                        </Button>
                                    </Collapsible.Trigger>
                                    <Collapsible.Content>
                                        <Box p={4} borderWidth={1} borderColor="gray.200" borderRadius="md" mt={2}>
                                            <CreateSectionBlockForm
                                                sectionId={section.id as number}
                                                slug={slug}
                                                onSuccess={() => setOpenCreateBlockSectionIds(prev => removeId(prev, section.id))}
                                            />
                                        </Box>
                                    </Collapsible.Content>
                                </Collapsible.Root>
                            </VStack>
                        </Box>
                    ))}
                </VStack>
            </Tabs.Content>
        </Tabs.Root>
    )
}
