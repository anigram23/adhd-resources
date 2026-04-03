import { createBrowserRouter } from "react-router"
import ReviewerHome from "../pages/ReviewerHome"
import ReviewerLogin from "../pages/ReviewerLogin"
import Layout from "./Layout"
import AdminLogin from "@/pages/AdminLogin"


const adminRoutes = [
    {
        path: "/admin", 
        children: [
            { path: "login", element: <AdminLogin /> },
        ]
    }
]

const router = createBrowserRouter([
    { 
        path: "/", 
        element: <Layout /> ,
        children: [
            { index: true, element: <ReviewerHome /> },
            { path: "login", element: <ReviewerLogin /> },
            ...adminRoutes
        ]
    },
])

export default router