"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const queryClient = new QueryClient();

interface Props {
    children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    {children}
                    <ProgressBar height="3px" color="rgb(243 176 105)" options={{ showSpinner: false }} shallowRouting />
                </ThemeProvider>
            </QueryClientProvider>
        </SessionProvider>
    );
};

export default Providers;
