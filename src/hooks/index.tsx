import React from "react";
import { AuthProvider } from "./auth";

interface AppProviderProps {
    children: React.ReactNode
}

export function AppProvaider({ children }: AppProviderProps){
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}