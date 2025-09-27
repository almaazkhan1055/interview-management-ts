"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
    const router = useRouter();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogout = () => {
        sessionStorage.clear();
        router.push("/login");
    };

    return (
        <>
            <header className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center sticky top-0 z-50 shadow-sm">
                <div className="flex items-center space-x-2">

                    <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                        Interview Management System
                    </h1>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <button
                            onClick={() => setShowLogoutConfirm(true)}
                            className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-all duration-200 flex items-center space-x-1 shadow-sm hover:shadow-md"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            {showLogoutConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
                        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">Confirm Logout</h3>
                        <p className="text-gray-600 text-center mb-6">Are you sure you want to logout from your account?</p>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                            >
                                <span>Yes, Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;