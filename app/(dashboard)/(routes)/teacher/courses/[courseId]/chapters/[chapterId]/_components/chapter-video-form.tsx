// "use client";

// import * as z from "zod";
// import axios from "axios";
// import Image from "next/image";
// import MuxPlayer from "@mux/mux-player-react"
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { ImageIcon, Pencil, PlusCircle, Video } from "lucide-react";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
 
 
// import { Chapter, Course, muxData } from "@prisma/client";
// import { FileUpload } from "@/components/file-upload";



// interface ChapterVideoFormProps {
//     initialData: Chapter & {muxData?: muxData | null};
//     courseId: string;
//     chapterId: string;
// }

// //creating a form schema
// const formSchema = z.object({
//     videoUrl: z.string().min(1)
//     // Add more fields as needed
// });



// export const ChapterVideoForm = ({
//     initialData,
//     courseId,
//     chapterId
// }:ChapterVideoFormProps) => {
   
//     const[isEditing, setIsEditing] = useState(false)

//     const toggleEdit = () => setIsEditing((current) => !current);

//     const router = useRouter();

 
   
//     const onSubmit =  async (values: z.infer<typeof formSchema>) => {
//        try{
//             await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
//             toast.success("Chapter updated successfully");
//             toggleEdit();
//             router.refresh();
//        }catch{
//           toast.error("Something went wrong")
//        }
//     }

//     return (
//         <div className="mt-6 border bg-slate-100 rounded-md p-4">
//            <div className="font-medium flex items-center justify-between">
//              Section Video
//              <Button onClick={toggleEdit} variant="ghost">
//                 {isEditing && (
//                     <>Cancel </>
//                 )}
                
//                 {!isEditing && !initialData.videoUrl && (
//                   <>
//                   <PlusCircle className="h-4 w-4 mr-2"/>
//                   Add Video
//                   </>
//                 )}

//                 {!isEditing && initialData.videoUrl && (
//                 <>
//                 <Pencil className="h-4 w-4 mr-2"/>
//                 Edit Video
//                 </>
//             )}
//              </Button>
//            </div>

//           {!isEditing && (
//             !initialData.videoUrl ? (
//               <div className="flex items-center justify-center h-60
//               bg-slate-200 rounded-md
//               ">
//                 <Video className="h-10 w-10 text-slate-500"/>

//               </div>
//             ): (
//               <div className="relative aspect-video mt-2">
//                 <MuxPlayer
//                 playbackId={initialData?.muxData?.playbackId || ""}
//                 />
//               </div>
//             )
//           )}

//           {isEditing && (
//             <div>
//               <FileUpload
//                endpoint="chapterVideo"
//                onChange={(url)=>{
//                      if(url){
//                       onSubmit({videoUrl:url});
//                      }
//                }}
//               />
//               <div className="text-xs text-muted-foreground mt-4">
//                 Upload this sections video
//               </div>


//             </div>
//           )}
          
//           {
//             initialData.videoUrl && !isEditing && (
//               <div className="text-xs text-muted-foreground mt-2">
//                  Videos Can Take Few Moments to process. Refresh the page if video does not appear
//               </div>
//             )}

//         </div>
//     )
 
// }







// "use client";

// import * as z from "zod";
// import axios from "axios";
// import Image from "next/image";
// import MuxPlayer from "@mux/mux-player-react"
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { ImageIcon, Pencil, PlusCircle, Video } from "lucide-react";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { Chapter, Course, muxData } from "@prisma/client";
// import { FileUpload } from "@/components/file-upload";

// interface ChapterVideoFormProps {
//     initialData: Chapter & {muxData?: muxData | null};
//     courseId: string;
//     chapterId: string;
// }

// // Updated form schema to accept either a videoUrl or googleDriveUrl
// const formSchema = z.object({
//     videoUrl: z.string().min(1).optional(),
//     googleDriveUrl: z.string().url().optional(),
// }).refine((data) => data.videoUrl || data.googleDriveUrl, {
//     message: "Either a video file or Google Drive URL must be provided",
//     path: ["videoUrl"],
// });

