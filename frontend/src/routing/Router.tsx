import { createBrowserRouter } from "react-router"
import Home from "../pages/Home"
import Layout from "./Layout"

const router = createBrowserRouter([
    { 
        path: "/", 
        element: <Layout /> ,
        children: [
            { index: true, element: <Home /> }
        ]
    },
])

export default router