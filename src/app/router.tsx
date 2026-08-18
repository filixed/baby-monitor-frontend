import {createBrowserRouter} from "react-router-dom";
import {DashboardPage} from "../feauters/dashboard/pages/DashboardPage.tsx";
import {FeedingPage} from "../feauters/dashboard/pages/FeedingPage.tsx";
import {AppShell} from "@/components/layout/AppShell.tsx";

export const router = createBrowserRouter([
    {
        element: <AppShell />,
        children:[
            {
                path: "/",
                element: <DashboardPage />
            }
        ]
    },
    {
        path: "/feeding",
        element: <FeedingPage />
    }
]);