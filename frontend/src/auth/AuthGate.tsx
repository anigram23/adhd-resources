import {type ReactNode} from "react";
import {useAuth} from "@/auth/useAuth.ts";
import FullPageLoader from "../components/utils/FullPageLoader.tsx";

export default function AuthGate({ children } : {children: ReactNode}) {
    const { isLoading } = useAuth();

    if (isLoading) {
        return (
            <FullPageLoader />
        )
    }

    // if (isError) {
    //     return (
    //         <h1>Something went wrong...</h1>
    //     )
    // }

    return <>{children}</>;
}