import {RouterProvider} from "react-router-dom";
import {QueryClientProvider} from "@tanstack/react-query";
import {router} from "./router.tsx";
import {queryClient} from "./queryClient.ts";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
