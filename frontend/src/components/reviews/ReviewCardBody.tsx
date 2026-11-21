import {Badge, Box, Card, HStack, Separator, Text, VStack} from "@chakra-ui/react";
import {FaPhone, FaRupeeSign, FaStethoscope} from "react-icons/fa";
import {HiOfficeBuilding} from "react-icons/hi";
import {MdComputer} from "react-icons/md";
import type {Review} from "@/utils/types.ts";
import ReviewContent from "@/components/reviews/ReviewContent.tsx";

// Every row is always rendered and clamped to one line, so the review text starts at the same height on every card.
export default function ReviewCardBody({review}: { review: Review }) {
    const diagnosis = review.wasDiagnosed
        ? `Diagnosed with ADHD here${review.diagnosisFee > 0 ? ` · ₹${review.diagnosisFee} diagnosis fee` : ""}`
        : "Not diagnosed here";

    return (
        <Card.Body pt={0} display="flex" flexDirection="column" minH={0}>
            <VStack align="start" gap={2} flex={1} minH={0}>
                <HStack gap={2} fontSize="sm" w="full">
                    <Box color="blue.400" flexShrink={0}><FaPhone size={13}/></Box>
                    <Text color="gray.700" lineClamp={1}>{review.contactNumber}</Text>
                </HStack>
                <HStack gap={2} fontSize="sm" w="full">
                    <Box color="blue.400" flexShrink={0}><HiOfficeBuilding size={15}/></Box>
                    <Text color="gray.700" lineClamp={1} title={review.address}>{review.address}</Text>
                </HStack>
                <Badge
                    colorPalette={review.doesOnlineConsultations ? "green" : "gray"}
                    variant="subtle"
                    size="sm"
                    gap={1}
                >
                    <MdComputer/>
                    {review.doesOnlineConsultations ? "Online consultations available" : "No online consultations"}
                </Badge>

                <Separator/>

                <HStack gap={2} fontSize="sm" w="full">
                    <Box color="blue.400" flexShrink={0}><FaRupeeSign size={12}/></Box>
                    <Text color="gray.700" lineClamp={1}>{review.consultationFee} per consultation</Text>
                </HStack>
                <HStack gap={2} fontSize="sm" w="full">
                    <Box color="blue.400" flexShrink={0}><FaStethoscope size={13}/></Box>
                    <Text color="gray.700" lineClamp={1} title={diagnosis}>{diagnosis}</Text>
                </HStack>

                <Separator/>

                <ReviewContent review={review}/>
            </VStack>
        </Card.Body>
    );
}
