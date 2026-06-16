import {useQuery} from "@tanstack/react-query";
import {getAllProfessionalTypes} from "@/api_service/professionalType.ts";
import ErrorDisplay from "@/components/utils/ErrorDisplay.tsx";
import FullPageLoader from "@/components/utils/FullPageLoader.tsx";
import {Badge, Box, Card, Container, Flex, Grid, GridItem, Heading, HStack, VStack} from "@chakra-ui/react";
import type {ProfessionalType} from "@/utils/types.ts";
import GenericDialog from "@/components/utils/GenericDialog.tsx";
import AddNewProfessionalTypeForm from "@/components/professional_types/AddNewProfessionalTypeForm.tsx";
import EditProfessionalTypeForm from "@/components/professional_types/EditProfessionalTypeForm.tsx";
import ConfirmDeleteProfessionalType from "@/components/professional_types/ConfirmDeleteProfessionalType.tsx";
import {FiEdit2, FiPlus, FiTrash2} from "react-icons/fi";

export default function ProfessionalTypes() {
    const { data, error, isError, isPending } = useQuery({
        queryKey: ["professionalTypes"],
        queryFn: getAllProfessionalTypes
    });

    if (isError) {
        return <ErrorDisplay message={error.message} />
    }

    if (isPending) {
        return <FullPageLoader />
    }

    return (
        <Box>
            <Box bg="blue.50" py={14} px={4} borderBottom="1px solid" borderColor="blue.100">
                <Container maxW="5xl">
                    <Heading
                        as="h1"
                        fontSize={{base: "3xl", md: "5xl"}}
                        fontWeight="bold"
                        color="blue.900"
                        lineHeight="1.15"
                    >
                        Professional Types
                    </Heading>
                </Container>
            </Box>

            <Container maxW="5xl" py={10} px={{base: 4, md: 8}}>
                <VStack gap={8} align="stretch">
                    <Grid
                        templateColumns={{base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)"}}
                        gap={4}
                    >
                        {data.map((type: ProfessionalType) => (
                            <GridItem key={type.id}>
                                <Card.Root h="full" shadow="sm" display="flex" flexDirection="column">
                                    <Card.Header flex={1}>
                                        <HStack justify="space-between" align="flex-start">
                                            <Box flex={1}>
                                                <Card.Title color="gray.800" fontWeight="semibold">
                                                    {type.title}
                                                </Card.Title>
                                                <Card.Description color="blue.400" fontFamily="mono" fontSize="sm" mt={1}>
                                                    #{type.id}
                                                </Card.Description>
                                            </Box>
                                            {type.doctor && (
                                                <Badge colorPalette="blue" variant="subtle" size="sm" flexShrink={0}>
                                                    Doctor
                                                </Badge>
                                            )}
                                        </HStack>

                                        <VStack align="start" gap={1} mt={3}>
                                            <Badge
                                                colorPalette={type.canDiagnose ? "green" : "gray"}
                                                variant="subtle"
                                                size="sm"
                                            >
                                                {type.canDiagnose ? "Can Diagnose ADHD" : "Cannot Diagnose ADHD"}
                                            </Badge>
                                            <Badge
                                                colorPalette={type.canPrescribeMeds ? "green" : "gray"}
                                                variant="subtle"
                                                size="sm"
                                            >
                                                {type.canPrescribeMeds ? "Can Prescribe Meds" : "Cannot Prescribe Meds"}
                                            </Badge>
                                        </VStack>
                                    </Card.Header>

                                    <Card.Footer pt={2}>
                                        <HStack gap={2}>
                                            <GenericDialog
                                                component={({ onClose }) => <EditProfessionalTypeForm professionalType={type} onClose={onClose} />}
                                                title="Edit Professional Type"
                                                buttonText="Edit"
                                                size={"xl" as never}
                                                variant="subtle"
                                                buttonSize="sm"
                                                icon={<FiEdit2 />}
                                            />
                                            <GenericDialog
                                                component={({ onClose }) => <ConfirmDeleteProfessionalType id={type.id} onClose={onClose} />}
                                                title="Delete Professional Type"
                                                buttonText="Delete"
                                                size={"md" as never}
                                                colorPalette="red"
                                                variant="subtle"
                                                buttonSize="sm"
                                                icon={<FiTrash2 />}
                                            />
                                        </HStack>
                                    </Card.Footer>
                                </Card.Root>
                            </GridItem>
                        ))}
                    </Grid>

                    <Flex justify="flex-start">
                        <GenericDialog
                            component={AddNewProfessionalTypeForm}
                            title="New Professional Type"
                            buttonText="Add New Professional Type"
                            size={"xl" as never}
                            icon={<FiPlus />}
                        />
                    </Flex>
                </VStack>
            </Container>
        </Box>
    );
}