// export const ChapterVideoForm = ({
//     initialData,
//     courseId,
//     chapterId
// }:ChapterVideoFormProps) => {
   
//     const [isEditing, setIsEditing] = useState(false);
//     const [googleDriveLink, setGoogleDriveLink] = useState("");

//     const toggleEdit = () => setIsEditing((current) => !current);
//     const router = useRouter();

//     const onSubmit = async (values: z.infer<typeof formSchema>) => {
//         try {
//             // If googleDriveUrl is provided, we'll send that instead of videoUrl
//             const submissionData = values.googleDriveUrl 
//                 ? { googleDriveUrl: values.googleDriveUrl }
//                 : { videoUrl: values.videoUrl };
            
//             await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, submissionData);
//             toast.success("Chapter updated successfully");
//             setGoogleDriveLink(""); // Reset the input
//             toggleEdit();
//             router.refresh();
//         } catch {
//             toast.error("Something went wrong");
//         }
//     }

//     return (
//         <div className="mt-6 border bg-slate-100 rounded-md p-4">
//            <div className="font-medium flex items-center justify-between">
//              Section Video
//              <Button onClick={toggleEdit} variant="ghost">
//                 {isEditing && (
//                     <>Cancel </>
//                 )}
                
//                 {!isEditing && !initialData.videoUrl && (
//                   <>
//                   <PlusCircle className="h-4 w-4 mr-2"/>
//                   Add Video
//                   </>
//                 )}

//                 {!isEditing && initialData.videoUrl && (
//                 <>
//                 <Pencil className="h-4 w-4 mr-2"/>
//                 Edit Video
//                 </>
//             )}
//              </Button>
//            </div>

//           {!isEditing && (
//             !initialData.videoUrl ? (
//               <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
//                 <Video className="h-10 w-10 text-slate-500"/>
//               </div>
//             ): (
//               <div className="relative aspect-video mt-2">
//                 <MuxPlayer
//                 playbackId={initialData?.muxData?.playbackId || ""}
//                 />
//               </div>
//             )
//           )}

//           {isEditing && (
//             <div>
//               <FileUpload
//                endpoint="chapterVideo"
//                onChange={(url)=>{
//                      if(url){
//                       onSubmit({videoUrl: url});
//                      }
//                }}
//               />
//               <div className="text-xs text-muted-foreground mt-4 mb-4">
//                 Upload this sections video
//               </div>
              
//               <div className="mt-4">
//                 <p className="text-sm font-medium mb-2">Or use a Google Drive link:</p>
//                 <div className="flex gap-2">
//                   <Input
//                     value={googleDriveLink}
//                     onChange={(e) => setGoogleDriveLink(e.target.value)}
//                     placeholder="Paste Google Drive video URL here"
//                     className="flex-1"
//                   />
//                   <Button
//                     onClick={() => {
//                       if (googleDriveLink) {
//                         onSubmit({ googleDriveUrl: googleDriveLink });
//                       }
//                     }}
//                     disabled={!googleDriveLink}
//                   >
//                     Submit Link
//                   </Button>
//                 </div>
//                 <div className="text-xs text-muted-foreground mt-2">
//                   Make sure the Google Drive link is public or accessible
//                 </div>
//               </div>
//             </div>
//           )}
          
//           {
//             initialData.videoUrl && !isEditing && (
//               <div className="text-xs text-muted-foreground mt-2">
//                  Videos Can Take Few Moments to process. Refresh the page if video does not appear
//               </div>
//             )
//           }
//         </div>
//     )
// }












// "use client";

// import * as z from "zod";
// import axios from "axios";
// import Image from "next/image";
// import MuxPlayer from "@mux/mux-player-react"
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { ImageIcon, Pencil, PlusCircle, Video } from "lucide-react";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { Chapter, Course, muxData } from "@prisma/client";
// import { FileUpload } from "@/components/file-upload";

