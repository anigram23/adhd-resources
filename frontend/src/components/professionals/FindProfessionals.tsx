import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {getAllProfessionalTypes} from "@/api_service/professionalType.ts";
import {getAllStates} from "@/api_service/state.ts";
import {getCitiesByState} from "@/api_service/city.ts";
import FullPageLoader from "@/components/utils/FullPageLoader.tsx";
import {Button, Field, FieldRequiredIndicator, HStack, NativeSelect} from "@chakra-ui/react";
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
        <HStack gap={2}>
            <Field.Root required>
                <Field.Label>
                    Select Professional Type
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

            <Field.Root required>
                <Field.Label>
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

            <Field.Root required>
                <Field.Label>
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

            <Button onClick={handleSubmit}>Go</Button>
            
        </HStack>
    )
}