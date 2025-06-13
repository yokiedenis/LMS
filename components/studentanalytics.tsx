'use client';

import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Define props for StudentAnalytics component
interface StudentAnalyticsProps {
  studentId: string;
}

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const StudentAnalytics: React.FC<StudentAnalyticsProps> = ({ studentId }) => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [selectedView, setSelectedView] = useState('summary');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!studentId) {
      console.error('Student ID is missing');
      return;
    }

    async function fetchData() {
      try {
        const response = await fetch(`/api/analytics?studentId=${studentId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const studentData = await response.json();
        setAnalytics(studentData);
      } catch (error) {
        console.error('Failed to fetch student analytics:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [studentId]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!analytics) {
    return <div className="flex justify-center items-center h-screen">No data available</div>;
  }

  const views = [
    { key: 'summary', label: 'Summary' },
    { key: 'timeSpent', label: 'Time Spent' },
    { key: 'progress', label: 'Course Progress' },
    { key: 'certificates', label: 'Certificates' },
    { key: 'payments', label: 'Payments' },
  ];

  const SummaryView = () => (
    <div>
      <p>Time Spent: {analytics.timeSpent} hours</p>
      <p>Courses Enrolled: {analytics.coursesEnrolled}</p>
      <p>Last Login: {new Date(analytics.lastLogin).toLocaleString()}</p>
      <p>Student Level: {analytics.studentLevel}</p>
      <p>Certificates Earned: {analytics.certificatesEarned}</p>
      <p>Total Amount Paid: ${analytics.amountPaid.toFixed(2)}</p>
    </div>
  );

  const TimeSpentView = () => (
    <div>
      <Pie 
        data={{
          labels: analytics.currentChapters.map((chapter: any) => chapter.chapterTitle),
          datasets: [{
            label: 'Time Spent',
            data: analytics.currentChapters.map(() => 1), // Use actual data when available
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            borderColor: '#fff',
            borderWidth: 1,
          }],
        }}
      />
      <p>Note: Placeholder pie chart for the distribution of time spent across chapters.</p>
    </div>
  );

  const ProgressView = () => (
    <ul>
      {analytics.currentChapters.map((chapter: any) => (
        <li key={chapter.courseId}>{chapter.courseTitle} - Current Chapter: {chapter.chapterTitle}</li>
      ))}
    </ul>
  );

  const CertificatesView = () => (
    <p>Certificates Earned: {analytics.certificatesEarned}</p>
  );

  const PaymentsView = () => (
    <div>
      <p>Total Amount Paid: ${analytics.amountPaid.toFixed(2)}</p>
      <ul>
        {analytics.enrollmentDates.map((enrollment: any, index: number) => (
          <li key={index}>
            {enrollment.courseTitle}: {enrollment.date} - ${enrollment.amount}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="student-analytics">
      <h2>Student Analytics</h2>
      <div>
        {views.map((view) => (
          <button key={view.key} onClick={() => setSelectedView(view.key)} className="m-2">
            {view.label}
          </button>
        ))}
      </div>

      <div>
        {selectedView === 'summary' && <SummaryView />}
        {selectedView === 'timeSpent' && <TimeSpentView />}
        {selectedView === 'progress' && <ProgressView />}
        {selectedView === 'certificates' && <CertificatesView />}
        {selectedView === 'payments' && <PaymentsView />}
      </div>
    </div>
  );
};

export default StudentAnalytics;












 







 