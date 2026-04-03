import { createBrowserRouter } from "react-router"
import Home from "../pages/Home"
import ReviewerLogin from "../pages/ReviewerLogin"
import Layout from "./Layout"

const router = createBrowserRouter([
    { 
        path: "/", 
        element: <Layout /> ,
        children: [
            { index: true, element: <Home /> },
            { path: "login", element: <ReviewerLogin /> }
        ]
    },
])

export default router