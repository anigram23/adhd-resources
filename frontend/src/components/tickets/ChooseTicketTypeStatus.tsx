import {useNavigate, useSearchParams} from "react-router";
import {Button, HStack, Text, VStack} from "@chakra-ui/react";

const STATUSES: { label: string; value: string; colorPalette: string }[] = [
    {label: "Open", value: "OPEN", colorPalette: "green"},
    {label: "Ongoing", value: "ONGOING", colorPalette: "blue"},
    {label: "Closed", value: "CLOSED", colorPalette: "gray"},
];

export default function ChooseTicketTypeStatus() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const activeStatus = searchParams.get("status");

    const handleSelect = (value: string) => {
        navigate({pathname: "/my-tickets", search: `status=${value}`});
    };

    return (
        <VStack align="start" gap={2}>
            <Text fontSize="sm" fontWeight="medium" color="gray.600">
                Filter by status
            </Text>
            <HStack gap={2} flexWrap="wrap">
                {STATUSES.map(({label, value, colorPalette}) => (
                    <Button
                        key={value}
                        size="sm"
                        colorPalette={colorPalette}
                        variant={activeStatus === value ? "solid" : "outline"}
                        onClick={() => handleSelect(value)}
                    >
                        {label}
                    </Button>
                ))}
            </HStack>
        </VStack>
    );
}
