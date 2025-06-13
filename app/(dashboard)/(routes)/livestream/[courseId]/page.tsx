import Livestream from "@/components/livestream";

interface LivestreamPageProps {
  params: {
    courseId?: string; // Make it optional to handle undefined
  };
}

export default function LivestreamPage({ params }: LivestreamPageProps) {
  console.log("LivestreamPage params:", params); // Debug the params object

  const courseId = params?.courseId;

  if (!courseId) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white p-8">
        <div className="text-center">
          <p className="text-xl">Error: No course ID provided in URL.</p>
          <p className="text-gray-300">
            Please navigate to a valid course URL (e.g., /livestream/[courseId]).
          </p>
          <p className="text-gray-400 mt-2">Params received: {JSON.stringify(params)}</p>
        </div>
      </div>
    );
  }

  return <Livestream courseId={courseId} />;
}