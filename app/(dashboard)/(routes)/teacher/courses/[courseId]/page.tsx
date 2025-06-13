// import { IconBadge } from "@/components/icon-badge";
// import { db } from "@/lib/db";
// import { auth } from "@clerk/nextjs/server";
// import { CircleDollarSign, Layout, LayoutDashboard, ListChecks, File } from "lucide-react";
// import { redirect } from "next/navigation";
// import { TitleForm } from "./_components/title-form";
// import { DescriptionForm } from "./_components/description-form";
// import { ImageForm } from "./_components/image-form";
// import { CategoryForm } from "./_components/category-form";
// import { PriceForm } from "./_components/price-form";
// import { AttachmentForm } from "./_components/attachment-form";
// import { ChaptersForm } from "./_components/chapters-form";
// import { Banner } from "@/components/banner";
// import { Actions } from "./_components/actions";
// import { TeacherQuizForm } from "./_components/TeacherQuizForm";
// import { isSuperAdmin } from "@/lib/isSuperAdmin"; // Assuming the function is placed in a lib file

// const CourseIdPage = async ({
//     params
// }: {
//     params: { courseId: string },
// }) => {
//     const { userId } = auth();
//     if (!userId) {
//         return redirect("/");
//     }

//     const course = await db.course.findUnique({
//         where: {
//           id: params.courseId,
//           userId, // Ensure `userId` is part of the query structure
//         },
//         include: {
//           chapters: {
//             orderBy: {
//               position: 'asc',
//             },
//           },
//           attachments: {
//             orderBy: {
//               createdAt: 'desc',
//             },
//           },
//           quizzes: {
//             select: {
//               id: true,
//               title: true,
//               createdAt: true,
//               updatedAt: true,
//               courseId: true,
//               chapterId: true, // Now this field exists and can be selected
//               _count: {
//                 select: {
//                   questions: true,
//                 },
//               },
//               questions: true, // Optional: Include related questions
//             },
//           },
//         },
//       });
      
//     // Fetching categories
//     const categories = await db.category.findMany({
//         orderBy: {
//             name: "asc",
//         },
//     });

//     // If there is no course
//     if (!course) {
//         return redirect("/");
//     }

//     // Check if the current user is a super admin
//     const userIsSuperAdmin = isSuperAdmin(userId);

//     // Creating an array of required fields for course
//     const requiredFields = [
//         course.title,
//         course.description,
//         course.imageUrl,
//         // Exclude course.price from the required fields check for teachers
//         course.categoryId,
//         course.chapters.some(chapter => chapter.isPublished),
//     ];

//     const totalFields = requiredFields.length;
//     const completedFields = requiredFields.filter(Boolean).length;

//     const completionText = `(${completedFields} / ${totalFields})`;

//     const isComplete = requiredFields.every(Boolean);

//     return (
//         <>
//             {!course.isPublished && (
//                 <Banner
//                     label="This Course is not Published yet, It will not be Visible to Students."
//                 />
//             )}

//             <div className="p-6">
//                 <div className="flex items-center justify-between">
//                     <div className="flex flex-col gap-y-2">
//                         <h1 className="text-2xl font-medium text-[#d19a00]">
//                             Course Setup
//                         </h1>
//                         <span className="text-sm text-[#c0272d]">
//                             Complete all fields {completionText}
//                         </span>
//                     </div>

//                     <Actions
//                         disabled={!isComplete}
//                         courseId={params.courseId}
//                         isPublished={course.isPublished}
//                     />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
//                     <div>
//                         <div className="flex items-center gap-x-2">
//                             <IconBadge icon={LayoutDashboard} />
//                             <h2 className="text-xl text-[#d19a00]">
//                                 Customize Your Course
//                             </h2>
//                         </div>

//                         <TitleForm
//                             initialData={course}
//                             courseId={course.id}
//                         />

//                         <DescriptionForm
//                             initialData={course}
//                             courseId={course.id}
//                         />

//                         <ImageForm
//                             initialData={course}
//                             courseId={course.id}
//                         />

//                         <CategoryForm
//                             initialData={course}
//                             courseId={course.id}
//                             options={categories.map((category) => ({
//                                 label: category.name,
//                                 value: category.id,
//                             }))}
//                         />
//                     </div>
//                     <div className="space-y-6">
//                         <div>
//                             <div className="flex items-center gap-x-2">
//                                 <IconBadge icon={ListChecks} />
//                                 <h2 className="text-xl text-[#d19a00]">
//                                     Course Chapters
//                                 </h2>
//                             </div>

//                             <ChaptersForm
//                                 initialData={course}
//                                 courseId={course.id}
//                             />
//                         </div>

//                         {userIsSuperAdmin && (
//                             <div>
//                                 <div className="flex items-center gap-x-2">
//                                     <IconBadge icon={CircleDollarSign} />
//                                     <h2 className="text-xl text-[#d19a00]">
//                                         Sell your Course
//                                     </h2>
//                                 </div>
//                                 <PriceForm
//                                     initialData={course}
//                                     courseId={course.id}
//                                 />
//                             </div>
//                         )}

