// import { db } from "@/lib/db";
// import { auth } from "@clerk/nextjs/server";
// import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
// import { redirect } from "next/navigation";
// import Link from "next/link";
// import { IconBadge } from "@/components/icon-badge";
// import { ChapterTitleForm } from "./_components/chapter-title-form";
// import { ChapterDescriptionForm } from "../../_components/chapter-description-form";
// import { ChapterAccessForm } from "../../_components/chapter-access-form";
// import { ChapterVideoForm } from "./_components/chapter-video-form";
// import { Banner } from "@/components/banner";
// import { ChapterActions } from "./_components/chapter-actions";
// import { TeacherQuizForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/TeacherQuizForm";
// import { ChapterQuizForm } from "./_components/chapter-quiz-form";

// const ChapterIdPage = async ({
//   params,
// }: {
//   params: { courseId: string; chapterId: string };
// }) => {
//   const { userId } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const chapter = await db.chapter.findUnique({
//     where: {
//       id: params.chapterId,
//       courseId: params.courseId,
//     },
//     include: {
//       muxData: true,
//       quizzes: {
//         include: {
//           questions: true, // Include questions from the Quiz model
//         },
//       },
//     },
//   });
  

//   if (!chapter) {
//     return redirect("/");
//   }

//   const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];
//   const totalFields = requiredFields.length;
//   const completedFields = requiredFields.filter(Boolean).length;

//   const completionText = `(${completedFields}/${totalFields})`;

//   const isComplete = requiredFields.every(Boolean);

//   return (
//     <>
//       {!chapter.isPublished && (
//         <Banner
//           variant="warning"
//           label="This chapter is Unpublished. It will not be visible in the Course"
//         />
//       )}

//       <div className="p-6">
//         <div className="flex items-center justify-between">
//           <div className="w-full">
//             <Link
//               href={`/teacher/courses/${params.courseId}`}
//               className="flex items-center text-sm hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-black font-semibold py-2 px-4 rounded-full transition-all ease-in-out transform hover:scale-105 mb-6"
//             >
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               Back to Course SetUp
//             </Link>

//             <div className="flex items-center justify-between w-full">
//               <div className="flex flex-col gap-y-2">
//                 <h1 className="text-2xl font-medium text-[#d19a00] ">
//                   Session Creation
//                 </h1>
//                 <span className="text-sm text-[#c0272d]">
//                   Complete all Fields {completionText}
//                 </span>
//               </div>

//               <ChapterActions
//                 disabled={!isComplete}
//                 courseId={params.courseId}
//                 chapterId={params.chapterId}
//                 isPublished={chapter.isPublished}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
//           <div className="space-y-4">
//             <div>
//               <div className="flex items-center gap-x-2">
//                 <IconBadge icon={LayoutDashboard} />
//                 <h2 className="text-xl text-[#d19a00]">
//                   Customize Your Session
//                 </h2>
//               </div>
//               <ChapterTitleForm
//                 initialData={chapter}
//                 courseId={params.courseId}
//                 chapterId={params.chapterId}
//               />

//               <ChapterDescriptionForm
//                 initialData={chapter}
//                 courseId={params.courseId}
//                 chapterId={params.chapterId}
//               />
//             </div>
//             <div>
//               <div className="flex items-center gap-x-2">
//                 <IconBadge icon={Eye} />
//                 <h2 className="text-xl text-[#d19a00]">Access Settings</h2>
//               </div>
//               <ChapterAccessForm
//                 initialData={chapter}
//                 courseId={params.courseId}
//                 chapterId={params.chapterId}
//               />
//             </div>
//           </div>
//           <div>
//             <div className="flex items-center gap-x-2">
//               <IconBadge icon={Video} />
//               <h2 className="text-xl text-[#d19a00]">Add a Video</h2>
//             </div>
//             <ChapterVideoForm
//               initialData={chapter}
//               courseId={params.courseId}
//               chapterId={params.chapterId}
//             />
//           </div>
          
//         </div>

//         <div className="mt-12">
//           <ChapterQuizForm courseId={params.courseId} chapterId={params.chapterId} />

