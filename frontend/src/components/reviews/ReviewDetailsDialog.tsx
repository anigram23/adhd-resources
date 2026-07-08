import type {Review} from "@/utils/types.ts";
import {Badge, Box, Flex, HStack, RatingGroup, Separator, Text, VStack} from "@chakra-ui/react";
import {FaPhone, FaRupeeSign} from "react-icons/fa";
import {HiOfficeBuilding} from "react-icons/hi";
import {MdComputer} from "react-icons/md";
import {Prose} from "@/components/ui/prose.tsx";

export default function ReviewDetailsDialog({review}: { review: Review }) {
    return (
        <VStack align="stretch" gap={3}>
            <VStack align="start" gap={3}>

                {review.professional && (
                    <Text fontSize="xl" fontWeight="medium" color="gray.700">
                        {review.professional.name}
                    </Text>
                )}

                <RatingGroup.Root readOnly allowHalf defaultValue={review.rating} count={5} size="sm">
                    <RatingGroup.HiddenInput />
                    <RatingGroup.Control />
                </RatingGroup.Root>
                <Text fontSize="xs" color="gray.500">
                    {new Date(review.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric", month: "short", day: "numeric"
                    })}
                </Text>
            </VStack>

            <VStack align="start" gap={2}>
                <HStack gap={2} fontSize="sm">
                    <Box color="blue.400"><FaPhone size={13} /></Box>
                    <Text color="gray.700">{review.contactNumber}</Text>
                </HStack>
                <HStack gap={2} fontSize="sm">
                    <Box color="blue.400"><HiOfficeBuilding size={15} /></Box>
                    <Text color="gray.700">{review.address}</Text>
                </HStack>
                <Badge
                    colorPalette={review.doesOnlineConsultations ? "green" : "gray"}
                    variant="subtle"
                    size="sm"
                    gap={1}
                >
                    <MdComputer />
                    {review.doesOnlineConsultations ? "Online consultations available" : "No online consultations"}
                </Badge>
            </VStack>

            <Separator />

            <HStack gap={4} fontSize="sm" flexWrap="wrap">
                <Flex align="center" gap={1} color="gray.700">
                    <Box color="blue.400"><FaRupeeSign size={12} /></Box>
                    <Text>{review.consultationFee} per consultation</Text>
                </Flex>
                {review.diagnosisFee > 0 && (
                    <Flex align="center" gap={1} color="gray.700">
                        <Box color="blue.400"><FaRupeeSign size={12} /></Box>
                        <Text>{review.diagnosisFee} diagnosis</Text>
                    </Flex>
                )}
            </HStack>

            <Separator />

            <Prose
                size="lg"
                color="gray.700"
                lineHeight="1.8"
                maxW="none"
                dangerouslySetInnerHTML={{__html: review.content}}
            />
        </VStack>
    );
}
