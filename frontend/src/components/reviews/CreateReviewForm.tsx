import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {createReview} from "@/api_service/review.ts";
import {
    Badge,
    Box,
    Button,
    Field,
    FieldRequiredIndicator,
    Grid,
    Heading,
    HStack,
    Input,
    InputGroup,
    NumberInput,
    RatingGroup,
    Separator,
    Stack,
    Switch,
    Text,
    Textarea,
    VStack,
} from "@chakra-ui/react";
import * as React from "react";
import {FiAlertCircle, FiEdit2, FiInfo, FiPhone, FiUser} from "react-icons/fi";
import {FaRupeeSign} from "react-icons/fa";
import {MdComputer} from "react-icons/md";
import {HiOfficeBuilding} from "react-icons/hi";
import {useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {Control, RichTextEditor} from "@/components/ui/rich-text-editor.tsx";

function SectionHeader({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <HStack gap={2} mb={1}>
            <Box color="blue.400">{icon}</Box>
            <Heading as="h3" fontSize="sm" fontWeight="semibold" color="blue.900" textTransform="uppercase" letterSpacing="wider">
                {label}
            </Heading>
        </HStack>
    );
}

export default function CreateReviewForm(
    {id, professionalType, city, onClose}: {
        id: number | null,
        professionalType: string | null,
        city: string | null,
        onClose?: () => void,
    }
) {
    const existingProfessional: boolean = !!id;
    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        professionalName: "",
        professionalTypeTitle: professionalType ?? null,
        cityName: city ?? null,
        professionalId: id ?? null,
        doesOnlineConsultations: false,
        contactNumber: "",
        address: "",
        consultationFee: 0,
        diagnosisFee: 0,
        content: "",
        rating: 0.0,
    });

    const mutation = useMutation({
        mutationFn: createReview,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({queryKey: ["reviews", String(data.professional.id)]});
            await queryClient.invalidateQueries({ queryKey: ["professionals", professionalType, city] });
            onClose?.();
        },
    });

    const editor = useEditor({
        extensions: [StarterKit],
        content: form.content,
        onUpdate({ editor }) {
            setForm(prev => ({ ...prev, content: editor.getHTML() }));
        },
    });

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        mutation.mutate(form);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={6}>

                {!existingProfessional && (
                    <Box bg="blue.50" borderRadius="lg" p={4} borderLeft="4px solid" borderColor="blue.200">
                        <SectionHeader icon={<FiUser size={14} />} label="Professional" />
                        <Stack gap={4} mt={3}>
                            <Field.Root required>
                                <Field.Label color="gray.700">
                                    Name <FieldRequiredIndicator />
                                </Field.Label>
                                <Input
                                    bg="white"
                                    placeholder="Enter professional's name"
                                    value={form.professionalName}
                                    onChange={(e) => setForm({...form, professionalName: e.target.value})}
                                />
                            </Field.Root>
                        </Stack>
                    </Box>
                )}

                <Box bg="blue.50" borderRadius="lg" p={4} borderLeft="4px solid" borderColor="blue.200">
                    <SectionHeader icon={<FiPhone size={14} />} label="Contact & Location" />
                    <Stack gap={4} mt={3}>
                        <Switch.Root
                            checked={form.doesOnlineConsultations}
                            onCheckedChange={(e) => setForm({...form, doesOnlineConsultations: e.checked as unknown as boolean})}
                        >
                            <Switch.HiddenInput />
                            <HStack gap={3}>
                                <Switch.Control />
                                <HStack gap={2}>
                                    <Box color="blue.400"><MdComputer size={16} /></Box>
                                    <Switch.Label color="gray.700" fontSize="sm">
                                        Offers online consultations
                                    </Switch.Label>
                                    {form.doesOnlineConsultations && (
                                        <Badge colorPalette="green" variant="subtle" size="sm">Yes</Badge>
                                    )}
                                </HStack>
                            </HStack>
                        </Switch.Root>

                        <Separator borderColor="blue.100" />

                        <Field.Root required>
                            <Field.Label color="gray.700">
                                Contact Number <FieldRequiredIndicator />
                            </Field.Label>
                            <InputGroup startAddon="+91">
                                <Input
                                    bg="white"
                                    placeholder="Enter phone number"
                                    value={form.contactNumber}
                                    onChange={(e) => setForm({...form, contactNumber: e.currentTarget.value})}
                                />
                            </InputGroup>
                        </Field.Root>

                        <Field.Root required>
                            <Field.Label color="gray.700">
                                <HStack gap={1}>
                                    <Box color="blue.400"><HiOfficeBuilding size={14} /></Box>
                                    <Text>Address</Text>
                                </HStack>
                                <FieldRequiredIndicator />
                            </Field.Label>
                            <Textarea
                                bg="white"
                                variant="outline"
                                placeholder="Enter clinic / office address"
                                value={form.address}
                                onChange={(e) => setForm({...form, address: e.currentTarget.value})}
                            />
                        </Field.Root>
                    </Stack>
                </Box>

                <Box bg="blue.50" borderRadius="lg" p={4} borderLeft="4px solid" borderColor="blue.200">
                    <SectionHeader icon={<FaRupeeSign size={13} />} label="Fees" />
                    <Grid templateColumns={{base: "1fr", md: "repeat(2, 1fr)"}} gap={4} mt={3}>
                        <Field.Root required>
                            <Field.Label color="gray.700">
                                Consultation Fee <FieldRequiredIndicator />
                            </Field.Label>
                            <InputGroup startAddon="₹">
                                <NumberInput.Root
                                    bg="white"
                                    value={form.consultationFee as unknown as string}
                                    onValueChange={(e) => setForm({...form, consultationFee: e.value as unknown as number})}
                                >
                                    <NumberInput.Control />
                                    <NumberInput.Input placeholder="0" />
                                </NumberInput.Root>
                            </InputGroup>
                        </Field.Root>

                        <Field.Root>
                            <Field.Label color="gray.700">Diagnosis Fee</Field.Label>
                            <InputGroup startAddon="₹">
                                <NumberInput.Root
                                    bg="white"
                                    value={form.diagnosisFee as unknown as string}
                                    onValueChange={(e) => setForm({...form, diagnosisFee: e.value as unknown as number})}
                                >
                                    <NumberInput.Control />
                                    <NumberInput.Input placeholder="0 (leave blank if N/A)" />
                                </NumberInput.Root>
                            </InputGroup>
                            <Field.HelperText>
                                <HStack gap={1} color="gray.500" fontSize="xs">
                                    <FiInfo size={11} />
                                    <Text>Leave at 0 if they don't diagnose ADHD</Text>
                                </HStack>
                            </Field.HelperText>
                        </Field.Root>
                    </Grid>
                </Box>

                <Box bg="blue.50" borderRadius="lg" p={4} borderLeft="4px solid" borderColor="blue.200">
                    <SectionHeader icon={<FiEdit2 size={14} />} label="Your Review" />
                    <Stack gap={4} mt={3}>
                        <Field.Root required>
                            <Field.Label color="gray.700">
                                Rating <FieldRequiredIndicator />
                            </Field.Label>
                            <VStack align="start" gap={1}>
                                <RatingGroup.Root
                                    allowHalf
                                    count={5}
                                    value={form.rating}
                                    onValueChange={(e) => setForm({...form, rating: e.value as unknown as number})}
                                    size="lg"
                                >
                                    <RatingGroup.HiddenInput />
                                    <RatingGroup.Control />
                                </RatingGroup.Root>
                                {form.rating > 0 && (
                                    <Text fontSize="xs" color="blue.500" fontWeight="medium">
                                        {form.rating} / 5
                                    </Text>
                                )}
                            </VStack>
                        </Field.Root>

                        <Field.Root required>
                            <Field.Label color="gray.700">
                                Share your experience <FieldRequiredIndicator />
                            </Field.Label>
                            <RichTextEditor.Root
                                editor={editor}
                                borderColor="blue.100"
                                _focusWithin={{ borderColor: "blue.300", shadow: "sm" }}
                                css={{ "--content-min-height": "160px" }}
                            >
                                <RichTextEditor.Toolbar>
                                    <RichTextEditor.ControlGroup>
                                        <Control.Bold />
                                        <Control.Italic />
                                        <Control.Underline />
                                        <Control.Strikethrough />
                                    </RichTextEditor.ControlGroup>
                                    <RichTextEditor.ControlGroup>
                                        <Control.BulletList />
                                        <Control.OrderedList />
                                    </RichTextEditor.ControlGroup>
                                    <RichTextEditor.ControlGroup>
                                        <Control.Undo />
                                        <Control.Redo />
                                    </RichTextEditor.ControlGroup>
                                </RichTextEditor.Toolbar>
                                <RichTextEditor.Content />
                            </RichTextEditor.Root>
                        </Field.Root>
                    </Stack>
                </Box>

                {mutation.isError && (
                    <HStack gap={2} color="red.500">
                        <FiAlertCircle size={22} />
                        <Text fontSize="sm">{mutation.error.message}</Text>
                    </HStack>
                )}

                <Button
                    type="submit"
                    colorPalette="blue"
                    w="full"
                    size="lg"
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? "Submitting..." : "Submit Review"}
                </Button>
            </Stack>
        </form>
    );
}
