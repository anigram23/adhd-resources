import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {getAllProfessionalTypes} from "@/api_service/professionalType.ts";
import {getAllStates} from "@/api_service/state.ts";
import {getCitiesByState} from "@/api_service/city.ts";
import FullPageLoader from "@/components/utils/FullPageLoader.tsx";
import {Button, Field, FieldRequiredIndicator, Flex, NativeSelect} from "@chakra-ui/react";
import type {City, ProfessionalType, State} from "@/utils/types.ts";
import {useNavigate} from "react-router";


export default function FindProfessionals() {
    const [selectedStateID, setSelectedStateID] = useState<number>();
    const [selectedType, setSelectedType] = useState<string>();
    const [selectedCity, setSelectedCity] = useState<string>();
    const navigate = useNavigate();

    const professionalTypesQuery = useQuery({
        queryKey: ["professionalTypes"],
        queryFn: getAllProfessionalTypes,
    });

    const statesQuery = useQuery({
        queryKey: ["states"],
        queryFn: getAllStates,
    });

    const citiesQuery = useQuery({
        queryKey: ["cities", selectedStateID],
        queryFn: () => getCitiesByState(selectedStateID),
        enabled: !!selectedStateID,
    });

    if (professionalTypesQuery.isPending || statesQuery.isPending) {
        return <FullPageLoader />;
    }

    const handleSubmit = () => {
        navigate({
            pathname: "/professionals",
            search: `type=${selectedType}&city=${selectedCity}`,
        })
    }

    return (
        <Flex gap={4} flexWrap="wrap" align="flex-end">
            <Field.Root required flex="1" minW="160px">
                <Field.Label color="gray.700">
                    Professional Type
                    <FieldRequiredIndicator />
                </Field.Label>

                <NativeSelect.Root>
                    <NativeSelect.Field
                        placeholder="Select"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.currentTarget.value)}
                    >
                        {professionalTypesQuery.data.map((type: ProfessionalType) => (
                            <option value={type.title} key={type.id}>{type.title}</option>
                        ))}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                </NativeSelect.Root>
            </Field.Root>

            <Field.Root required flex="1" minW="160px">
                <Field.Label color="gray.700">
                    State
                    <FieldRequiredIndicator />
                </Field.Label>

                <NativeSelect.Root>
                    <NativeSelect.Field
                        placeholder="Select"
                        value={selectedStateID}
                        onChange={(e) => setSelectedStateID(e.currentTarget.value as unknown as number)}
                    >
                        {statesQuery.data.map((state: State) => (
                            <option value={state.id} key={state.id}>{state.name}</option>
                        ))}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                </NativeSelect.Root>
            </Field.Root>

            <Field.Root required flex="1" minW="160px">
                <Field.Label color="gray.700">
                    City
                    <FieldRequiredIndicator />
                </Field.Label>

                <NativeSelect.Root>
                    <NativeSelect.Field
                        placeholder="Select"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.currentTarget.value)}
                    >
                        {(citiesQuery.data ?? []).map((city: City) => (
                            <option value={city.name} key={city.id}>{city.name}</option>
                        ))}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                </NativeSelect.Root>
            </Field.Root>

            <Button colorPalette="blue" onClick={handleSubmit} alignSelf="flex-end">
                Find
            </Button>
        </Flex>
    )
}
