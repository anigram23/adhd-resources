import { createBrowserRouter } from "react-router"
import ReviewerHome from "../pages/ReviewerHome"
import ReviewerLogin from "../pages/ReviewerLogin"
import Layout from "./Layout"
import AdminLogin from "@/pages/AdminLogin"
import ReviewerRegister from "@/pages/ReviewerRegister.tsx";
import AdminHome from "@/pages/AdminHome.tsx";
import AllStaticPages from "../pages/AllStaticPages.tsx";
import StaticPage from "@/pages/StaticPage.tsx";


const adminRoutes = [
    {
        path: "/admin",
        children: [
            {index: true, element: <AdminHome />},
            { path: "login", element: <AdminLogin /> },
            { path: "static-pages", element: <AllStaticPages /> }

        ]
    }
]

const reviewerRoutes = [
    { path: "/register", element: <ReviewerRegister /> },
    { path: "/login", element: <ReviewerLogin /> }
]

const commonRoutes = [
    { path: "/:slug", element: <StaticPage /> },
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