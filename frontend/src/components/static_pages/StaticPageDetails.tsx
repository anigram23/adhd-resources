import {Box, Button, Collapsible, HStack, Tabs, VStack} from "@chakra-ui/react";
import {useQuery} from "@tanstack/react-query";
import {getStaticPageBySlug} from "@/api_service/staticPages.ts"
import FullPageLoader from "@/components/utils/FullPageLoader"
import {FiList, FiPlus, FiTrash2} from "react-icons/fi";
import EditStaticPageForm from "./page/EditStaticPageForm.tsx";
import CreateStaticPageSectionForm from "./section/CreateStaticPageSectionForm.tsx";
import type {Key} from "react";
import {useState} from "react";
import EditStaticPageSectionForm from "./section/EditStaticPageSectionForm.tsx";
import DeleteStaticPageSectionConfirmation from "./section/DeleteStaticPageSectionConfirmation.tsx";
import GenericDialog from "@/components/utils/GenericDialog.tsx";
import ReorderStaticPageSectionsForm from "./section/ReorderStaticPageSectionsForm.tsx";
import ErrorDisplay from "@/components/utils/ErrorDisplay.tsx";

type Section = { id: Key; title: string; content: string; orderIndex: number };

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

export default function StaticPageDetails({ slug, onClose }: { slug: string, onClose?: () => void }) {

    const {isPending, isError, data, error} = useQuery({
        queryFn: () => getStaticPageBySlug(slug as unknown as string),
        queryKey: ["staticPage", slug],
    });

    const [openSectionIds, setOpenSectionIds] = useState<Set<Key>>(new Set());
    const [reorderSectionsOpen, setReorderSectionsOpen] = useState(false);
    const [createSectionOpen, setCreateSectionOpen] = useState(false);
    const [createSectionCount, setCreateSectionCount] = useState(0);

    if (isPending) return <FullPageLoader/>;

    if (isError) {
        return <ErrorDisplay message={error.message} />;
    }

    // Remount key: refreshes section forms whenever the page data changes (create/edit/reorder).
    const sectionsKey = data.sections
        .map((s: Section) => `${s.id}:${s.title}:${s.content}:${s.orderIndex}`)
        .join("|");

    return (
        <Tabs.Root defaultValue="page-details">
            <Tabs.List>
                <Tabs.Trigger value="page-details">Page Details</Tabs.Trigger>
                <Tabs.Trigger value="sections">Sections</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="page-details">
                <EditStaticPageForm page={data} onClose={onClose}/>
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
                                            key={`edit:${sectionsKey}`}
                                            section={{
                                                id: section.id as number,
                                                title: section.title,
                                                content: section.content,
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
                        open={reorderSectionsOpen}
                        onOpenChange={() => setReorderSectionsOpen(prev => !prev)}
                    >
                        <Collapsible.Trigger asChild>
                            <Button colorPalette="blue" variant="outline" size="sm">
                                <FiList/> Reorder Sections
                            </Button>
                        </Collapsible.Trigger>
                        <Collapsible.Content>
                            <Box p={4} borderWidth={1} borderColor="gray.200" borderRadius="md" mt={2}>
                                <ReorderStaticPageSectionsForm
                                    key={`reorder:${sectionsKey}`}
                                    sections={data.sections.map((s: Section) => ({
                                        id: s.id as number,
                                        title: s.title,
                                        orderIndex: s.orderIndex,
                                    }))}
                                    slug={slug}
                                    onSuccess={() => setReorderSectionsOpen(false)}
                                />
                            </Box>
                        </Collapsible.Content>
                    </Collapsible.Root>

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
                                    key={createSectionCount}
                                    pageId={data.id}
                                    slug={slug}
                                    onSuccess={() => {
                                        setCreateSectionOpen(false);
                                        setCreateSectionCount(prev => prev + 1);
                                    }}
                                />
                            </Box>
                        </Collapsible.Content>
                    </Collapsible.Root>
                </VStack>
            </Tabs.Content>
        </Tabs.Root>
    )
}
