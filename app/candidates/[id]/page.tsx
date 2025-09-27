"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import DashboardLayout from "../../dashboardLayout";

const INTERVIEW_STATUSES = ["Pending", "Completed", "Rejected"] as const;
const ROLES = ["admin", "panelist", "ta_member"] as const;

type InterviewStatus = typeof INTERVIEW_STATUSES[number];
type Role = typeof ROLES[number] | "";
type ActiveTab = "profile" | "schedule" | "feedback" | "manageRoles";

interface Candidate {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    interviewStatus: InterviewStatus;
    company?: {
        department?: string;
        title?: string;
    };
    address?: {
        city?: string;
        state?: string;
    };
}

interface Todo {
    id: number;
    todo: string;
    completed: boolean;
}

interface FeedbackPost {
    id: number;
    title: string;
    body: string;
}

interface FeedbackFormData {
    overallScore: number;
    strengths: string;
    improvement: string;
}

interface Permissions {
    canViewFeedback: boolean;
    canSubmitFeedback: boolean;
}

const CandidateDetail: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const candidateId = params.id;

    const [candidate, setCandidate] = useState<Candidate | null>(null);
    const [activeTab, setActiveTab] = useState<ActiveTab>("profile");
    const [todos, setTodos] = useState<Todo[]>([]);
    const [feedbacks, setFeedbacks] = useState<FeedbackPost[]>([]);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [userRole, setUserRole] = useState<Role>("");
    const [permissions, setPermissions] = useState<Permissions>({
        canViewFeedback: true,
        canSubmitFeedback: false,
    });
    const [saved, setSaved] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<FeedbackFormData>({ mode: "onChange" });

    useEffect(() => {
        const roleFromStorage = localStorage.getItem("role") as Role;
        if (roleFromStorage) {
            setUserRole(roleFromStorage);
        }
    }, []);

    // Fetch candidate info
    useEffect(() => {
        if (!candidateId) return;
        setIsLoading(true);
        fetch(`https://dummyjson.com/users/${candidateId}`)
            .then((res) => res.json())
            .then((data: Omit<Candidate, 'interviewStatus'> & { interviewStatus?: InterviewStatus }) => {
                if (!data.interviewStatus) {
                    data.interviewStatus =
                        INTERVIEW_STATUSES[
                        Math.floor(Math.random() * INTERVIEW_STATUSES.length)
                        ];
                }
                setCandidate(data as Candidate);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, [candidateId]);

    // Fetch schedule
    useEffect(() => {
        if (!candidateId) return;
        fetch(`https://dummyjson.com/todos/user/${candidateId}`)
            .then((res) => res.json())
            .then((data: { todos: Todo[] }) => setTodos(data.todos || []));
    }, [candidateId]);

    // Fetch feedback
    useEffect(() => {
        if (!candidateId) return;
        fetch(`https://dummyjson.com/posts/user/${candidateId}`)
            .then((res) => res.json())
            .then((data: { posts: FeedbackPost[] }) => setFeedbacks(data.posts || []));
    }, [candidateId]);

    const onSubmitFeedback: SubmitHandler<FeedbackFormData> = (data) => {
        const newPost: FeedbackPost = {
            id: Date.now(),
            title: `Score: ${data.overallScore}`,
            body: `Strengths: ${data.strengths}\nImprovement: ${data.improvement}`,
        };
        setFeedbacks([newPost, ...feedbacks]);
        reset();
        setShowFeedbackForm(false);
    };

    // Simulate saving permissions
    const handleSavePermissions = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000); // hide message after 3s
    };

    if (isLoading) return (
        <DashboardLayout>
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        </DashboardLayout>
    );

    if (!candidate) return <DashboardLayout>Loading...</DashboardLayout>;

    return (
        <DashboardLayout>
            <div className="p-6 bg-gray-50 min-h-screen">
                {/* Back & Feedback Button */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <button
                        onClick={() => router.push("/candidates")}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Candidates
                    </button>

                    {userRole === "panelist" && (
                        <button
                            onClick={() => setShowFeedbackForm(!showFeedbackForm)}
                            className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center shadow-sm hover:shadow-md"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            {showFeedbackForm ? "Cancel Feedback" : "Submit Feedback"}
                        </button>
                    )}
                </div>

                {/* Candidate Header */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
                            {candidate.firstName.charAt(0)}{candidate.lastName.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {candidate.firstName} {candidate.lastName}
                            </h2>
                            <div className="flex items-center gap-3 mt-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${candidate.interviewStatus === "Pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : candidate.interviewStatus === "Completed"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                    }`}>
                                    {candidate.interviewStatus}
                                </span>
                                <span className="text-sm text-gray-600">{candidate.company?.title || "Candidate"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feedback Form (Panelist Only) */}
                {showFeedbackForm && userRole === "panelist" && (
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-blue-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Submit Feedback
                        </h3>
                        <form onSubmit={handleSubmit(onSubmitFeedback)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Overall Score (1-10)</label>
                                <input
                                    type="number"
                                    placeholder="Enter score..."
                                    {...register("overallScore", {
                                        required: "Score is required",
                                        min: { value: 1, message: "Minimum score is 1" },
                                        max: { value: 10, message: "Maximum score is 10" },
                                        valueAsNumber: true,
                                    })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                                {errors.overallScore && (
                                    <p className="text-red-500 text-sm mt-1">{errors.overallScore.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Strengths</label>
                                <input
                                    type="text"
                                    placeholder="Candidate strengths..."
                                    {...register("strengths", {
                                        required: "Strengths are required",
                                        minLength: { value: 3, message: "At least 3 characters required" },
                                    })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                                {errors.strengths && (
                                    <p className="text-red-500 text-sm mt-1">{errors.strengths.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Areas for Improvement</label>
                                <input
                                    type="text"
                                    placeholder="Areas for improvement..."
                                    {...register("improvement", {
                                        required: "Improvement area is required",
                                        minLength: { value: 3, message: "At least 3 characters required" },
                                    })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                                {errors.improvement && (
                                    <p className="text-red-500 text-sm mt-1">{errors.improvement.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={!isValid}
                                className={`px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 ${isValid
                                    ? "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-sm hover:shadow-md"
                                    : "bg-gray-400 cursor-not-allowed"
                                    }`}
                            >
                                Submit Feedback
                            </button>
                        </form>
                    </div>
                )}

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-sm p-1 mb-6">
                    <div className="flex overflow-x-auto">
                        <button
                            onClick={() => setActiveTab("profile")}
                            className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === "profile"
                                ? "bg-blue-100 text-blue-700"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                }`}
                        >
                            Profile
                        </button>

                        <button
                            onClick={() => setActiveTab("schedule")}
                            className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === "schedule"
                                ? "bg-blue-100 text-blue-700"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                }`}
                        >
                            Schedule
                        </button>

                        <button
                            onClick={() => setActiveTab("feedback")}
                            className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === "feedback"
                                ? "bg-blue-100 text-blue-700"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                }`}
                        >
                            Feedback
                        </button>

                        {userRole === "admin" && (
                            <button
                                onClick={() => setActiveTab("manageRoles")}
                                className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === "manageRoles"
                                    ? "bg-blue-100 text-blue-700"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                    }`}
                            >
                                Manage Roles
                            </button>
                        )}
                    </div>
                </div>

                {/* Profile Tab */}
                {activeTab === "profile" && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Candidate Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500">Department</p>
                                    <p className="text-gray-900 font-medium">{candidate.company?.department || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Role</p>
                                    <p className="text-gray-900 font-medium">{candidate.company?.title || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="text-gray-900 font-medium">{candidate.email}</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500">Phone</p>
                                    <p className="text-gray-900 font-medium">{candidate.phone}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <p className="text-gray-900 font-medium">{candidate.interviewStatus}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Location</p>
                                    <p className="text-gray-900 font-medium">{candidate.address?.city || "N/A"}, {candidate.address?.state || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Schedule Tab */}
                {activeTab === "schedule" && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Schedule</h3>
                        {todos.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p>No tasks/interviews scheduled.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {todos.map((todo) => (
                                    <div key={todo.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center">
                                            <div className={`h-3 w-3 rounded-full mr-4 ${todo.completed ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                            <span className={todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}>
                                                {todo.todo}
                                            </span>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${todo.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {todo.completed ? "Completed" : "Pending"}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Feedback Tab */}
                {activeTab === "feedback" && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Candidate Feedback</h3>
                        {feedbacks.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                                <p>No feedback yet.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {feedbacks.map((f) => (
                                    <div key={f.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                        <h4 className="font-semibold text-blue-600 mb-2">{f.title}</h4>
                                        <p className="text-gray-700 whitespace-pre-line">{f.body}</p>
                                        <div className="flex items-center mt-3 text-sm text-gray-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {new Date().toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "manageRoles" && userRole === "admin" && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Manage Roles & Permissions</h3>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Role</label>
                            <select
                                value={userRole}
                                onChange={(e) => {
                                    setUserRole(e.target.value as Role);
                                    setPermissions({ canViewFeedback: true, canSubmitFeedback: false });
                                    setSaved(false);
                                }}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            >
                                <option value="">-- Select Role --</option>
                                {ROLES.map((r) => (
                                    <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1).replace('_', ' ')}</option>
                                ))}
                            </select>
                        </div>

                        {userRole && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                <h4 className="font-medium text-blue-800 mb-2">Default Permissions for {userRole}</h4>
                                <ul className="text-sm text-blue-700 space-y-1">
                                    <li className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Can view feedback
                                    </li>
                                    <li className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Cannot submit feedback
                                    </li>
                                </ul>
                            </div>
                        )}

                        {userRole && (
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={handleSavePermissions}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 shadow-sm hover:shadow-md"
                                >
                                    Save Permissions
                                </button>

                                {saved && (
                                    <div className="flex items-center text-green-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Permissions saved successfully!
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default CandidateDetail;