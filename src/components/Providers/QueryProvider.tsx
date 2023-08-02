"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

interface Props {
    children: React.ReactNode;
}

const QueryProvider = ({ children }: Props) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
export default QueryProvider;
