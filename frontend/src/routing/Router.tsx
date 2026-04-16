import { createBrowserRouter } from "react-router"
import ReviewerHome from "../pages/ReviewerHome"
import ReviewerLogin from "../pages/ReviewerLogin"
import Layout from "./Layout"
import AdminLogin from "@/pages/AdminLogin"
import ReviewerRegister from "@/pages/ReviewerRegister.tsx";


const adminRoutes = [
    {
        path: "/admin", 
        children: [
            { path: "login", element: <AdminLogin /> },
        ]
    }
]

const reviewerRoutes = [
    { path: "/register", element: <ReviewerRegister /> },
    {path: "/login", element: <ReviewerLogin /> }
]

const router = createBrowserRouter([
    { 
        path: "/", 
        element: <Layout /> ,
        children: [
            { index: true, element: <ReviewerHome /> },
            ...reviewerRoutes,
            ...adminRoutes
        ]
    },
])

export default router