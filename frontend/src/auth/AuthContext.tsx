import {type ReactNode} from "react";
import {useQuery} from "@tanstack/react-query";
import {getCurrentUser} from "@/api_service/auth.ts";
import {AuthContext} from "@/auth/authContext.ts";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const {data: user, isLoading, isError} = useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
        retry: false,
        staleTime: 1000 * 60 * 5,
        refetchOnMount: false
    });

    const isAuthenticated = !!user;
    const value = {isAuthenticated, user, isLoading, isError};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}