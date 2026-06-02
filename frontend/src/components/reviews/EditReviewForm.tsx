import type {Review} from "@/utils/types.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {editReview} from "@/api_service/review.ts";
import * as React from "react";
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
import {MdComputer} from "react-icons/md";
import {HiOfficeBuilding} from "react-icons/hi";
import {FiAlertCircle, FiEdit2, FiInfo, FiPhone} from "react-icons/fi";
import {FaRupeeSign} from "react-icons/fa";

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

export default function EditReviewForm({ review, onClose }: { review: Review, onClose?: () => void }) {
    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        doesOnlineConsultations: review.doesOnlineConsultations,
        contactNumber: review.contactNumber,
        consultationFee: review.consultationFee,
        address: review.address,
        diagnosisFee: review.diagnosisFee,
        content: review.content,
        rating: review.rating
    });

    const mutation = useMutation({
        mutationFn: () => editReview(review.id, form),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["reviews", String(data.professional.id)] });
            onClose?.();
        }
    });

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        mutation.mutate();
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={6}>

                <Box bg="blue.50" borderRadius="lg" p={4} borderLeft="4px solid" borderColor="blue.200">
                    <SectionHeader icon={<FiPhone size={14} />} label="Contact & Location" />
                    <Stack gap={4} mt={3}>
                        <Switch.Root
                            checked={form.doesOnlineConsultations}
                            onCheckedChange={(e) =>
                                setForm({...form, doesOnlineConsultations: e.checked as unknown as boolean})}
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
                                    onValueChange={(e) =>
                                        setForm({...form, consultationFee: e.value as unknown as number})}
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
                                    onValueChange={(e) =>
                                        setForm({...form, rating: e.value as unknown as number})}
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
                            <Textarea
                                bg="white"
                                size="xl"
                                variant="outline"
                                placeholder="Describe your experience with this professional — what worked well, what to watch out for, etc."
                                value={form.content}
                                onChange={(e) => setForm({...form, content: e.currentTarget.value})}
                            />
                        </Field.Root>
                    </Stack>
                </Box>

                {mutation.isError && (
                    <HStack gap={2} color="red.500">
                        <FiAlertCircle size={16} />
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
