import {Outlet} from "react-router-dom";

export function AppShell() {
    return (
        <div className="min-h-screen bg-slate-50">
            <header className="border-b bg-white">
                <div className="mx-auto flex h-16 max-w-7xl items-center px-4">
                    <h1 className="text-xl font-semibold">
                        🍼 Baby Monitor
                    </h1>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-6">
                <Outlet />
            </main>
        </div>
    )
}