// interface ChapterVideoFormProps {
//     initialData: Chapter & {muxData?: muxData | null};
//     courseId: string;
//     chapterId: string;
// }

// // Updated form schema to accept either a videoUrl or googleDriveUrl
// const formSchema = z.object({
//     videoUrl: z.string().min(1).optional(),
//     googleDriveUrl: z.string().url().optional(),
// }).refine((data) => data.videoUrl || data.googleDriveUrl, {
//     message: "Either a video file or Google Drive URL must be provided",
//     path: ["videoUrl"],
// });

// export const ChapterVideoForm = ({
//     initialData,
//     courseId,
//     chapterId
// }:ChapterVideoFormProps) => {
   
//     const [isEditing, setIsEditing] = useState(false);
//     const [googleDriveLink, setGoogleDriveLink] = useState("");

//     const toggleEdit = () => setIsEditing((current) => !current);
//     const router = useRouter();

//     const onSubmit = async (values: z.infer<typeof formSchema>) => {
//         try {
//             // If googleDriveUrl is provided, we'll send that instead of videoUrl
//             const submissionData = values.googleDriveUrl 
//                 ? { googleDriveUrl: values.googleDriveUrl }
//                 : { videoUrl: values.videoUrl };
            
//             await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, submissionData);
//             toast.success("Chapter updated successfully");
//             setGoogleDriveLink(""); // Reset the input
//             toggleEdit();
//             router.refresh();
//         } catch {
//             toast.error("Something went wrong");
//         }
//     }

//     return (
//         <div className="mt-6 border bg-slate-100 rounded-md p-4">
//            <div className="font-medium flex items-center justify-between">
//              Section Video
//              <Button onClick={toggleEdit} variant="ghost">
//                 {isEditing && (
//                     <>Cancel </>
//                 )}
                
//                 {!isEditing && !initialData.videoUrl && !initialData.googleDriveUrl && (
//                   <>
//                   <PlusCircle className="h-4 w-4 mr-2"/>
//                   Add Video
//                   </>
//                 )}

//                 {!isEditing && (initialData.videoUrl || initialData.googleDriveUrl) && (
//                 <>
//                 <Pencil className="h-4 w-4 mr-2"/>
//                 Edit Video
//                 </>
//             )}
//              </Button>
//            </div>

//           {!isEditing && (
//             !initialData.videoUrl && !initialData.googleDriveUrl ? (
//               <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
//                 <Video className="h-10 w-4 mr-2 text-slate-500"/>
//               </div>
//             ) : initialData.googleDriveUrl ? (
//               <div className="relative aspect-video mt-2">
//                 <iframe
//                   src={initialData.googleDriveUrl.replace("/view", "/preview")}
//                   width="100%"
//                   height="100%"
//                   allow="autoplay"
//                   title="Google Drive Video"
//                   className="rounded-md"
//                 />
//               </div>
//             ): (
//               <div className="relative aspect-video mt-2">
//                 <MuxPlayer
//                 playbackId={initialData?.muxData?.playbackId || ""}
//                 />
//               </div>
//             )
//           )}

//           {isEditing && (
//             <div>
//               <FileUpload
//                endpoint="chapterVideo"
//                onChange={(url)=>{
//                      if(url){
//                       onSubmit({videoUrl: url});
//                      }
//                }}
//               />
//               <div className="text-xs text-muted-foreground mt-4 mb-4">
//                 Upload this sections video
//               </div>
              
