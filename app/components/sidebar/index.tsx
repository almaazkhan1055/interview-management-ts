"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type Role = "admin" | "ta_member" | "panelist";

interface MenuItem {
    name: string;
    path: string;
    icon: string;
}

const menuItems: Record<Role, MenuItem[]> = {
    admin: [
        { name: "Dashboard", path: "/dashboard", icon: "📊" },
        { name: "Candidate", path: "/candidates", icon: "👤" },
    ],
    ta_member: [
        { name: "Dashboard", path: "/dashboard", icon: "📊" },
        { name: "Candidate", path: "/candidates", icon: "👤" },
    ],
    panelist: [
        { name: "Dashboard", path: "/dashboard", icon: "📊" },
        { name: "Candidate", path: "/candidates", icon: "👤" },
    ],
};

const Sidebar: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [role, setRole] = useState<Role | null>(null);

    useEffect(() => {
        const storedRole = localStorage.getItem("role") as Role | null;
        if (storedRole && menuItems[storedRole]) {
            setRole(storedRole);
        } else {
            router.push("/login");
        }
    }, [router]);

    if (!role) {
        return null;
    }

    const items = menuItems[role] || [];

    return (
        <aside className="w-72 bg-gradient-to-b from-white to-blue-50 border-r border-gray-200 h-full flex flex-col shadow-lg">
            <div className="p-5 border-b border-gray-200">
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                    Navigation
                </h2>
                <p className="text-xs text-gray-500 mt-1 capitalize">Welcome, {role.replace('_', ' ')}</p>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1 p-3 flex-grow">
                {items.map((item) => {
                    const isActive = pathname.startsWith(item.path);
                    return (
                        <Link key={item.path} href={item.path} className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${isActive ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md" : "text-gray-600 hover:bg-blue-100 hover:text-blue-700"}`}>
                            <span className="text-lg mr-3">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                            {isActive && <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
                <div className="text-xs text-gray-500 text-center">v1.0.0</div>
            </div>
        </aside>
    );
};

export default Sidebar;