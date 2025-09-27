import { useRouter } from 'next/navigation';
import React from 'react';

interface Company {
    department?: string;
    title?: string;
}

interface Candidate {
    id: string | number;
    firstName: string;
    lastName: string;
    interviewStatus: 'Pending' | 'Completed' | 'Rejected';
    company?: Company;
    email?: string;
}

interface CandidateCardProps {
    candidate: Candidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
    const router = useRouter();

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden group">
            <div className="p-6">
                {/* Header with name and status */}
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {candidate.firstName} {candidate.lastName}
                    </h3>
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${candidate.interviewStatus === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : candidate.interviewStatus === "Completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                    >
                        {candidate.interviewStatus}
                    </span>
                </div>

                {/* Candidate details */}
                <div className="space-y-3">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m2-12h2m-2 0h-2m2 6h2m-2 0h-2" />
                        </svg>
                        <div>
                            <p className="text-sm text-gray-500">Department</p>
                            <p className="text-gray-900">
                                {candidate.company?.department ?? "-"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <div>
                            <p className="text-sm text-gray-500">Role</p>
                            <p className="text-gray-900">
                                {candidate.company?.title ?? "-"}
                            </p>
                        </div>
                    </div>

                    {candidate.email && (
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="text-gray-900 truncate">{candidate.email}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Action buttons */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <button
                    onClick={() => router.push(`/candidates/${candidate.id}`)}
                    className="w-full bg-white text-blue-600 hover:bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center group/btn"
                >
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default CandidateCard;