//               <div className="mt-4">
//                 <p className="text-sm font-medium mb-2">Or use a Google Drive link:</p>
//                 <div className="flex gap-2">
//                   <Input
//                     value={googleDriveLink}
//                     onChange={(e) => setGoogleDriveLink(e.target.value)}
//                     placeholder="Paste Google Drive video URL here"
//                     className="flex-1"
//                   />
//                   <Button
//                     onClick={() => {
//                       if (googleDriveLink) {
//                         onSubmit({ googleDriveUrl: googleDriveLink });
//                       }
//                     }}
//                     disabled={!googleDriveLink}
//                   >
//                     Submit Link
//                   </Button>
//                 </div>
//                 <div className="text-xs text-muted-foreground mt-2">
//                   Make sure the Google Drive link is public or accessible
//                 </div>
//               </div>
//             </div>
//           )}
          
//           {
//             initialData.videoUrl && !isEditing && (
//               <div className="text-xs text-muted-foreground mt-2">
//                  Videos Can Take Few Moments to process. Refresh the page if video does not appear
//               </div>
//             )
//           }
//         </div>
//     )
// }






// "use client";

// import * as z from "zod";
// import axios from "axios";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Pencil, PlusCircle, Video } from "lucide-react";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { Chapter, muxData } from "@prisma/client";
// import { FileUpload } from "@/components/file-upload";
// import MuxPlayer from "@mux/mux-player-react";

// interface ChapterVideoFormProps {
//   initialData: Chapter & { muxData?: muxData | null };
//   courseId: string;
//   chapterId: string;
// }

// // Updated form schema with stricter Google Drive URL validation
// const formSchema = z.object({
//   videoUrl: z.string().min(1).optional(),
//   googleDriveUrl: z
//     .string()
//     .optional()
//     .refine(
//       (val) =>
//         !val ||
//         val.match(/^[a-zA-Z0-9_-]+$/) || // File ID
//         val.match(/https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+/) || // File URL
//         val.match(/https:\/\/drive\.google\.com\/open\?id=[a-zA-Z0-9_-]+/), // Open URL
//       {
//         message: "Invalid Google Drive URL or file ID. Use a valid Google Drive link or file ID.",
//         path: ["googleDriveUrl"],
//       }
//     ),
// }).refine((data) => data.videoUrl || data.googleDriveUrl, {
//   message: "Either a video file or Google Drive URL must be provided",
//   path: ["videoUrl"],
// });

// export const ChapterVideoForm = ({
//   initialData,
//   courseId,
//   chapterId,
// }: ChapterVideoFormProps) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [googleDriveLink, setGoogleDriveLink] = useState("");

//   const toggleEdit = () => setIsEditing((current) => !current);
//   const router = useRouter();

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       const submissionData = values.googleDriveUrl
//         ? { googleDriveUrl: values.googleDriveUrl }
//         : { videoUrl: values.videoUrl };

//       await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, submissionData);
//       toast.success("Chapter updated successfully");
//       setGoogleDriveLink("");
//       toggleEdit();
//       router.refresh();
//     } catch {
//       toast.error("Something went wrong");
//     }
//   };

//   // Helper function to get Google Drive embed URL for preview
//   const getGoogleDriveEmbedUrl = (url: string) => {
//     const fileId = extractGoogleDriveFileId(url);
//     return `https://drive.google.com/file/d/${fileId}/preview`;
//   };

//   return (
//     <div className="mt-6 border bg-slate-100 rounded-md p-4">
//       <div className="font-medium flex items-center justify-between">
//         Section Video
//         <Button onClick={toggleEdit} variant="ghost">
//           {isEditing && <>Cancel</>}
//           {!isEditing && !initialData.videoUrl && !initialData.googleDriveUrl && (
//             <>
//               <PlusCircle className="h-4 w-4 mr-2" />
//               Add Video
//             </>
//           )}
//           {!isEditing && (initialData.videoUrl || initialData.googleDriveUrl) && (
//             <>
//               <Pencil className="h-4 w-4 mr-2" />
//               Edit Video
//             </>
//           )}
//         </Button>
//       </div>

//       {!isEditing &&
//         (!initialData.videoUrl && !initialData.googleDriveUrl ? (
//           <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
//             <Video className="h-10 w-10 text-slate-500" />
//           </div>
//         ) : initialData.googleDriveUrl ? (
//           <div className="relative aspect-video mt-2">
//             <iframe
//               src={getGoogleDriveEmbedUrl(initialData.googleDriveUrl)}
//               width="100%"
//               height="100%"
//               allow="autoplay"
//               title="Google Drive Video"
//               className="rounded-md"
//             />
//           </div>
//         ) : (
//           <div className="relative aspect-video mt-2">
//             <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
//           </div>
//         ))}

//       {isEditing && (
//         <div>
//           <FileUpload
//             endpoint="chapterVideo"
//             onChange={(url) => {
//               if (url) {
//                 onSubmit({ videoUrl: url });
//               }
//             }}
//           />
//           <div className="text-xs text-muted-foreground mt-4 mb-4">
//             Upload this section&apos;s video
//           </div>

//           <div className="mt-4">
//             <p className="text-sm font-medium mb-2">Or use a Google Drive link:</p>
//             <div className="flex gap-2">
//               <Input
//                 value={googleDriveLink}
//                 onChange={(e) => setGoogleDriveLink(e.target.value)}
//                 placeholder="Paste Google Drive video URL or file ID here"
//                 className="flex-1"
//               />
//               <Button
//                 onClick={() => {
//                   if (googleDriveLink) {
//                     onSubmit({ googleDriveUrl: googleDriveLink });
//                   }
//                 }}
//                 disabled={!googleDriveLink}
//               >
//                 Submit Link
//               </Button>
//             </div>
//             <div className="text-xs text-muted-foreground mt-2">
//               Make sure the Google Drive link is set to &quot;Anyone with the link&quot; or &quot;Public&quot; to ensure it is accessible to all users.
//             </div>
//           </div>
//         </div>
//       )}

//       {initialData.videoUrl && !isEditing && (
//         <div className="text-xs text-muted-foreground mt-2">
//           Videos can take a few moments to process. Refresh the page if the video does not appear.
//         </div>
//       )}
//     </div>
//   );
// };

// // Helper function to extract Google Drive file ID
// function extractGoogleDriveFileId(urlOrId: string): string {
//   if (!urlOrId.includes("http")) {
//     return urlOrId;
//   }
//   const fileId =
//     urlOrId.match(/\/d\/([^/]+)(?:\/|$)/)?.[1] ||
//     urlOrId.match(/[?&]id=([^&]+)/)?.[1];
//   return fileId || urlOrId;
// }










// "use client";

// import * as z from "zod";
// import axios from "axios";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Pencil, PlusCircle, Video } from "lucide-react";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { Chapter, muxData } from "@prisma/client";
// import { FileUpload } from "@/components/file-upload";
// import MuxPlayer from "@mux/mux-player-react";

// interface ChapterVideoFormProps {
//   initialData: Chapter & { muxData?: muxData | null };
//   courseId: string;
//   chapterId: string;
// }

// const formSchema = z.object({
//   videoUrl: z.string().min(1).optional(),
//   googleDriveUrl: z
//     .string()
//     .optional()
//     .refine(
//       (val) =>
//         !val ||
//         val.match(/^[a-zA-Z0-9_-]+$/) ||
//         val.match(/https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+/) ||
//         val.match(/https:\/\/drive\.google\.com\/open\?id=[a-zA-Z0-9_-]+/),
//       {
//         message: "Invalid Google Drive URL or file ID. Use a valid Google Drive link or file ID.",
//         path: ["googleDriveUrl"],
//       }
//     ),
// }).refine((data) => data.videoUrl || data.googleDriveUrl, {
//   message: "Either a video file or Google Drive URL must be provided",
//   path: ["videoUrl"],
// });

// export const ChapterVideoForm = ({
//   initialData,
//   courseId,
//   chapterId,
// }: ChapterVideoFormProps) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [googleDriveLink, setGoogleDriveLink] = useState("");

