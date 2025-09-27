"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import DashboardLayout from "../dashboardLayout";
import CandidateCard from "../components/CandidateCard";

const ITEMS_PER_PAGE = 12;
const INTERVIEW_STATUSES = ["Pending", "Completed", "Rejected"] as const;

type InterviewStatus = typeof INTERVIEW_STATUSES[number];

interface Company {
    department?: string;
    title?: string;
}

interface Candidate {
    id: string | number;
    firstName: string;
    lastName: string;
    company?: Company;
    interviewStatus: InterviewStatus;
}

type SortField = "firstName" | "department" | "role" | "interviewStatus";

const Candidates: React.FC = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState<SortField>("firstName");

    const [filterDepartment, setFilterDepartment] = useState("");
    const [filterRole, setFilterRole] = useState("");
    const [filterStatus, setFilterStatus] = useState<InterviewStatus | "">("");

    useEffect(() => {
        fetch("https://dummyjson.com/users?limit=208")
            .then((res) => res.json())
            .then((data) => {
                const usersWithStatus: Candidate[] = data.users.map((user: any) => {
                    if (!user.interviewStatus) {
                        user.interviewStatus =
                            INTERVIEW_STATUSES[
                            Math.floor(Math.random() * INTERVIEW_STATUSES.length)
                            ];
                    }
                    return user;
                });
                setCandidates(usersWithStatus);
            });
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
            setCurrentPage(1);
        }, 300);
        return () => clearTimeout(handler);
    }, [search]);

    const filteredCandidates = candidates.filter((c) => {
        const query = debouncedSearch.toLowerCase();

        const matchesSearch =
            c.firstName.toLowerCase().includes(query) ||
            c.lastName.toLowerCase().includes(query) ||
            c.company?.department?.toLowerCase().includes(query) ||
            c.company?.title?.toLowerCase().includes(query) ||
            c.interviewStatus.toLowerCase().includes(query);

        const matchesDepartment =
            !filterDepartment || c.company?.department === filterDepartment;

        const matchesRole = !filterRole || c.company?.title === filterRole;

        const matchesStatus =
            !filterStatus || c.interviewStatus === filterStatus;

        return matchesSearch && matchesDepartment && matchesRole && matchesStatus;
    });

    const sortedCandidates = [...filteredCandidates].sort((a, b) => {
        let valA: string, valB: string;

        switch (sortField) {
            case "firstName":
                valA = a.firstName.toLowerCase();
                valB = b.firstName.toLowerCase();
                break;
            case "department":
                valA = (a.company?.department || "").toLowerCase();
                valB = (b.company?.department || "").toLowerCase();
                break;
            case "role":
                valA = (a.company?.title || "").toLowerCase();
                valB = (b.company?.title || "").toLowerCase();
                break;
            case "interviewStatus":
                valA = a.interviewStatus.toLowerCase();
                valB = b.interviewStatus.toLowerCase();
                break;
            default:
                valA = "";
                valB = "";
        }

        if (valA < valB) return -1;
        if (valA > valB) return 1;
        return 0;
    });

    const totalPages = Math.ceil(sortedCandidates.length / ITEMS_PER_PAGE);
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedCandidates = sortedCandidates.slice(
        start,
        start + ITEMS_PER_PAGE
    );

    const departments = [
        ...new Set(candidates.map((c) => c.company?.department).filter(Boolean)),
    ];
    const roles = [
        ...new Set(candidates.map((c) => c.company?.title).filter(Boolean)),
    ];

    return (
        <DashboardLayout>
            <h2 className="text-2xl font-bold mb-4">Candidates</h2>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    className="border p-2 rounded w-full md:w-1/3"
                />

                <select
                    value={sortField}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setSortField(e.target.value as SortField)}
                    className="border p-2 rounded"
                >
                    <option value="firstName">Name</option>
                    <option value="department">Department</option>
                    <option value="role">Role</option>
                    <option value="interviewStatus">Interview Status</option>
                </select>

                <select
                    value={filterDepartment}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterDepartment(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">All Departments</option>
                    {departments.map((dep) => (
                        <option key={dep} value={dep}>
                            {dep}
                        </option>
                    ))}
                </select>

                <select
                    value={filterRole}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterRole(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">All Roles</option>
                    {roles.map((r) => (
                        <option key={r} value={r}>
                            {r}
                        </option>
                    ))}
                </select>

                <select
                    value={filterStatus}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterStatus(e.target.value as InterviewStatus | "")}
                    className="border p-2 rounded"
                >
                    <option value="">All Status</option>
                    {INTERVIEW_STATUSES.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedCandidates.map((c) => (
                    <CandidateCard key={c.id} candidate={c} />
                ))}
            </div>

            <div className="flex justify-center items-center gap-4 mt-6">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </DashboardLayout>
    );
};

export default Candidates;