"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { IoLogInOutline } from "react-icons/io5";
import { ImSpinner9 } from "react-icons/im";
import { MdErrorOutline } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import { login } from "../store/authSlice";

type Role = "admin" | "ta_member" | "panelist" | "";

interface IFormInput {
    username: string;
    password: string;
    role: Role;
}

interface LoginResponse {
    accessToken: string;
}

interface ApiError {
    message: string;
}

const LoginForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>();

    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setLoading(true);
        setError("");

        try {
            const response = await axios.post<LoginResponse>(
                "https://dummyjson.com/auth/login",
                {
                    username: data.username,
                    password: data.password,
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            const result = response.data;

            dispatch(
                login({
                    token: result.accessToken,
                    role: data.role,
                    username: data.username,
                })
            );
            router.push("/dashboard");

        } catch (err) {
            if (axios.isAxiosError(err)) {
                const apiError = err.response?.data as ApiError;
                setError(apiError?.message || "Login failed");
            } else {
                setError("Network error, please try again");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">

                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-6 px-8 text-center">
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-blue-100">Please log in to continue</p>
                </div>

                <div className="p-8">
                    <form
                        className="flex flex-col gap-5"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                    >
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Username"
                                {...register("username", {
                                    required: "Username is required",
                                    minLength: { value: 3, message: "Min 3 characters" },
                                    maxLength: { value: 50, message: "Max 50 characters" },
                                })}
                                className="w-full px-4 pl-[40px] py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 peer"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 peer-focus:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            {errors.username && (
                                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        <div className="relative">
                            <input
                                type="password"
                                placeholder="Password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Min 6 characters" },
                                    maxLength: { value: 50, message: "Max 50 characters" },
                                })}
                                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 peer"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 peer-focus:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div className="relative">
                            <select
                                {...register("role", { required: "Please select a role" })}
                                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all duration-200 peer"
                            >
                                <option value="">Select role</option>
                                <option value="admin">Admin</option>
                                <option value="ta_member">TA Member</option>
                                <option value="panelist">Panelist</option>
                            </select>
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 peer-focus:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <FaAngleDown />
                            </div>
                            {errors.role && (
                                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {errors.role.message}
                                </p>
                            )}
                        </div>

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                                <p className="text-red-700 flex items-center gap-2">
                                    <MdErrorOutline />
                                    {error}
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <ImSpinner9 className="animate-spin" />
                                    Logging in...
                                </>
                            ) : (
                                <>
                                    <IoLogInOutline />
                                    Login
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;