//           <div className="mt-8 space-y-4">
//             {chapter.quizzes?.map((quiz) => (
//               <div key={quiz.id} className="p-4 border rounded-md">
//                 <h2 className="text-lg font-semibold">{quiz.title}</h2>
//                 <ul className="list-disc pl-5 mt-2">
//                   {quiz.questions.map((question) => (
//                     <li key={question.id}>
//                       {question.questionText} (Correct Answer:{" "}
//                       <span className="font-semibold">
//                         {question.correctAnswer}
//                       </span>
//                       )
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ChapterIdPage;









// import { db } from "@/lib/db";
// import { auth } from "@clerk/nextjs/server";
// import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
// import { redirect } from "next/navigation";
// import Link from "next/link";
// import { IconBadge } from "@/components/icon-badge";
// import { AttachmentForm } from "./_components/chapterattachment-form";
// import { ChapterTitleForm } from "./_components/chapter-title-form";
// import { ChapterDescriptionForm } from "../../_components/chapter-description-form";
// import { ChapterLinkForm } from "./_components/chapter-links-form";
// import { ChapterAccessForm } from "../../_components/chapter-access-form";
// import { ChapterVideoForm } from "./_components/chapter-video-form";
// import { Banner } from "@/components/banner";
// import { ChapterActions } from "./_components/chapter-actions";
// import { TeacherQuizForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/TeacherQuizForm";
// import { ChapterQuizForm } from "./_components/chapter-quiz-form";

// const ChapterIdPage = async ({
//   params,
// }: {
//   params: { courseId: string; chapterId: string };
// }) => {
//   const { userId } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const chapter = await db.chapter.findUnique({
//     where: {
//       id: params.chapterId,
//       courseId: params.courseId,
//     },
//     include: {
//       muxData: true,
//       quizzes: {
//         include: {
//           questions: true, // Include questions from the Quiz model
//         },
//       },
//       chapterattachments: true, // Include attachments
//       recordings: true, // Add this to include recordings
//     },
//   });

//   if (!chapter) {
//     return redirect("/");
//   }

//   const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];
//   const totalFields = requiredFields.length;
//   const completedFields = requiredFields.filter(Boolean).length;

//   const completionText = `(${completedFields}/${totalFields})`;

//   const isComplete = requiredFields.every(Boolean);

//   return (
//     <>
//       {!chapter.isPublished && (
//         <Banner
//           variant="warning"
//           label="This chapter is Unpublished. It will not be visible in the Course"
//         />
//       )}

//       <div className="p-6">
//         <div className="flex items-center justify-between">
//           <div className="w-full">
//             <Link
//               href={`/teacher/courses/${params.courseId}`}
//               className="flex items-center text-sm hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-black font-semibold py-2 px-4 rounded-full transition-all ease-in-out transform hover:scale-105 mb-6"
//             >
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               Back to Course SetUp
//             </Link>

//             <div className="flex items-center justify-between w-full">
//               <div className="flex flex-col gap-y-2">
//                 <h1 className="text-2xl font-medium text-[#d19a00]">
//                   Session Creation
//                 </h1>
//                 <span className="text-sm text-[#c0272d]">
//                   Complete all Fields {completionText}
//                 </span>
//               </div>

//               <ChapterActions
//                 disabled={!isComplete}
//                 courseId={params.courseId}
//                 chapterId={params.chapterId}
//                 isPublished={chapter.isPublished}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
//           <div className="space-y-4">
//             <div>
//               <div className="flex items-center gap-x-2">
//                 <IconBadge icon={LayoutDashboard} />
//                 <h2 className="text-xl text-[#d19a00]">
//                   Customize Your Session
//                 </h2>
//               </div>
//               <ChapterTitleForm
//                 initialData={chapter}
//                 courseId={params.courseId}
//                 chapterId={params.chapterId}
//               />

//               <ChapterDescriptionForm
//                 initialData={chapter}
//                 courseId={params.courseId}
//                 chapterId={params.chapterId}
//               />
//             </div>
//             <div>
//               <div className="flex items-center gap-x-2">
//                 <IconBadge icon={Eye} />
//                 <h2 className="text-xl text-[#d19a00]">Access Settings</h2>
//               </div>
//               <ChapterAccessForm
//                 initialData={chapter}
//                 courseId={params.courseId}
//                 chapterId={params.chapterId}
//               />
//             </div>
//           </div>
//           <div>
//             <div className="flex items-center gap-x-2">
//               <IconBadge icon={Video} />
//               <h2 className="text-xl text-[#d19a00]">Add a Video</h2>
//             </div>
//             <ChapterVideoForm
//               initialData={chapter}
//               courseId={params.courseId}
//               chapterId={params.chapterId}
//             />

