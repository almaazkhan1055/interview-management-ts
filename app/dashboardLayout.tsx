"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutAction } from "./store/authSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import Sidebar from "./components/sidebar";
import Header from "./components/header";

const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Candidates", href: "/candidates" },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null;
    }
    
    return (
        <div className="bg-gray-100">
            <Header />
            <div className="flex-1 h-screen flex overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;