//   const toggleEdit = () => setIsEditing((current) => !current);
//   const router = useRouter();

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       const submissionData = values.googleDriveUrl
//         ? { googleDriveUrl: values.googleDriveUrl }
//         : { videoUrl: values.videoUrl };

//       await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, submissionData);
//       toast.success("Chapter updated successfully");
//       setGoogleDriveLink("");
//       toggleEdit();
//       router.refresh();
//     } catch {
//       toast.error("Something went wrong");
//     }
//   };

//   const getGoogleDriveEmbedUrl = (url: string) => {
//     const fileId = extractGoogleDriveFileId(url);
//     return `/api/proxy-video?fileId=${fileId}`;
//   };

//   return (
//     <div className="mt-6 border bg-slate-100 rounded-md p-4">
//       <div className="font-medium flex items-center justify-between">
//         Section Video
//         <Button onClick={toggleEdit} variant="ghost">
//           {isEditing && <>Cancel</>}
//           {!isEditing && !initialData.videoUrl && !initialData.googleDriveUrl && (
//             <>
//               <PlusCircle className="h-4 w-4 mr-2" />
//               Add Video
//             </>
//           )}
//           {!isEditing && (initialData.videoUrl || initialData.googleDriveUrl) && (
//             <>
//               <Pencil className="h-4 w-4 mr-2" />
//               Edit Video
//             </>
//           )}
//         </Button>
//       </div>

//       {!isEditing &&
//         (!initialData.videoUrl && !initialData.googleDriveUrl ? (
//           <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
//             <Video className="h-10 w-10 text-slate-500" />
//           </div>
//         ) : initialData.googleDriveUrl ? (
//           <div className="relative aspect-video mt-2">
//             <video
//               controls
//               src={getGoogleDriveEmbedUrl(initialData.googleDriveUrl)}
//               className="rounded-md w-full h-full"
//             />
//           </div>
//         ) : (
//           <div className="relative aspect-video mt-2">
//             <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
//           </div>
//         ))}

//       {isEditing && (
//         <div>
//           <FileUpload
//             endpoint="chapterVideo"
//             onChange={(url) => {
//               if (url) {
//                 onSubmit({ videoUrl: url });
//               }
//             }}
//           />
//           <div className="text-xs text-muted-foreground mt-4 mb-4">
//             Upload this section&apos;s video
//           </div>

//           <div className="mt-4">
//             <p className="text-sm font-medium mb-2">Or use a Google Drive link:</p>
//             <div className="flex gap-2">
//               <Input
//                 value={googleDriveLink}
//                 onChange={(e) => setGoogleDriveLink(e.target.value)}
//                 placeholder="Paste Google Drive video URL or file ID here"
//                 className="flex-1"
//               />
//               <Button
//                 onClick={() => {
//                   if (googleDriveLink) {
//                     onSubmit({ googleDriveUrl: googleDriveLink });
//                   }
//                 }}
//                 disabled={!googleDriveLink}
//               >
//                 Submit Link
//               </Button>
//             </div>
//             <div className="text-xs text-muted-foreground mt-2">
//               Make sure the Google Drive link is set to &quot;Anyone with the link&quot; or &quot;Public&quot; to ensure it is accessible to all users.
//             </div>
//           </div>
//         </div>
//       )}

//       {initialData.videoUrl && !isEditing && (
//         <div className="text-xs text-muted-foreground mt-2">
//           Videos can take a few moments to process. Refresh the page if the video does not appear.
//         </div>
//       )}
//     </div>
//   );
// };

// function extractGoogleDriveFileId(urlOrId: string): string {
//   if (!urlOrId.includes("http")) {
//     return urlOrId;
//   }
//   const fileId =
//     urlOrId.match(/\/d\/([^/]+)(?:\/|$)/)?.[1] ||
//     urlOrId.match(/[?&]id=([^&]+)/)?.[1];
//   return fileId || urlOrId;
// }