//       <ChapterLinkForm
//                  initialData={{ ...chapter, recordings: chapter.recordings || [] }} // Ensure recordings is included
//                  courseId={params.courseId}
//                  chapterId={params.chapterId}
//               />


//           </div>

//           <div className="col-span-1 md:col-span-2">
//             <AttachmentForm
//               initialData={chapter}
//               courseId={params.courseId}
//               chapterId={params.chapterId} // Include chapterId here
//             />
//           </div>
//         </div>

//         <div className="mt-12">
//           <ChapterQuizForm courseId={params.courseId} chapterId={params.chapterId} />

//           <div className="mt-8 space-y-4">
//             {chapter.quizzes?.map((quiz) => (
//               <div key={quiz.id} className="p-4 border rounded-md">
//                 <h2 className="text-lg font-semibold">{quiz.title}</h2>
//                 <ul className="list-disc pl-5 mt-2">
//                   {quiz.questions.map((question) => (
//                     <li key={question.id}>
//                       {question.questionText} (Correct Answer:{" "}
//                       <span className="font-semibold">
//                         {question.correctAnswer}
//                       </span>
//                       )
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ChapterIdPage;







import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { IconBadge } from "@/components/icon-badge";
import { AttachmentForm } from "./_components/chapterattachment-form";
import { ChapterTitleForm } from "./_components/chapter-title-form";
import { ChapterDescriptionForm } from "../../_components/chapter-description-form";
import { ChapterLinkForm } from "./_components/chapter-links-form";
import { ChapterAccessForm } from "../../_components/chapter-access-form";
import { ChapterVideoForm } from "./_components/chapter-video-form";
import { Banner } from "@/components/banner";
import { ChapterActions } from "./_components/chapter-actions";
import { ChapterQuizForm } from "./_components/chapter-quiz-form";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
      quizzes: {
        include: {
          questions: true, // Include questions from the Quiz model
        },
      },
      chapterattachments: true, // Include attachments
      recordings: true, // Add this to include recordings
    },
  });

  if (!chapter) {
    return redirect("/");
  }

  // Updated requiredFields to count googleDriveUrl as an alternative to videoUrl
  const requiredFields = [
    chapter.title,
    chapter.description,
    chapter.videoUrl || chapter.googleDriveUrl, // Either videoUrl or googleDriveUrl counts
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is Unpublished. It will not be visible in the Course"
        />
      )}

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}`}
              className="flex items-center text-sm hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-black font-semibold py-2 px-4 rounded-full transition-all ease-in-out transform hover:scale-105 mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Course SetUp
            </Link>

            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium text-[#d19a00]">
                  Session Creation
                </h1>
                <span className="text-sm text-[#c0272d]">
                  Complete all Fields {completionText}
                </span>
              </div>

              <ChapterActions
                disabled={!isComplete}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl text-[#d19a00]">
                  Customize Your Session
                </h2>
              </div>
              <ChapterTitleForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />

              <ChapterDescriptionForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl text-[#d19a00]">Access Settings</h2>
              </div>
              <ChapterAccessForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl text-[#d19a00]">Add a Video</h2>
            </div>
            <ChapterVideoForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />

            <ChapterLinkForm
              initialData={{ ...chapter, recordings: chapter.recordings || [] }} // Ensure recordings is included
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <AttachmentForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId} // Include chapterId here
            />
          </div>
        </div>

        <div className="mt-12">
          <ChapterQuizForm courseId={params.courseId} chapterId={params.chapterId} />

          <div className="mt-8 space-y-4">
            {chapter.quizzes?.map((quiz) => (
              <div key={quiz.id} className="p-4 border rounded-md">
                <h2 className="text-lg font-semibold">{quiz.title}</h2>
                <ul className="list-disc pl-5 mt-2">
                  {quiz.questions.map((question) => (
                    <li key={question.id}>
                      {question.questionText} (Correct Answer:{" "}
                      <span className="font-semibold">
                        {question.correctAnswer}
                      </span>
                      )
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterIdPage;