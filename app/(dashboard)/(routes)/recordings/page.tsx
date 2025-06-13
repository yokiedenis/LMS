//app/(dashboard)/(routes)/recordings/page.tsx

// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Video } from "lucide-react";
// import { useUser } from "@clerk/nextjs";
// import { Select } from "@/components/sort";

// interface Recording {
//   id: string;
//   title: string;
//   description?: string;
//   url: string;
//   uploadedAt: Date;
//   courseId: string | null; // Updated to allow null
// }

// export default function RecordingsPage() {
//   const { user } = useUser();
//   const [recordings, setRecordings] = useState<Recording[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [sortOrder, setSortOrder] = useState<"title" | "date" | "course">("date"); // Default sort by date

//   useEffect(() => {
//     const fetchRecordings = async () => {
//       try {
//         const response = await fetch("/api/recordings", {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch recordings");
//         }

//         const data = await response.json();
//         setRecordings(data);
//       } catch (error) {
//         console.error("Error fetching recordings:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecordings();
//   }, []);

//   // Sorting function for recordings
//   const sortRecordings = (recordings: Recording[]) => {
//     return [...recordings].sort((a, b) => {
//       switch (sortOrder) {
//         case "title":
//           return a.title.localeCompare(b.title);
//         case "date":
//           return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
//         case "course":
//           // Handle null or undefined courseId by using an empty string as default
//           const courseIdA = a.courseId || "";
//           const courseIdB = b.courseId || "";
//           return courseIdA.localeCompare(courseIdB);
//         default:
//           return 0;
//       }
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-[#F5F7FA]">
//         <p className="text-gray-600 text-lg">Loading recordings...</p>
//       </div>
//     );
//   }

//   if (!recordings.length) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen bg-[#F5F7FA] text-center">
//         <Video className="w-16 h-16 text-[#34C759] mb-4" />
//         <h2 className="text-2xl font-bold text-[#1F2A44]">No Recordings Available</h2>
//         <p className="text-[#6B7280] mt-2">Check back later for new recordings!</p>
//       </div>
//     );
//   }

//   // Define options for the Select component
//   const sortOptions: { value: "title" | "date" | "course"; label: string }[] = [
//     { value: "date", label: "Sort by Date" },
//     { value: "title", label: "Sort by Title" },
//     { value: "course", label: "Sort by Course" },
//   ];

//   return (
//     <div className="min-h-screen bg-[#F5F7FA] p-6">
//       {/* <h1 className="text-3xl font-bold text-[#1F2A44] mb-8 flex items-center">
//         <Video className="w-8 h-8 mr-2 text-[#34C759]" />
//         Recordings Library
//       </h1> */}

//       {/* Sorting Control */}
//       <div className="mb-8">
//         <div className="bg-white rounded-xl shadow-lg border border-[#E5E7EB] p-4 flex items-center justify-between transition-all duration-300 hover:shadow-xl">
//           <label htmlFor="sort-recordings" className="text-sm font-medium text-[#1F2A44] mr-4">
//             Sort by
//           </label>
//           <Select
//             value={sortOrder}
//             onChange={setSortOrder}
//             options={sortOptions}
//             id="sort-recordings"
//             name="sort-recordings"
//             onBlur={() => {}}
//           />
//         </div>
//       </div>

//       {/* Recordings Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {sortRecordings(recordings).map((recording) => (
//           <Card
//             key={recording.id}
//             className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-[#E5E7EB]"
//           >
//             <CardHeader className="p-4 bg-gradient-to-r from-[#34C759]/10 to-[#E5E7EB] text-[#1F2A44]">
//               <CardTitle className="text-lg font-semibold flex items-center">
//                 <Video className="w-5 h-5 mr-2 text-[#34C759]" />
//                 {recording.title}
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               <p className="text-[#6B7280] text-sm mb-4">
//                 {recording.description || "No description available"}
//               </p>
//               <p className="text-xs text-[#6B7280] mb-2">
//                 Uploaded: {new Date(recording.uploadedAt).toLocaleDateString()}
//               </p>
//               <a
//                 href={recording.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center px-4 py-2 bg-[#34C759] text-white rounded-lg hover:bg-[#2ea44f] transition-colors"
//               >
//                 <Video className="w-4 h-4 mr-2" />
//                 Watch Now
//               </a>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }







"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Select } from "@/components/sort";

interface Recording {
  id: string;
  title: string;
  description?: string;
  url: string;
  uploadedAt: Date;
  courseId: string | null; // Updated to allow null
}

export default function RecordingsPage() {
  const { user } = useUser();
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"title" | "date" | "course">("date"); // Default sort by date
  const [hasPurchased, setHasPurchased] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const response = await fetch("/api/recordings", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch recordings");
        }

        const data = await response.json();
        setRecordings(data);
      } catch (error) {
        console.error("Error fetching recordings:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPurchaseStatus = async () => {
      if (!user?.id) return;

      try {
        const response = await fetch(`/api/purchases/coursecheck?userId=${user.id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch purchase status");
        }

        const data = await response.json();
        setHasPurchased(data.hasPurchased);
      } catch (error) {
        console.error("Error fetching purchase status:", error);
      }
    };

    fetchRecordings();
    fetchPurchaseStatus();
  }, [user?.id]);

  // Sorting function for recordings
  const sortRecordings = (recordings: Recording[]) => {
    return [...recordings].sort((a, b) => {
      switch (sortOrder) {
        case "title":
          return a.title.localeCompare(b.title);
        case "date":
          return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
        case "course":
          // Handle null or courseId by using an empty string as default
          const courseIdA = a.courseId || "";
          const courseIdB = b.courseId || "";
          return courseIdA.localeCompare(courseIdB);
        default:
          return 0;
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F5F7FA]">
        <p className="text-gray-600 text-lg">Loading recordings...</p>
      </div>
    );
  }

  if (!recordings.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#F5F7FA] text-center">
        <Video className="w-16 h-16 text-[#34C759] mb-4" />
        <h2 className="text-2xl font-bold text-[#1F2A44]">No Recordings Available</h2>
        <p className="text-[#6B7280] mt-2">Check back later for new recordings!</p>
      </div>
    );
  }

  // Define options for the Select component
  const sortOptions: { value: "title" | "date" | "course"; label: string }[] = [
    { value: "date", label: "Sort by Date" },
    { value: "title", label: "Sort by Title" },
    { value: "course", label: "Sort by Course" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-6">
      {/* Sorting Control */}
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-lg border border-[#E5E7EB] p-4 flex items-center justify-between transition-all duration-300 hover:shadow-xl">
          <label htmlFor="sort-recordings" className="text-sm font-medium text-[#1F2A44] mr-4">
            Sort by
          </label>
          <Select
            value={sortOrder}
            onChange={setSortOrder}
            options={sortOptions}
            id="sort-recordings"
            name="sort-recordings"
            onBlur={() => {}}
          />
        </div>
      </div>

      {/* Recordings Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortRecordings(recordings).map((recording) => (
          <Card
            key={recording.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-[#E5E7EB]"
          >
            <CardHeader className="p-4 bg-gradient-to-r from-[#34C759]/10 to-[#E5E7EB] text-[#1F2A44]">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Video className="w-5 h-5 mr-2 text-[#34C759]" />
                {recording.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-[#6B7280] text-sm mb-4">
                {recording.description || "No description available"}
              </p>
              <p className="text-xs text-[#6B7280] mb-2">
                Uploaded: {new Date(recording.uploadedAt).toLocaleDateString()}
              </p>
              {hasPurchased ? (
                <a
                  href={recording.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-[#34C759] text-white rounded-lg hover:bg-[#2ea44f] transition-colors"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Watch Now
                </a>
              ) : (
                <a href="/search">
              <button
          className="inline-flex items-center px-4 py-2 bg-[#EF4444] text-white rounded-lg hover:bg-[#DC2626] transition-colors"
          onClick={() => alert("Please purchase the course to access the recordings.")}
             >
                     <Video className="w-4 h-4 mr-2" />
                    Purchase to Watch
                   </button>
                       </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}













































































// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Video } from "lucide-react";
// import { useUser } from "@clerk/nextjs";
// import { Select } from "@/components/sort";

// interface Recording {
//   id: string;
//   title: string;
//   description?: string;
//   url: string;
//   uploadedAt: Date;
//   courseId: string | null;
// }

// export default function RecordingsPage() {
//   const { user } = useUser();
//   const [recordings, setRecordings] = useState<Recording[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [sortOrder, setSortOrder] = useState<"title" | "date" | "course">("date");

//   useEffect(() => {
//     const fetchRecordings = async () => {
//       try {
//         const response = await fetch("/api/recordings", {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch recordings");
//         }

//         const data = await response.json();
//         setRecordings(data);
//       } catch (error) {
//         console.error("Error fetching recordings:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecordings();
//   }, []);

//   const sortRecordings = (recordings: Recording[]) => {
//     return [...recordings].sort((a, b) => {
//       switch (sortOrder) {
//         case "title":
//           return a.title.localeCompare(b.title);
//         case "date":
//           return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
//         case "course":
//           const courseIdA = a.courseId || "";
//           const courseIdB = b.courseId || "";
//           return courseIdA.localeCompare(courseIdB);
//         default:
//           return 0;
//       }
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//         <div className="flex items-center space-x-3">
//           <div className="w-8 h-8 border-4 border-t-[#34C759] border-gray-200 rounded-full animate-spin"></div>
//           <p className="text-lg font-medium text-gray-700">Loading recordings...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!recordings.length) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-center">
//         <Video className="w-20 h-20 text-[#34C759] mb-6 animate-pulse" />
//         <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">No Recordings Available</h2>
//         <p className="text-gray-500 mt-3 text-lg max-w-md">
//           It looks like there are no recordings yet. Stay tuned for exciting content coming your way!
//         </p>
//       </div>
//     );
//   }

//   const sortOptions: { value: "title" | "date" | "course"; label: string }[] = [
//     { value: "date", label: "Sort by Date" },
//     { value: "title", label: "Sort by Title" },
//     { value: "course", label: "Sort by Course" },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
//       {/* Header */}

//       {/* Sorting Control */}
//       <div className="max-w-7xl mx-auto mb-10">
//         <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between border border-gray-200 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
//           <label
//             htmlFor="sort-recordings"
//             className="text-sm font-semibold text-gray-800 tracking-wide"
//           >
//             Sort Recordings
//           </label>
//           <Select
//             value={sortOrder}
//             onChange={setSortOrder}
//             options={sortOptions}
//             id="sort-recordings"
//             name="sort-recordings"
//             onBlur={() => {}}
//             className="w-48 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-[#34C759] focus:border-transparent transition-all duration-200"
//           />
//         </div>
//       </div>

//       {/* Recordings Section */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {sortRecordings(recordings).map((recording) => (
//           <Card
//             key={recording.id}
//             className="group bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
//           >
//             <CardHeader className="p-6 bg-gradient-to-r from-[#34C759]/10 to-gray-50">
//               <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-2">
//                 <Video className="w-6 h-6 text-[#34C759] group-hover:animate-spin" />
//                 <span className="truncate">{recording.title}</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-6">
//               <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                 {recording.description || "No description available"}
//               </p>
//               <p className="text-xs text-gray-500 mb-6">
//                 Uploaded: {new Date(recording.uploadedAt).toLocaleDateString("en-US", {
//                   day: "numeric",
//                   month: "long",
//                   year: "numeric",
//                 })}
//               </p>
//               <a
//                 href={recording.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center px-5 py-2 bg-[#34C759] text-white font-semibold rounded-full hover:bg-[#2ea44f] transition-all duration-200 transform hover:scale-105"
//               >
//                 <Video className="w-5 h-5 mr-2" />
//                 Watch Now
//               </a>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }











// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Video } from "lucide-react";
// import { useUser, useAuth } from "@clerk/nextjs";
// import { Select } from "@/components/sort";

// interface Recording {
//   id: string;
//   title: string;
//   description?: string;
//   url: string;
//   uploadedAt: Date;
//   courseId: string | null;
// }

// export default function RecordingsPage() {
//   const { user } = useUser();
//   const { getToken } = useAuth();
//   const [recordings, setRecordings] = useState<Recording[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [sortOrder, setSortOrder] = useState<"title" | "date" | "course">("date");
//   const [hasPurchased, setHasPurchased] = useState(false);

//   useEffect(() => {
//     const fetchRecordings = async () => {
//       try {
//         const token = await getToken();

//         // Fetch recordings
//         const response = await fetch("/api/recordings", {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch recordings");
//         }

//         const data = await response.json();
//         setRecordings(data);
//       } catch (error) {
//         console.error("Error fetching recordings:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const checkPurchaseStatus = async () => {
//       try {
//         const token = await getToken();

//         // Fetch purchase status
//         const response = await fetch("/api/purchases", {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch purchase status");
//         }

//         const data = await response.json();
//         setHasPurchased(data.hasPurchased);
//       } catch (error) {
//         console.error("Error checking purchase status:", error);
//       }
//     };

//     fetchRecordings();
//     checkPurchaseStatus();
//   }, [user?.id, getToken]);

//   const sortRecordings = (recordings: Recording[]) => {
//     return [...recordings].sort((a, b) => {
//       switch (sortOrder) {
//         case "title":
//           return a.title.localeCompare(b.title);
//         case "date":
//           return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
//         case "course":
//           const courseIdA = a.courseId || "";
//           const courseIdB = b.courseId || "";
//           return courseIdA.localeCompare(courseIdB);
//         default:
//           return 0;
//       }
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//         <div className="flex items-center space-x-3">
//           <div className="w-8 h-8 border-4 border-t-[#34C759] border-gray-200 rounded-full animate-spin"></div>
//           <p className="text-lg font-medium text-gray-700">Loading recordings...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!hasPurchased) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-center p-8">
//         <Video className="w-20 h-20 text-[#34C759] mb-6 animate-pulse" />
//         <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
//           Access Denied
//         </h2>
//         <p className="text-gray-500 mt-3 text-lg max-w-md">
//           You need to enroll in a course to access the recordings. Please purchase a course to continue.
//         </p>
//         <a
//           href="/search"
//           className="mt-6 inline-flex items-center px-6 py-3 bg-[#34C759] text-white font-semibold rounded-full hover:bg-[#2ea44f] transition-all duration-200 transform hover:scale-105"
//         >
//           Explore Courses
//         </a>
//       </div>
//     );
//   }

//   if (!recordings.length) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-center">
//         <Video className="w-20 h-20 text-[#34C759] mb-6 animate-pulse" />
//         <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">No Recordings Available</h2>
//         <p className="text-gray-500 mt-3 text-lg max-w-md">
//           It looks like there are no recordings yet. Stay tuned for exciting content coming your way!
//         </p>
//       </div>
//     );
//   }

//   const sortOptions: { value: "title" | "date" | "course"; label: string }[] = [
//     { value: "date", label: "Sort by Date" },
//     { value: "title", label: "Sort by Title" },
//     { value: "course", label: "Sort by Course" },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
//       {/* Sorting Control */}
//       <div className="max-w-7xl mx-auto mb-10">
//         <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between border border-gray-200 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
//           <label
//             htmlFor="sort-recordings"
//             className="text-sm font-semibold text-gray-800 tracking-wide"
//           >
//             Sort Recordings
//           </label>
//           <Select
//             value={sortOrder}
//             onChange={setSortOrder}
//             options={sortOptions}
//             id="sort-recordings"
//             name="sort-recordings"
//             onBlur={() => {}}
//             className="w-48 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-[#34C759] focus:border-transparent transition-all duration-200"
//           />
//         </div>
//       </div>

//       {/* Recordings Section */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {sortRecordings(recordings).map((recording) => (
//           <Card
//             key={recording.id}
//             className="group bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
//           >
//             <CardHeader className="p-6 bg-gradient-to-r from-[#34C759]/10 to-gray-50">
//               <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-2">
//                 <Video className="w-6 h-6 text-[#34C759] group-hover:animate-spin" />
//                 <span className="truncate">{recording.title}</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-6">
//               <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                 {recording.description || "No description available"}
//               </p>
//               <p className="text-xs text-gray-500 mb-6">
//                 Uploaded: {new Date(recording.uploadedAt).toLocaleDateString("en-US", {
//                   day: "numeric",
//                   month: "long",
//                   year: "numeric",
//                 })}
//               </p>
//               <a
//                 href={recording.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center px-5 py-2 bg-[#34C759] text-white font-semibold rounded-full hover:bg-[#2ea44f] transition-all duration-200 transform hover:scale-105"
//               >
//                 <Video className="w-5 h-5 mr-2" />
//                 Watch Now
//               </a>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }