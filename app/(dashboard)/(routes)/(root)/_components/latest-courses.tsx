// app/(dashboard)/(routes)/(root)/_components/latest-courses.tsx
"use client"; // Mark this component as a client component

import React from 'react';

interface LatestCourse {
    title: string;
    description: string;
    imageUrl: string;
}

interface LatestCoursesProps {
    courses: LatestCourse[];
}

const LatestCourses: React.FC<LatestCoursesProps> = ({ courses }) => {
    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Latest Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course, index) => (
                    <div key={index} className="border p-4 rounded-lg shadow">
                        <img src={course.imageUrl} alt={course.title} className="w-full h-32 object-cover rounded mb-2" />
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-gray-600">{course.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestCourses; // Ensure you are using 'default' export
