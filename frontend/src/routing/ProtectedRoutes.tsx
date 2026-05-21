import {useAuth} from "@/auth/useAuth.ts";
import {Navigate, Outlet} from "react-router";
import FullPageLoader from "@/components/utils/FullPageLoader.tsx";

interface Props {
    allowedRole: "ADMIN" | "REVIEWER";
    redirectTo?: string;
}

export function ProtectedRoute({ allowedRole, redirectTo = "/login" }: Props) {
    const { user, isLoading } = useAuth();

    if (isLoading) return <FullPageLoader />;
    if (!user || user.role !== allowedRole) return <Navigate to={redirectTo} replace />;

    return <Outlet />;
}