import {createBrowserRouter, Navigate} from "react-router-dom";
import {DashboardPage} from "../features/dashboard/pages/DashboardPage.tsx";
import {FeedingPage} from "../features/dashboard/pages/FeedingPage.tsx";
import {BabiesPage} from "@/features/baby/pages/BabiesPage.tsx";
import {AppShell} from "@/components/layout/AppShell.tsx";

export const router = createBrowserRouter([
    {
        element: <AppShell />,
        children:[
            {
                path: "/",
                element: <Navigate to="/babies" replace />
            },
            {
                path: "/babies",
                element: <BabiesPage />
            },
            {
                // Still the old, baby-agnostic dashboard until Phase 2 makes it per-baby.
                path: "/babies/:babyId",
                element: <DashboardPage />
            }
        ]
    },
    {
        path: "/feeding",
        element: <FeedingPage />
    }
]);
