import {createContext, type ReactNode, useContext} from "react";
import {useQuery} from "@tanstack/react-query";
import getCurrentUser from "@/api_service/auth.ts";

interface AuthContextType {
    user: void | undefined,
    isAuthenticated: boolean,
    isLoading: boolean,
    isError: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const {data: user, isLoading, isError} = useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
        retry: false
    });

    const isAuthenticated = !!user;

    const value = {isAuthenticated, user, isLoading, isError};
    console.log(user);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}