"use client";

import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import MuxPlayer from "@mux/mux-player-react"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle, Video } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, Course, muxData } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";

interface ChapterVideoFormProps {
    initialData: Chapter & {muxData?: muxData | null};
    courseId: string;
    chapterId: string;
}

// Updated form schema to accept either a videoUrl or googleDriveUrl
const formSchema = z.object({
    videoUrl: z.string().min(1).optional(),
    googleDriveUrl: z.string().url().optional(),
}).refine((data) => data.videoUrl || data.googleDriveUrl, {
    message: "Either a video file or Google Drive URL must be provided",
    path: ["videoUrl"],
});

export const ChapterVideoForm = ({
    initialData,
    courseId,
    chapterId
}:ChapterVideoFormProps) => {
   
    const [isEditing, setIsEditing] = useState(false);
    const [googleDriveLink, setGoogleDriveLink] = useState("");

    const toggleEdit = () => setIsEditing((current) => !current);
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // If googleDriveUrl is provided, we'll send that instead of videoUrl
            const submissionData = values.googleDriveUrl 
                ? { googleDriveUrl: values.googleDriveUrl }
                : { videoUrl: values.videoUrl };
            
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, submissionData);
            toast.success("Chapter updated successfully");
            setGoogleDriveLink(""); // Reset the input
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
           <div className="font-medium flex items-center justify-between">
             Section Video
             <Button onClick={toggleEdit} variant="ghost">
                {isEditing && (
                    <>Cancel </>
                )}
                
                {!isEditing && !initialData.videoUrl && !initialData.googleDriveUrl && (
                  <>
                  <PlusCircle className="h-4 w-4 mr-2"/>
                  Add Video
                  </>
                )}

                {!isEditing && (initialData.videoUrl || initialData.googleDriveUrl) && (
                <>
                <Pencil className="h-4 w-4 mr-2"/>
                Edit Video
                </>
            )}
             </Button>
           </div>

          {!isEditing && (
            !initialData.videoUrl && !initialData.googleDriveUrl ? (
              <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                <Video className="h-10 w-4 mr-2 text-slate-500"/>
              </div>
            ) : initialData.googleDriveUrl ? (
              <div className="relative aspect-video mt-2">
                <iframe
                  src={initialData.googleDriveUrl.replace("/view", "/preview")}
                  width="100%"
                  height="100%"
                  allow="autoplay"
                  title="Google Drive Video"
                  className="rounded-md"
                />
              </div>
            ): (
              <div className="relative aspect-video mt-2">
                <MuxPlayer
                playbackId={initialData?.muxData?.playbackId || ""}
                />
              </div>
            )
          )}

          {isEditing && (
            <div>
              <FileUpload
               endpoint="chapterVideo"
               onChange={(url)=>{
                     if(url){
                      onSubmit({videoUrl: url});
                     }
               }}
              />
              <div className="text-xs text-muted-foreground mt-4 mb-4">
                Upload this sections video
              </div>
              
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Or use a Google Drive link:</p>
                <div className="flex gap-2">
                  <Input
                    value={googleDriveLink}
                    onChange={(e) => setGoogleDriveLink(e.target.value)}
                    placeholder="Paste Google Drive video URL here"
                    className="flex-1"
                  />
                  <Button
                    onClick={() => {
                      if (googleDriveLink) {
                        onSubmit({ googleDriveUrl: googleDriveLink });
                      }
                    }}
                    disabled={!googleDriveLink}
                  >
                    Submit Link
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Make sure the Google Drive link is public or accessible
                </div>
              </div>
            </div>
          )}
          
          {
            initialData.videoUrl && !isEditing && (
              <div className="text-xs text-muted-foreground mt-2">
                 Videos Can Take Few Moments to process. Refresh the page if video does not appear
              </div>
            )
          }
        </div>
    )
}




 