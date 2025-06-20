// "use client";

// import * as z from "zod";
// import axios from "axios";
// import Image from "next/image";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { ImageIcon, Pencil, PlusCircle, File, Loader2, X } from "lucide-react";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

// import { Attachment, Course } from "@prisma/client";
// import { FileUpload } from "@/components/file-upload";

// interface AttachmentFormProps {
//   initialData: Course & { attachments: Attachment[] };
//   courseId: string;
// }

// // Creating a form schema
// const formSchema = z.object({
//   url: z.string().min(1),
//   name: z.string().min(1),  // Ensure name is included in the schema
// });

// export const AttachmentForm = ({
//   initialData,
//   courseId,
// }: AttachmentFormProps) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [deletingId, setDeletingId] = useState<String | null>(null);

//   const toggleEdit = () => setIsEditing((current) => !current);
//   const router = useRouter();

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       // Send both URL and name when submitting
//       await axios.post(`/api/courses/${courseId}/attachments`, values);
//       toast.success("Course updated successfully");
//       toggleEdit();
//       router.refresh();
//     } catch {
//       toast.error("Something went wrong");
//     }
//   };

//   const onDelete = async (id: string) => {
//     try {
//       setDeletingId(id);
//       await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
//       toast.success("Attachment deleted successfully");
//       router.refresh();
//     } catch {
//       toast.error("Something went wrong");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   return (
//     <div className="mt-6 border bg-slate-100 rounded-md p-4">
//       <div className="font-medium flex items-center justify-between">
//         Course Attachments
//         <Button onClick={toggleEdit} variant="ghost">
//           {isEditing && <>Cancel</>}
//           {!isEditing && (
//             <>
//               <PlusCircle className="h-4 w-4 mr-2" />
//               Add a file
//             </>
//           )}
//         </Button>
//       </div>

//       {!isEditing && (
//         <>
//           {initialData.attachments.length === 0 && (
//             <p className="text-sm mt-2 text-slate-500 italic">
//               No Attachments Yet
//             </p>
//           )}
//           {initialData.attachments.length > 0 && (
//             <div className="space-y-2">
//               {initialData.attachments.map((attachment) => (
//                 <div
//                   key={attachment.id}
//                   className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
//                 >
//                   <File className="h-4 w-4 mr-2 flex-shrink-0" />
//                   <p className="text-xs line-clamp-1">{attachment.name}</p>
//                   {deletingId === attachment.id && (
//                     <div>
//                       <Loader2 className="h-4 w-4 animate-spin" />
//                     </div>
//                   )}
//                   {deletingId !== attachment.id && (
//                     <button
//                       onClick={() => onDelete(attachment.id)}
//                       className="ml-auto hover:opacity-75 transition"
//                     >
//                       <X className="h-4 w-4 transition" />
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       )}

//       {isEditing && (
//         <div>
//           <FileUpload
//             endpoint="courseAttachment"
//             onChange={(url, name) => {
//               if (url && name) {
//                 onSubmit({ url, name });  // Submit both URL and name
//               }
//             }}
//           />
//           <div className="text-xs text-muted-foreground mt-4">
//             Add Anything Your Student Might Need To Complete the Course
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };





"use client";

import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle, File, Loader2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { ChapterAttachment, Chapter } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";

interface AttachmentFormProps {
  initialData: Chapter & { chapterAttachments: ChapterAttachment[] };
  courseId: string;
  chapterId: string;
}

// Creating a form schema
const formSchema = z.object({
  url: z.string().min(1),
  name: z.string().min(1),  // Ensure name is included in the schema
});

export const AttachmentForm = ({
  initialData,
  courseId,
  chapterId,
}: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Send both URL and name when submitting, now including chapterId
      await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/attachments`, values);
      toast.success("Attachment added successfully");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}/attachments/${id}`);
      toast.success("Attachment deleted successfully");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Attachments
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an attachment
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <>
          {initialData.chapterAttachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No Attachments Yet
            </p>
          )}
          {initialData.chapterAttachments.length > 0 && (
            <div className="space-y-2">
              {initialData.chapterAttachments.map((chapterAttachment) => (
                <div
                  key={chapterAttachment.id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{chapterAttachment.name}</p>
                  {deletingId === chapterAttachment.id && (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== chapterAttachment.id && (
                    <button
                      onClick={() => onDelete(chapterAttachment.id)}
                      className="ml-auto hover:opacity-75 transition"
                    >
                      <X className="h-4 w-4 transition" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterAttachment"
            onChange={(url, name) => {
              if (url && name) {
                onSubmit({ url, name });  // Submit both URL and name
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add Anything Your Student Might Need To Complete the Chapter
          </div>
        </div>
      )}
    </div>
  );
};