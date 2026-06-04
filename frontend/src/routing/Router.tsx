import { createBrowserRouter } from "react-router"
import ReviewerHome from "../pages/ReviewerHome"
import ReviewerLogin from "../pages/ReviewerLogin"
import Layout from "./Layout"
import AdminLogin from "@/pages/AdminLogin"
import ReviewerRegister from "@/pages/ReviewerRegister.tsx";
import AdminHome from "@/pages/AdminHome.tsx";
import AllStaticPages from "../pages/AllStaticPages.tsx";
import StaticPage from "@/pages/StaticPage.tsx";
import {ProtectedRoute} from "@/routing/ProtectedRoutes.tsx";
import Professionals from "@/pages/Professionals.tsx";
import Reviews from "@/pages/Reviews.tsx";
import SearchResults from "@/pages/SearchResults.tsx";


const adminRoutes = [
    {
        path: "/admin",
        children: [
            { path: "login", element: <AdminLogin /> },
            {
                element: <ProtectedRoute allowedRole="ADMIN" redirectTo="/" />,
                children: [
                    { index: true, element: <AdminHome /> },
                    { path: "static-pages", element: <AllStaticPages /> },
                ]
            }
        ]
    }
]

const reviewerRoutes = [
    { path: "/register", element: <ReviewerRegister /> },
    { path: "/login", element: <ReviewerLogin /> }
]

const commonRoutes = [
    { path: "/:slug", element: <StaticPage /> },
    { path: "/professionals", element: <Professionals /> },
    { path: "/reviews/:id/:slug", element: <Reviews /> },
    { path: "/search", element: <SearchResults /> }
]

const router = createBrowserRouter([
    { 
        path: "/", 
        element: <Layout /> ,
        children: [
            { index: true, element: <ReviewerHome /> },
            ...reviewerRoutes,
            ...adminRoutes,
            ...commonRoutes
        ]
    },
])

export default router