//                         <div>
//                             <div className="flex items-center gap-x-2">
//                                 <IconBadge icon={ListChecks} />
//                                 <h2 className="text-xl text-[#d19a00]">
//                                     Create a Quiz for a Course
//                                 </h2>
//                             </div>

//                             <TeacherQuizForm
//                                 //   initialData={{
//                                 // quizzes: course.quizzes,  // Pass quizzes from the course
//                                 //     // You can also include other relevant data from the course here if needed
//                                 // }}// Pass initialData prop here
//                                 courseId={params.courseId}
//                             />
//                         </div>

//                         <div>
//                             <div className="flex items-center gap-x-2">
//                                 <IconBadge icon={File} />
//                                 <h2 className="text-xl text-[#d19a00]">
//                                     Resources & Attachments
//                                 </h2>
//                             </div>

//                             <AttachmentForm
//                                 initialData={course}
//                                 courseId={course.id}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default CourseIdPage;



import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { CircleDollarSign, LayoutDashboard, ListChecks, File } from "lucide-react";
import { redirect } from "next/navigation";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";
import { AttachmentForm } from "./_components/attachment-form";
import { ChaptersForm } from "./_components/chapters-form";
import { Banner } from "@/components/banner";
import { Actions } from "./_components/actions";
import { TeacherQuizForm } from "./_components/TeacherQuizForm";
import { isSuperAdmin } from "@/lib/isSuperAdmin"; // Assuming the function is placed in a lib file

const CourseIdPage = async ({
    params
}: {
    params: { courseId: string },
}) => {
    const { userId } = auth();

    // Ensure userId is always a valid string
    if (!userId) {
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
            userId:userId, // Ensure `userId` is part of the query structure
        },
        include: {
            chapters: {
                orderBy: {
                    position: 'asc',
                },
            },
            attachments: {
                orderBy: {
                    createdAt: 'desc',
                },
            },
            quizzes: {
                select: {
                    id: true,
                    title: true,
                    createdAt: true,
                    updatedAt: true,
                    courseId: true,
                    chapterId: true, // Now this field exists and can be selected
                    _count: {
                        select: {
                            questions: true,
                        },
                    },
                    questions: true, // Optional: Include related questions
                },
            },
        },
    });

    // Fetching categories
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        },
    });

    // If there is no course
    if (!course) {
        return redirect("/");
    }

    // Check if the current user is a super admin
    const userIsSuperAdmin = isSuperAdmin(userId);

    // Creating an array of required fields for course
    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        // Exclude course.price from the required fields check for teachers
        course.categoryId,
        course.chapters.some(chapter => chapter.isPublished),
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields} / ${totalFields})`;

    const isComplete = requiredFields.every(Boolean);

    return (
        <>
            {!course.isPublished && (
                <Banner
                    label="This Course is not Published yet, It will not be Visible to Students."
                />
            )}

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-medium text-[#d19a00]">
                            Course Setup
                        </h1>
                        <span className="text-sm text-[#c0272d]">
                            Complete all fields {completionText}
                        </span>
                    </div>

                    <Actions
                        disabled={!isComplete}
                        courseId={params.courseId}
                        isPublished={course.isPublished}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={LayoutDashboard} />
                            <h2 className="text-xl text-[#d19a00]">
                                Customize Your Course
                            </h2>
                        </div>

                        <TitleForm
                            initialData={course}
                            courseId={course.id}
                        />

                        <DescriptionForm
                            initialData={course}
                            courseId={course.id}
                        />

                        <ImageForm
                            initialData={course}
                            courseId={course.id}
                        />

                        <CategoryForm
                            initialData={course}
                            courseId={course.id}
                            options={categories.map((category) => ({
                                label: category.name,
                                value: category.id,
                            }))}
                        />
                    </div>
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={ListChecks} />
                                <h2 className="text-xl text-[#d19a00]">
                                    Course Chapters
                                </h2>
                            </div>

                            <ChaptersForm
                                initialData={course}
                                courseId={course.id}
                            />
                        </div>

                        {userIsSuperAdmin && (
                            <div>
                                <div className="flex items-center gap-x-2">
                                    <IconBadge icon={CircleDollarSign} />
                                    <h2 className="text-xl text-[#d19a00]">
                                        Sell your Course
                                    </h2>
                                </div>
                                <PriceForm
                                    initialData={course}
                                    courseId={course.id}
                                />
                            </div>
                        )}

                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={ListChecks} />
                                <h2 className="text-xl text-[#d19a00]">
                                    Create a Quiz for a Course
                                </h2>
                            </div>

                            <TeacherQuizForm
                                courseId={params.courseId}
                            />
                        </div>

                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={File} />
                                <h2 className="text-xl text-[#d19a00]">
                                    Resources & Attachments
                                </h2>
                            </div>

                            <AttachmentForm
                                initialData={course}
                                courseId={course.id}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CourseIdPage;