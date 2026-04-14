import {type ReactNode} from "react";
import {useAuth} from "@/auth/AuthContext.tsx";
import FullPageLoader from "@/components/FullPageLoader.tsx";

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