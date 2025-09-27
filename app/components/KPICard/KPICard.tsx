import React from 'react';

interface Trend {
    value: number;
    positive: boolean;
}

interface KPICardProps {
    title: string;
    value: number | string;
    icon: string;
    trend: Trend;
    color: 'blue' | 'green' | 'red';
}

const colorClasses = {
    blue: 'from-blue-500 to-indigo-600',
    green: 'from-green-500 to-emerald-600',
    red: 'from-red-500 to-rose-600',
};

const KPICard: React.FC<KPICardProps> = ({ title, value, icon, trend, color }) => {
    return (
        <div className={`bg-white rounded-xl shadow-sm p-6 border-l-4 border-${color}-500`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
                </div>
                <div className={`text-2xl p-3 rounded-full bg-gradient-to-br ${colorClasses[color]} text-white`}>
                    {icon}
                </div>
            </div>
            <div className={`flex items-center mt-4 text-sm ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {trend.positive ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />}
                </svg>
                <span>{trend.value}% vs last week</span>
            </div>
        </div>
    );
};

export default KPICard;
