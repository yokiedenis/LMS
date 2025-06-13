// import { auth } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';
// import { getAnalytics } from '@/actions/get-analytics';
// import { DataCard } from './_components/data-card';
// import { Chart } from './_components/chart';
// import { UserDetails } from './_components/user-details';

// const AnalyticsPage = async () => {
//     const { userId } = await auth();
//     if (!userId) {
//         return redirect('/');
//     }

//     const {
//         data,
//         totalRevenue,
//         totalSales,
//         totalUsers,
//         totalEnrolledCourses, // Destructure the new field
//         userDetails,
//     } = await getAnalytics(userId);

//     return (
//         <div className='p-6'>
//             <div className='grid grid-cols-1 gap-4 mb-4 md:grid-cols-2 lg:grid-cols-4'>
//                 <DataCard
//                     label="Total Revenue"
//                     value={totalRevenue}
//                     shouldFormat
//                 />
//                 <DataCard
//                     label="Total Sales"
//                     value={totalSales}
//                     shouldFormat={false}
//                 />
//                 <DataCard
//                     label="Total Users"
//                     value={totalUsers}
//                     shouldFormat={false}
//                 />

//                 <DataCard
//                     label="Total Enrolled Courses"
//                     value={totalEnrolledCourses}
//                     shouldFormat={false}
//                 />

//             </div>
//             <UserDetails userDetails={userDetails} />
//             <Chart data={data} />
            
//         </div>
//     )
// }

// export default AnalyticsPage;





// import { auth } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';
// import { getAnalytics } from '@/actions/get-analytics';
// import { DataCard } from './_components/data-card';
// import { Chart } from './_components/chart';
// import { UserDetails } from './_components/user-details';
// import { ProgressDistribution } from './_components/progress-distribution';
// import { RecentActivity } from './_components/recent-activity';
// import { RevenueTrend } from './_components/revenue-trend';
// import { TopCourses } from './_components/top-courses';

// const AnalyticsPage = async () => {
//     const { userId } = await auth();
//     if (!userId) {
//         return redirect('/');
//     }

//     const {
//         data,
//         totalRevenue,
//         totalSales,
//         totalUsers,
//         totalEnrolledCourses,
//         userDetails,
//         recentActivity,
//         courseProgressData,
//         revenueTrendData,
//         topCourses
//     } = await getAnalytics(userId);

//     return (
//         <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//                 <DataCard
//                     label="Total Revenue"
//                     value={totalRevenue}
//                     shouldFormat
//                     icon="dollar"
//                     trend="up"
//                     trendValue="12%"
//                     description="From last month"
//                 />
//                 <DataCard
//                     label="Total Sales"
//                     value={totalSales}
//                     shouldFormat={false}
//                     icon="cart"
//                     trend="up"
//                     trendValue="8%"
//                     description="From last month"
//                 />
//                 <DataCard
//                     label="Total Users"
//                     value={totalUsers}
//                     shouldFormat={false}
//                     icon="users"
//                     trend="up"
//                     trendValue="15%"
//                     description="From last month"
//                 />
//                 <DataCard
//                     label="Courses Enrolled"
//                     value={totalEnrolledCourses}
//                     shouldFormat={false}
//                     icon="book"
//                     trend="up"
//                     trendValue="22%"
//                     description="From last month"
//                 />
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 <div className="lg:col-span-2 space-y-6">
//                     <RevenueTrend data={revenueTrendData} />
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <Chart data={data} title="Course Earnings" />
//                         <TopCourses data={topCourses} />
//                     </div>
//                 </div>
//                 <div className="space-y-6">
//                     <ProgressDistribution data={courseProgressData} />
//                     <RecentActivity data={recentActivity} />
//                 </div>
//             </div>

//             <UserDetails userDetails={userDetails} />
//         </div>
//     )
// }

// export default AnalyticsPage;


// import { auth } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';
// import { getAnalytics } from '@/actions/get-analytics';
// import { DataCard } from './_components/data-card';
// import { Chart } from './_components/chart';
// import { UserDetails } from './_components/user-details';
// import { ProgressDistribution } from './_components/progress-distribution';
// import { RecentActivity } from './_components/recent-activity';
// import { RevenueTrend } from './_components/revenue-trend';
// import { TopCourses } from './_components/top-courses';

// const AnalyticsPage = async () => {
//     const { userId } = await auth();
//     if (!userId) {
//         return redirect('/');
//     }

//     const {
//         data,
//         totalRevenue,
//         totalSales,
//         totalUsers,
//         totalEnrolledCourses,
//         userDetails,
//         recentActivity,
//         courseProgressData,
//         revenueTrendData,
//         topCourses
//     } = await getAnalytics(userId);

