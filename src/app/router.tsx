import {createBrowserRouter} from "react-router-dom";
import {DashboardPage} from "../feauters/dashboard/pages/DashboardPage.tsx";
import {FeedingPage} from "../feauters/dashboard/pages/FeedingPage.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardPage />,
    },
    {
        path: "/feeding",
        element: <FeedingPage />
    }
]);