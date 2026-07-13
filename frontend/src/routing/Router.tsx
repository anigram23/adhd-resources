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
import Profile from "@/pages/Profile.tsx";
import ProfessionalTypes from "@/pages/ProfessionalTypes.tsx";
import TicketTypes from "@/pages/TicketTypes.tsx";
import MyTickets from "@/pages/MyTickets.tsx";
import AllTickets from "@/pages/AllTickets.tsx";
import MyReviews from "@/pages/MyReviews.tsx";
import AllReviews from "@/pages/AllReviews.tsx";


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
                    { path: "professional-types", element: <ProfessionalTypes /> },
                    { path: "ticket-types", element: <TicketTypes /> },
                    { path: "tickets", element: <AllTickets /> },
                    { path: "reviews", element: <AllReviews /> }
                ]
            }
        ]
    }
]

const reviewerRoutes = [
    { path: "/register", element: <ReviewerRegister /> },
    { path: "/login", element: <ReviewerLogin /> },
    {
        element: <ProtectedRoute allowedRole="REVIEWER" redirectTo="/login"/>,
        children: [
            { path: "/profile", element: <Profile /> },
            { path: "/my-tickets", element: <MyTickets />},
            { path: "/my-reviews", element: <MyReviews /> }

        ]
    }
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