"use client"
import AuthProvider from "@/_provider/AuthProvider";
import store from "@/_store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
const queryClient = new QueryClient();
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider refetchOnWindowFocus refetchWhenOffline={false}>
        <Provider store={store}>
          <AuthProvider>{children}</AuthProvider>
        </Provider>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default Layout;
