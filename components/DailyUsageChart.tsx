'use client';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface DailyUsageChartProps {
    data: { hour: string; users: number }[];
}

export const DailyUsageChart = ({ data }: DailyUsageChartProps) => {
    return (
        <div className="border rounded-lg p-4 bg-[#2C2C2C]"> {/* Dark background for the chart container */}
            <ResponsiveContainer width="100%" height={350}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444444" /> {/* Subtle grid lines */}
                    <XAxis 
                        dataKey="hour" 
                        stroke="#FFFFFF" // White color for axis ticks
                        axisLine={{ stroke: '#FFFFFF' }} // White axis line
                    />
                    <YAxis 
                        stroke="#FFFFFF" // White color for axis ticks
                        axisLine={{ stroke: '#FFFFFF' }} // White axis line
                    />
                    <Tooltip contentStyle={{ backgroundColor: '#444444', color: '#FFFFFF' }} /> {/* Custom tooltip style */}
                    <Line 
                        type="monotone" 
                        dataKey="users" 
                        stroke="#82ca9d" // Line color
                        strokeWidth={2} // Adjust stroke width for visibility
                        activeDot={{ r: 8 }} // Highlighted dot on hover
                        animationDuration={500} // Animation duration for the line
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
