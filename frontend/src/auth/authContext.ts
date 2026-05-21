import {createContext} from "react";
import type {User} from "@/api_service/auth.ts";

export interface AuthContextType {
    user: User | null | undefined;
    isAuthenticated: boolean;
    isLoading: boolean;
    isError: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);