//     return (
//         <div className="p-8 space-y-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//                 <DataCard
//                     label="Total Revenue"
//                     value={totalRevenue}
//                     shouldFormat
//                     icon="dollar"
//                     trend="up"
//                     trendValue="12%"
//                     description="From last month"
//                     className="bg-gradient-to-r from-blue-500 to-blue-600 text-white"
//                 />
//                 <DataCard
//                     label="Total Sales"
//                     value={totalSales}
//                     shouldFormat={false}
//                     icon="cart"
//                     trend="up"
//                     trendValue="8%"
//                     description="From last month"
//                     className="bg-gradient-to-r from-purple-500 to-purple-600 text-white"
//                 />
//                 <DataCard
//                     label="Total Users"
//                     value={totalUsers}
//                     shouldFormat={false}
//                     icon="users"
//                     trend="up"
//                     trendValue="15%"
//                     description="From last month"
//                     className="bg-gradient-to-r from-green-500 to-green-600 text-white"
//                 />
//                 <DataCard
//                     label="Courses Enrolled"
//                     value={totalEnrolledCourses}
//                     shouldFormat={false}
//                     icon="book"
//                     trend="up"
//                     trendValue="22%"
//                     description="From last month"
//                     className="bg-gradient-to-r from-pink-500 to-pink-600 text-white"
//                 />
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 <div className="lg:col-span-2 space-y-8">
//                     <RevenueTrend data={revenueTrendData} className="bg-white rounded-lg shadow-lg p-6" />
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                         <Chart data={data} title="Course Earnings" className="bg-white rounded-lg shadow-lg p-6" />
//                         <TopCourses data={topCourses} className="bg-white rounded-lg shadow-lg p-6" />
//                     </div>
//                 </div>
//                 <div className="space-y-8">
//                     <ProgressDistribution data={courseProgressData} className="bg-white rounded-lg shadow-lg p-6" />
//                     <RecentActivity data={recentActivity} className="bg-white rounded-lg shadow-lg p-6" />
//                 </div>
//             </div>

//             <UserDetails userDetails={userDetails} className="bg-white rounded-lg shadow-lg p-6" />
//         </div>
//     )
// }

// export default AnalyticsPage;



import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getAnalytics } from '@/actions/get-analytics';
import { DataCard } from './_components/data-card';
import { Chart } from './_components/chart';
import { UserDetails } from './_components/user-details';
import { ProgressDistribution } from './_components/progress-distribution';
import { RecentActivity } from './_components/recent-activity';
import { RevenueTrend } from './_components/revenue-trend';
import { TopCourses } from './_components/top-courses';

const AnalyticsPage = async () => {
    const { userId } = await auth();
    if (!userId) {
        return redirect('/');
    }

    const {
        data,
        totalRevenue,
        totalSales,
        totalUsers,
        totalEnrolledCourses,
        userDetails,
        recentActivity,
        courseProgressData,
        revenueTrendData,
        topCourses
    } = await getAnalytics(userId);

    return (
        <div className="p-8 space-y-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <DataCard
                    label="Total Revenue"
                    value={totalRevenue}
                    shouldFormat
                    icon="dollar"
                    trend="up"
                    trendValue="12%"
                    description="From last month"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                />
                <DataCard
                    label="Total Sales"
                    value={totalSales}
                    shouldFormat={false}
                    icon="cart"
                    trend="up"
                    trendValue="8%"
                    description="From last month"
                    className="bg-gradient-to-r from-purple-500 to-purple-600 text-white"
                />
                <DataCard
                    label="Total Users"
                    value={totalUsers}
                    shouldFormat={false}
                    icon="users"
                    trend="up"
                    trendValue="15%"
                    description="From last month"
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white"
                />
                <DataCard
                    label="Courses Enrolled"
                    value={totalEnrolledCourses}
                    shouldFormat={false}
                    icon="book"
                    trend="up"
                    trendValue="22%"
                    description="From last month"
                    className="bg-gradient-to-r from-pink-500 to-pink-600 text-white"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <RevenueTrend data={revenueTrendData} className="bg-white rounded-lg shadow-lg p-6" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Chart data={data} title="Course Earnings" className="bg-white rounded-lg shadow-lg p-6" />
                        <TopCourses data={topCourses} className="bg-white rounded-lg shadow-lg p-6" />
                    </div>
                </div>
                <div className="space-y-8">
                    <ProgressDistribution data={courseProgressData} className="bg-white rounded-lg shadow-lg p-6" />
                    <RecentActivity data={recentActivity} className="bg-white rounded-lg shadow-lg p-6" />
                </div>
            </div>

            <UserDetails userDetails={userDetails} className="bg-white rounded-lg shadow-lg p-6" />
        </div>
    )
}

export default AnalyticsPage;




 