"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import KPICard from "../components/KPICard/KPICard";
import axios from "axios";
import DashboardLayout from "../dashboardLayout";

interface Company {
    title?: string;
}

interface Candidate {
    id: number | string;
    firstName: string;
    lastName: string;
    email: string;
    company?: Company;
}

interface KpiState {
    interviewsThisWeek: number;
    averageFeedback: number;
    noShows: number;
}

interface FilterState {
    roleFilter: string;
    interviewer: string;
    dateRange: string;
}

const Dashboard: React.FC = () => {
    const [role, setRole] = useState<string | null>(null);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [filters, setFilters] = useState<FilterState>({
        roleFilter: "",
        interviewer: "",
        dateRange: "",
    });

    const [kpis, setKpis] = useState<KpiState>({
        interviewsThisWeek: 0,
        averageFeedback: 0,
        noShows: 0,
    });

    useEffect(() => {
        setRole(localStorage.getItem("role"));

        axios.get<{ users: Candidate[] }>("https://dummyjson.com/users").then((res) => {
            setCandidates(res.data.users);

            const interviewsThisWeek = res.data.users.length;
            const averageFeedback = 4.2;
            const noShows = 2;

            setKpis({ interviewsThisWeek, averageFeedback, noShows });
        });
    }, []);

    const handleFilterChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <DashboardLayout>
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
                        <p className="text-gray-600 mt-2">Welcome back! Here&apos;s your overview</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full capitalize">
                            {role?.replace('_', ' ') || "User"}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <KPICard
                        title="Interviews This Week"
                        value={kpis.interviewsThisWeek}
                        icon="📅"
                        trend={{ value: 12, positive: true }}
                        color="blue"
                    />
                    <KPICard
                        title="Average Feedback Score"
                        value={kpis.averageFeedback}
                        icon="⭐"
                        trend={{ value: 0.3, positive: true }}
                        color="green"
                    />
                    <KPICard
                        title="No-Shows"
                        value={kpis.noShows}
                        icon="❌"
                        trend={{ value: 1, positive: false }}
                        color="red"
                    />
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Role Filter
                            </label>
                            <select
                                name="roleFilter"
                                value={filters.roleFilter}
                                onChange={handleFilterChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            >
                                <option value="">All Roles</option>
                                <option value="admin">Admin</option>
                                <option value="ta_member">TA Member</option>
                                <option value="panelist">Panelist</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Interviewer
                            </label>
                            <input
                                type="text"
                                name="interviewer"
                                placeholder="Search interviewer..."
                                value={filters.interviewer}
                                onChange={handleFilterChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date Range
                            </label>
                            <input
                                type="date"
                                name="dateRange"
                                value={filters.dateRange}
                                onChange={handleFilterChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Candidates</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Name</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Role</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {candidates.slice(0, 5).map((candidate, index) => (
                                    <tr key={candidate.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-semibold mr-3">
                                                    {candidate.firstName.charAt(0)}{candidate.lastName.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{candidate.firstName} {candidate.lastName}</p>
                                                    <p className="text-sm text-gray-600">{candidate.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                {candidate.company?.title || "Candidate"}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${index % 3 === 0 ? 'bg-green-100 text-green-800' : index % 3 === 1 ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                                                {index % 3 === 0 ? 'Completed' : index % 3 === 1 ? 'Pending' : 'Scheduled'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-gray-600">
                                            {new Date().toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;