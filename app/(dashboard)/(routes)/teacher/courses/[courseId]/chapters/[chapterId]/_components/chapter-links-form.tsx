// "use client";

// import * as z from "zod";
// import axios from "axios";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {useForm} from  "react-hook-form";

// import {Form,FormControl,FormField,FormItem,FormMessage} from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Pencil } from "lucide-react";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { Textarea } from "@/components/ui/textarea";
// import { Chapter } from "@prisma/client";
// import { Editor } from "@/components/editor";
// import { Preview } from "@/components/preview";



// interface ChapterLinkFormProps {
//     initialData: Chapter;
//     courseId: string;
//     chapterId: string;
// }

// //creating a form schema
// const formSchema = z.object({
//     description: z.string().min(1),
//     // Add more fields as needed
// });



// export const ChapterLinkForm = ({
//     initialData,
//     courseId,
//     chapterId,
// }:ChapterLinkFormProps) => {
   
//     const[isEditing, setIsEditing] = useState(false)

//     const toggleEdit = () => setIsEditing((current) => !current);

//     const router = useRouter();


//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//           description: initialData?.description || ""
//         },
//     });

//     const {isSubmitting, isValid} = form.formState;

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
//              Recording Links
//              <Button onClick={toggleEdit} variant="ghost">
//                 {isEditing && (
//                     <>Cancel </>
//                 )}
//                 {!isEditing && (
//                 <>
//                 <Pencil className="h-4 w-4 mr-2"/>
//                 Edit Recording Links
//                 </>
//             )}
//              </Button>
//            </div>
//           {!isEditing && (
//             <div className= {cn(
//               "text-sm mt-2",
//               !initialData.description && "text-slate-500 italic"
//             )}>
//                 {!initialData.description && "No Recording Links Available"}
//                 {
//                   initialData.description && (
//                     <Preview 
//                     value={initialData.description}
//                     />
//                   )
//                 }
//             </div>
//           )}

//           {isEditing && (
//             <Form {...form}>
//              <form
//              onSubmit={form.handleSubmit(onSubmit)}
//              className="space-y-4 mt-4"
//              >
//                 <FormField
//                   control={form.control}
//                   name = "description"
//                   render={({field})=>(
//                     <FormItem>
//                       <FormControl>
//                         <Editor         
//                         {...field}
//                         /> 
//                         </FormControl>  
//                         <FormMessage/>
//                     </FormItem>
//                     )}
//                 />
//                   <div className="flex items-center gap-x-2">
//                     <Button
//                     disabled={!isValid || isSubmitting}
//                     type="submit"
//                     >
//                         Save
//                     </Button>

//                   </div>

//              </form>
//             </Form>
//           )}


//         </div>
//     )
 
// }





// "use client";

// import * as z from "zod";
// import axios from "axios";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";

// import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Pencil, Plus, Trash } from "lucide-react";
// import { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { Recording } from "@prisma/client"; // Import the Recording type from Prisma

// interface ChapterLinkFormProps {
//   initialData: {
//     recordings: Recording[]; // Array of recordings for the chapter
//   };
//   courseId: string;
//   chapterId: string;
// }

// // Create a form schema for a single recording
// const formSchema = z.object({
//   title: z.string().min(1, "Title is required"),
//   url: z.string().url("Must be a valid URL"),
//   duration: z.number().optional().transform((val) => (val ? Number(val) : undefined)), // Optional duration in minutes
// });

// export const ChapterLinkForm = ({ initialData, courseId, chapterId }: ChapterLinkFormProps) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [recordings, setRecordings] = useState<Recording[]>(initialData.recordings || []);
//   const router = useRouter();

//   // Fetch initial recordings when the component mounts
//   useEffect(() => {
//     const fetchRecordings = async () => {
//       try {
//         const response = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/recordings`);
//         setRecordings(response.data || []);
//       } catch (error) {
//         toast.error("Failed to load recordings");
//         console.error("Error fetching recordings:", error);
//       }
//     };

//     fetchRecordings();
//   }, [courseId, chapterId]);

//   const toggleEdit = () => setIsEditing((current) => !current);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       url: "",
//       duration: undefined,
//     },
//   });

//   const { isSubmitting, isValid } = form.formState;

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       const response = await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/classroom/`, values);
//       setRecordings((prev) => [...prev, response.data]);
//       toast.success("Recording added successfully");
//       form.reset();
//     } catch (error) {
//       toast.error("Something went wrong");
//       console.error("Error adding recording:", error);
//     }
//   };

//   const handleDeleteRecording = async (recordingId: string) => {
//     try {
//       await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}/classroom/`);
//       setRecordings(recordings.filter((r) => r.id !== recordingId));
//       toast.success("Recording deleted successfully");
//       router.refresh();
//     } catch (error) {
//       toast.error("Failed to delete recording");
//       console.error("Error deleting recording:", error);
//     }
//   };

//   return (
//     <div className="mt-6 border bg-slate-100 rounded-md p-4">
//       <div className="font-medium flex items-center justify-between">
//         Recordings
//         <Button onClick={toggleEdit} variant="ghost">
//           {isEditing ? (
//             <>Cancel </>
//           ) : (
//             <>
//               <Pencil className="h-4 w-4 mr-2" />
//               Edit Recordings
//             </>
//           )}
//         </Button>
//       </div>
//       {!isEditing && (
//         <div className={cn("text-sm mt-2", !recordings.length && "text-slate-500 italic")}>
//           {!recordings.length && "No Recordings Available"}
//           {recordings.length > 0 && (
//             <div className="space-y-2">
//               {recordings.map((recording) => (
//                 <div key={recording.id} className="p-2 border rounded-md">
//                   <p className="font-semibold">{recording.title}</p>
//                   <p>{recording.url}</p>
//                   {recording.duration && <p>Duration: {recording.duration} minutes</p>}
//                   <p>Uploaded: {new Date(recording.uploadedAt).toLocaleDateString()}</p>
//                   <Button
//                     variant="destructive"
//                     size="sm"
//                     onClick={() => handleDeleteRecording(recording.id)}
//                     className="mt-2"
//                   >
//                     <Trash className="h-4 w-4 mr-2" />
//                     Delete
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}

//       {isEditing && (
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input placeholder="Recording Title" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="url"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input placeholder="Recording URL" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="duration"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input type="number" placeholder="Duration (minutes, optional)" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <div className="flex items-center gap-x-2">
//               <Button disabled={!isValid || isSubmitting} type="submit">
//                 <Plus className="h-4 w-4 mr-2" />
//                 Add Recording
//               </Button>
//               <Button
//                 variant="outline"
//                 onClick={toggleEdit}
//                 disabled={isSubmitting}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </Form>
//       )}
//     </div>
//   );
// };




// "use client";

// import * as z from "zod";
// import axios from "axios";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";

// import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Pencil, Plus, Trash, Link as LinkIcon } from "lucide-react"; // Added LinkIcon for better visuals
// import { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { Recording } from "@prisma/client"; // Import the Recording type from Prisma
// import Link from "next/link"; // Import Next.js Link for clickable links

// interface ChapterLinkFormProps {
//   initialData: {
//     recordings: Recording[]; // Array of recordings for the chapter
//   };
//   courseId: string;
//   chapterId: string;
// }

// // Create a form schema for a single recording
// const formSchema = z.object({
//   title: z.string().min(1, "Title is required"),
//   url: z.string().url("Must be a valid URL"),
//   duration: z.number().optional().transform((val) => (val ? Number(val) : undefined)), // Optional duration in minutes
// });

// export const ChapterLinkForm = ({ initialData, courseId, chapterId }: ChapterLinkFormProps) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [recordings, setRecordings] = useState<Recording[]>(initialData.recordings || []);
//   const router = useRouter();

//   // Fetch initial recordings when the component mounts
//   useEffect(() => {
//     const fetchRecordings = async () => {
//       try {
//         const response = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/classroom`);
//         setRecordings(response.data || []);
//       } catch (error) {
//         toast.error("Failed to load recordings");
//         console.error("Error fetching recordings:", error);
//       }
//     };

//     fetchRecordings();
//   }, [courseId, chapterId]);

//   const toggleEdit = () => setIsEditing((current) => !current);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       url: "",
//       duration: undefined,
//     },
//   });

//   const { isSubmitting, isValid } = form.formState;

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       const response = await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/classroom`, values);
//       setRecordings((prev) => [...prev, response.data]);
//       toast.success("Recording added successfully");
//       form.reset();
//     } catch (error) {
//       toast.error("Something went wrong");
//       console.error("Error adding recording:", error);
//     }
//   };

//   const handleDeleteRecording = async (recordingId: string) => {
//     try {
//       await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}/classroom`, {
//         data: { recordingId }, // Send recordingId in the request body
//       });
//       setRecordings(recordings.filter((r) => r.id !== recordingId));
//       toast.success("Recording deleted successfully");
//       router.refresh();
//     } catch (error) {
//       toast.error("Failed to delete recording");
//       console.error("Error deleting recording:", error);
//     }
//   };

//   return (
//     <div className="mt-6 border bg-white rounded-lg shadow-md p-6">
//       <div className="font-medium flex items-center justify-between">
//         Recordings
//         <Button onClick={toggleEdit} variant="ghost" className="hover:bg-gray-100 transition-colors">
//           {isEditing ? (
//             <>Cancel </>
//           ) : (
//             <>
//               <Pencil className="h-4 w-4 mr-2 text-gray-600" />
//               Edit Recordings
//             </>
//           )}
//         </Button>
//       </div>
//       {!isEditing && (
//         <div className={cn("text-sm mt-4", !recordings.length && "text-gray-500 italic")}>
//           {!recordings.length && "No Recordings Available"}
//           {recordings.length > 0 && (
//             <div className="space-y-4">
//               {recordings.map((recording) => (
//                 <div key={recording.id} className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="font-semibold text-lg text-indigo-600">{recording.title}</p>
//                       <p className="text-blue-600 hover:underline">
//                         <Link href={recording.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
//                           <LinkIcon className="h-4 w-4 mr-1 text-blue-500" />
//                           {recording.url}
//                         </Link>
//                       </p>
//                       {recording.duration && <p className="text-gray-600">Duration: {recording.duration} minutes</p>}
//                       <p className="text-gray-500 text-sm">Uploaded: {new Date(recording.uploadedAt).toLocaleDateString()}
//                         <br></br>
//                       </p>

//                       <Button
//                       variant="destructive"
//                       size="sm"
//                       onClick={() => handleDeleteRecording(recording.id)}
//                       className="ml-4"
//                     >
//                       <Trash className="h-4 w-4 mr-2 text-white" />
//                       Delete
//                     </Button>
                    
//                     </div>
                    
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}

//       {isEditing && (
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input placeholder="Recording Title" {...field} className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" />
//                   </FormControl>
//                   <FormMessage className="text-red-500" />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="url"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input placeholder="Recording URL" {...field} className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" />
//                   </FormControl>
//                   <FormMessage className="text-red-500" />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="duration"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input type="number" placeholder="Duration (minutes, optional)" {...field} className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" />
//                   </FormControl>
//                   <FormMessage className="text-red-500" />
//                 </FormItem>
//               )}
//             />
//             <div className="flex items-center gap-x-4">
//               <Button disabled={!isValid || isSubmitting} type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
//                 <Plus className="h-4 w-4 mr-2" />
//                 Add Recording
//               </Button>
//               <Button
//                 variant="outline"
//                 onClick={toggleEdit}
//                 disabled={isSubmitting}
//                 className="border-gray-300 text-gray-700 hover:bg-gray-100"
//               >
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </Form>
//       )}
//     </div>
//   );
// };







// "use client";

// import * as z from "zod";
// import axios from "axios";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { useState, useEffect, useCallback } from "react"; // Added useCallback for better performance

// import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Pencil, Plus, Trash, Link as LinkIcon, Edit2 } from "lucide-react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { Recording } from "@prisma/client";
// import Link from "next/link";

// interface ChapterLinkFormProps {
//   initialData: {
//     recordings: Recording[]; // Array of recordings for the chapter
//   };
//   courseId: string;
//   chapterId: string;
// }

// // Create a form schema for a single recording
// const formSchema = z.object({
//   title: z.string().min(1, "Title is required"),
//   url: z.string().url("Must be a valid URL"),
//   duration: z.number().optional().transform((val) => (val ? Number(val) : undefined)), // Optional duration in minutes
// });

// export const ChapterLinkForm = ({ initialData, courseId, chapterId }: ChapterLinkFormProps) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [recordings, setRecordings] = useState<Recording[]>([]);
//   const [editingRecordingId, setEditingRecordingId] = useState<string | null>(null);
//   const router = useRouter();

//   // Memoize fetchRecordings to prevent unnecessary re-renders
//   const fetchRecordings = useCallback(async () => {
//     try {
//       const response = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/classroom`);
//       setRecordings(response.data || []);
//     } catch (error) {
//       toast.error("Failed to load recordings");
//       console.error("Error fetching recordings:", error);
//     }
//   }, [courseId, chapterId]);

//   // Fetch recordings only on client side after mount
//   useEffect(() => {
//     fetchRecordings();
//   }, [fetchRecordings]);

//   const toggleEdit = () => setIsEditing((current) => !current);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       url: "",
//       duration: undefined,
//     },
//   });

//   const { isSubmitting, isValid } = form.formState;

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       if (editingRecordingId) {
//         // Update existing recording
//         const response = await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/classroom`, {
//           ...values,
//           recordingId: editingRecordingId,
//         });
//         setRecordings(recordings.map((r) => (r.id === editingRecordingId ? response.data : r)));
//         setEditingRecordingId(null);
//         toast.success("Recording updated successfully");
//       } else {
//         // Create new recording
//         const response = await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/classroom`, values);
//         setRecordings((prev) => [...prev, response.data]);
//         toast.success("Recording added successfully");
//       }
//       form.reset();
//       toggleEdit();
//     } catch (error) {
//       toast.error("Something went wrong");
//       console.error("Error saving recording:", error);
//     }
//   };

//   const handleDeleteRecording = async (recordingId: string) => {
//     try {
//       await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}/classroom`, {
//         data: { recordingId },
//       });
//       setRecordings(recordings.filter((r) => r.id !== recordingId));
//       toast.success("Recording deleted successfully");
//       router.refresh();
//     } catch (error) {
//       toast.error("Failed to delete recording");
//       console.error("Error deleting recording:", error);
//     }
//   };

//   const handleEditRecording = (recording: Recording) => {
//     setEditingRecordingId(recording.id);
//     setIsEditing(true);
//     form.reset({
//       title: recording.title,
//       url: recording.url,
//       duration: recording.duration || undefined,
//     });
//   };

//   // Ensure initial render matches server-side
//   if (!recordings.length && !isEditing) {
//     return (
//       <div className="mt-6 border bg-white rounded-lg shadow-md p-6">
//         <div className="font-medium flex items-center justify-between">
//           Recordings
//           <Button onClick={toggleEdit} variant="ghost" className="hover:bg-gray-100 transition-colors">
//             <Pencil className="h-4 w-4 mr-2 text-gray-600" />
//             Add Recordings
//           </Button>
//         </div>
//         <div className="text-sm mt-4 text-gray-500 italic">No Recordings Available</div>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-6 border bg-white rounded-lg shadow-md p-6">
//       <div className="font-medium flex items-center justify-between">
//         Recordings
//         <Button onClick={toggleEdit} variant="ghost" className="hover:bg-gray-100 transition-colors">
//           {isEditing ? (
//             <>Cancel </>
//           ) : (
//             <>
//               <Pencil className="h-4 w-4 mr-2 text-gray-600" />
//               Add Recordings
//             </>
//           )}
//         </Button>
//       </div>
//       {!isEditing && (
//         <div className={cn("text-sm mt-4", !recordings.length && "text-gray-500 italic")}>
//           {recordings.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {recordings.map((recording) => (
//                 <div key={recording.id} className="p-6 border rounded-lg bg-gray-50 hover:shadow-lg transition-shadow duration-200">
//                   <div className="space-y-4">
//                     <h3 className="font-semibold text-xl text-indigo-700">{recording.title}</h3>
//                     <p className="text-blue-600 hover:text-blue-800">
//                       <Link href={recording.url} target="_blank" rel="noopener noreferrer" className="flex items-center group">
//                         <LinkIcon className="h-5 w-5 mr-2 text-blue-500 group-hover:text-blue-700 transition-colors" />
//                         <span className="underline decoration-dotted decoration-1 underline-offset-4">{recording.url}</span>
//                       </Link>
//                     </p>
//                     {recording.duration && <p className="text-gray-600">Duration: {recording.duration} minutes</p>}
//                     <p className="text-gray-500 text-sm">Uploaded: {new Date(recording.uploadedAt).toLocaleDateString()}</p>
//                     <div className="flex gap-4">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => handleEditRecording(recording)}
//                         className="border-gray-300 text-gray-700 hover:bg-gray-100"
//                       >
//                         <Edit2 className="h-4 w-4 mr-2" />
//                         Edit
//                       </Button>
//                       <Button
//                         variant="destructive"
//                         size="sm"
//                         onClick={() => handleDeleteRecording(recording.id)}
//                         className="bg-red-600 hover:bg-red-700 text-white transition-colors"
//                       >
//                         <Trash className="h-4 w-4 mr-2" />
//                         Delete
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-gray-500 italic">No Recordings Available</div>
//           )}
//         </div>
//       )}

//       {isEditing && (
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input placeholder="Recording Title" {...field} className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" />
//                   </FormControl>
//                   <FormMessage className="text-red-500" />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="url"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input placeholder="Recording URL" {...field} className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" />
//                   </FormControl>
//                   <FormMessage className="text-red-500" />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="duration"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input type="number" placeholder="Duration (minutes, optional)" {...field} className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" />
//                   </FormControl>
//                   <FormMessage className="text-red-500" />
//                 </FormItem>
//               )}
//             />
//             <div className="flex items-center gap-x-4">
//               <Button disabled={!isValid || isSubmitting} type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
//                 {editingRecordingId ? "Update Recording" : "Add Recording"}
//                 <Plus className="h-4 w-4 ml-2" />
//               </Button>
//               <Button
//                 variant="outline"
//                 onClick={toggleEdit}
//                 disabled={isSubmitting}
//                 className="border-gray-300 text-gray-700 hover:bg-gray-100"
//               >
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </Form>
//       )}
//     </div>
//   );
// };











// "use client";

// import * as z from "zod";
// import axios from "axios";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { useState, useEffect, useCallback } from "react"; // Added useCallback for better performance

// import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Pencil, Plus, Trash, Link as LinkIcon, Edit2 } from "lucide-react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { Recording } from "@prisma/client";
// import Link from "next/link";

// interface ChapterLinkFormProps {
//   initialData: {
//     recordings: Recording[]; // Array of recordings for the chapter
//   };
//   courseId: string;
//   chapterId: string;
// }

// // Create a form schema for a single recording
// const formSchema = z.object({
//   title: z.string().min(1, "Title is required"),
//   url: z.string().url("Must be a valid URL").min(1, "URL is required"),
//   duration: z.number().optional().transform((val) => (val ? Number(val) : undefined)), // Optional duration in minutes
// });

// export const ChapterLinkForm = ({ initialData, courseId, chapterId }: ChapterLinkFormProps) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [recordings, setRecordings] = useState<Recording[]>(initialData.recordings || []); // Start with server-side data
//   const [editingRecordingId, setEditingRecordingId] = useState<string | null>(null);
//   const router = useRouter();

//   // Memoize fetchRecordings to prevent unnecessary re-renders
//   const fetchRecordings = useCallback(async () => {
//     try {
//       const response = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/classroom`);
//       setRecordings(response.data || []);
//     } catch (error) {
//       toast.error("Failed to load recordings");
//       console.error("Error fetching recordings:", handleError(error));
//     }
//   }, [courseId, chapterId]);

//   // Fetch recordings on client side after mount, but don’t block initial render
//   useEffect(() => {
//     fetchRecordings();
//   }, [fetchRecordings]);

//   const toggleEdit = () => setIsEditing((current) => !current);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       url: "",
//       duration: undefined,
//     },
//   });

//   const { isSubmitting, isValid } = form.formState;

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       if (editingRecordingId) {
//         // Update existing recording
//         const response = await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/classroom`, {
//           ...values,
//           recordingId: editingRecordingId,
//         });
//         setRecordings(recordings.map((r) => (r.id === editingRecordingId ? response.data : r)));
//         setEditingRecordingId(null);
//         toast.success("Recording updated successfully");
//       } else {
//         // Create new recording
//         const response = await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/classroom`, values);
//         setRecordings((prev) => [...prev, response.data]);
//         toast.success("Recording added successfully");
//       }
//       form.reset();
//       toggleEdit();
//     } catch (error) {
//       const errorMessage = handleError(error);
//       toast.error(`Failed to save recording: ${errorMessage}`);
//       console.error("Error saving recording:", error);
//     } finally {
//       // Ensure isSubmitting is reset even on error
//       form.setValue("duration", undefined); // Reset duration to avoid stale values
//     }
//   };

//   const handleDeleteRecording = async (recordingId: string) => {
//     try {
//       await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}/classroom`, {
//         data: { recordingId },
//       });
//       setRecordings(recordings.filter((r) => r.id !== recordingId));
//       toast.success("Recording deleted successfully");
//       router.refresh();
//     } catch (error) {
//       toast.error("Failed to delete recording");
//       console.error("Error deleting recording:", handleError(error));
//     }
//   };

//   const handleEditRecording = (recording: Recording) => {
//     setEditingRecordingId(recording.id);
//     setIsEditing(true);
//     form.reset({
//       title: recording.title,
//       url: recording.url,
//       duration: recording.duration || undefined,
//     });
//   };

//   // Helper function to handle errors and extract messages
//   function handleError(error: unknown): string {
//     if (error instanceof Error) {
//       return error.message;
//     } else if (typeof error === "string") {
//       return error;
//     } else if (error && typeof error === "object" && "message" in error) {
//       return String(error.message);
//     }
//     return "An unknown error occurred";
//   }

//   // Ensure initial render matches server-side
//   if (!recordings.length && !isEditing) {
//     return (
//       <div className="mt-6 border bg-white rounded-lg shadow-md p-6">
//         <div className="font-medium flex items-center justify-between">
//           Recordings
//           <Button onClick={toggleEdit} variant="ghost" className="hover:bg-gray-100 transition-colors">
//             <Pencil className="h-4 w-4 mr-2 text-gray-600" />
//             Add Recordings
//           </Button>
//         </div>
//         <div className="text-sm mt-4 text-gray-500 italic">No Recordings Available</div>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-6 border bg-white rounded-lg shadow-md p-6">
//       <div className="font-medium flex items-center justify-between">
//         Recordings
//         <Button onClick={toggleEdit} variant="ghost" className="hover:bg-gray-100 transition-colors">
//           {isEditing ? (
//             <>Cancel </>
//           ) : (
//             <>
//               <Pencil className="h-4 w-4 mr-2 text-gray-600" />
//               Add Recordings
//             </>
//           )}
//         </Button>
//       </div>
//       {!isEditing && (
//         <div className={cn("text-sm mt-4", !recordings.length && "text-gray-500 italic")}>
//           {recordings.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {recordings.map((recording) => (
//                 <div key={recording.id} className="p-6 border rounded-lg bg-gray-50 hover:shadow-lg transition-shadow duration-200">
//                   <div className="space-y-4">
//                     <h3 className="font-semibold text-xl text-indigo-700">{recording.title}</h3>
//                     <p className="text-blue-600 hover:text-blue-800">
//                       <Link href={recording.url} target="_blank" rel="noopener noreferrer" className="flex items-center group">
//                         <LinkIcon className="h-5 w-5 mr-2 text-blue-500 group-hover:text-blue-700 transition-colors" />
//                         <span className="underline decoration-dotted decoration-1 underline-offset-4">{recording.url}</span>
//                       </Link>
//                     </p>
//                     {recording.duration && <p className="text-gray-600">Duration: {recording.duration} minutes</p>}
//                     <p className="text-gray-500 text-sm">Uploaded: {new Date(recording.uploadedAt).toLocaleDateString()}</p>
//                     <div className="flex gap-4">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => handleEditRecording(recording)}
//                         className="border-gray-300 text-gray-700 hover:bg-gray-100"
//                       >
//                         <Edit2 className="h-4 w-4 mr-2" />
//                         Edit
//                       </Button>
//                       <Button
//                         variant="destructive"
//                         size="sm"
//                         onClick={() => handleDeleteRecording(recording.id)}
//                         className="bg-red-600 hover:bg-red-700 text-white transition-colors"
//                       >
//                         <Trash className="h-4 w-4 mr-2" />
//                         Delete
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-gray-500 italic">No Recordings Available</div>
//           )}
//         </div>
//       )}

//       {isEditing && (
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input placeholder="Recording Title" {...field} className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" />
//                   </FormControl>
//                   <FormMessage className="text-red-500" />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="url"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input placeholder="Recording URL (e.g., Google Drive link)" {...field} className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" />
//                   </FormControl>
//                   <FormMessage className="text-red-500" />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="duration"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input type="number" placeholder="Duration (minutes, optional)" {...field} className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" />
//                   </FormControl>
//                   <FormMessage className="text-red-500" />
//                 </FormItem>
//               )}
//             />
//             <div className="flex items-center gap-x-4">
//               <Button disabled={!isValid || isSubmitting} type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
//                 {editingRecordingId ? "Update Recording" : "Add Recording"}
//                 <Plus className="h-4 w-4 ml-2" />
//               </Button>
//               <Button
//                 variant="outline"
//                 onClick={toggleEdit}
//                 disabled={isSubmitting}
//                 className="border-gray-300 text-gray-700 hover:bg-gray-100"
//               >
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </Form>
//       )}
//     </div>
//   );
// };








"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react"; // Added useCallback for better performance

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash, Link as LinkIcon, Edit2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Recording } from "@prisma/client";
import Link from "next/link";

interface ChapterLinkFormProps {
  initialData: {
    recordings: Recording[]; // Array of recordings for the chapter
  };
  courseId: string;
  chapterId: string;
}

// Create a form schema for a single recording
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Must be a valid URL").min(1, "URL is required"),
  duration: z.number().optional().transform((val) => (val ? Number(val) : undefined)), // Optional duration in minutes
});

export const ChapterLinkForm = ({ initialData, courseId, chapterId }: ChapterLinkFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [recordings, setRecordings] = useState<Recording[]>(initialData.recordings || []); // Start with server-side data
  const [editingRecordingId, setEditingRecordingId] = useState<string | null>(null);
  const router = useRouter();

  // Memoize fetchRecordings to prevent unnecessary re-renders
  const fetchRecordings = useCallback(async () => {
    try {
      const response = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/classroom`);
      setRecordings(response.data || []);
    } catch (error) {
      toast.error("Failed to load recordings");
      console.error("Error fetching recordings:", handleError(error));
    }
  }, [courseId, chapterId]);

  // Fetch recordings on client side after mount, but don’t block initial render
  useEffect(() => {
    fetchRecordings();
  }, [fetchRecordings]);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
      duration: undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (editingRecordingId) {
        // Update existing recording
        const response = await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/classroom`, {
          ...values,
          recordingId: editingRecordingId,
        });
        setRecordings(recordings.map((r) => (r.id === editingRecordingId ? response.data : r)));
        setEditingRecordingId(null);
        toast.success("Recording updated successfully");
      } else {
        // Create new recording
        const response = await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/classroom`, values);
        setRecordings((prev) => [...prev, response.data]);
        toast.success("Recording added successfully");
      }
      form.reset();
      toggleEdit();
    } catch (error) {
      const errorMessage = handleError(error);
      toast.error(`Failed to save recording: ${errorMessage}`);
      console.error("Error saving recording:", error);
    } finally {
      // Ensure isSubmitting is reset even on error
      form.setValue("duration", undefined); // Reset duration to avoid stale values
    }
  };

  const handleDeleteRecording = async (recordingId: string) => {
    try {
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}/classroom`, {
        data: { recordingId },
      });
      setRecordings(recordings.filter((r) => r.id !== recordingId));
      toast.success("Recording deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete recording");
      console.error("Error deleting recording:", handleError(error));
    }
  };

  const handleEditRecording = (recording: Recording) => {
    setEditingRecordingId(recording.id);
    setIsEditing(true);
    form.reset({
      title: recording.title,
      url: recording.url,
      duration: recording.duration || undefined,
    });
  };

  // Helper function to handle errors and extract messages
  function handleError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    } else if (typeof error === "string") {
      return error;
    } else if (error && typeof error === "object" && "message" in error) {
      return String(error.message);
    }
    return "An unknown error occurred";
  }

  // Ensure initial render matches server-side
  if (!recordings.length && !isEditing) {
    return (
      <div className="mt-6 border bg-white rounded-lg shadow-md p-6">
        <div className="font-medium flex items-center justify-between">
          Recordings
          <Button onClick={toggleEdit} variant="ghost" className="hover:bg-gray-100 transition-colors">
            <Pencil className="h-4 w-4 mr-2 text-gray-600" />
            Add Recordings
          </Button>
        </div>
        <div className="text-sm mt-4 text-gray-500 italic">No Recordings Available</div>
      </div>
    );
  }

  return (
    <div className="mt-6 border bg-white rounded-lg shadow-md p-6">
      <div className="font-medium flex items-center justify-between">
        Recordings
        <Button onClick={toggleEdit} variant="ghost" className="hover:bg-gray-100 transition-colors">
          {isEditing ? (
            <>Cancel </>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2 text-gray-600" />
              Add Recordings
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className={cn("text-sm mt-4", !recordings.length && "text-gray-500 italic")}>
          {recordings.length > 0 ? (
            <div className="flex flex-row flex-wrap gap-6 justify-between px-6">
              {recordings.map((recording) => (
           <div 
           key={recording.id} 
           className="p-6 border rounded-lg bg-gray-50 hover:shadow-lg transition-shadow duration-200 w-full lg:w-[80%] xl:w-[70%]">
           
           <div className="space-y-6">
             <h3 className="text-lg font-semibold text-gray-900">
               {recording.title}
             </h3>
             <p className="text-blue-600 hover:text-blue-800">
               Link: 
               <Link 
                 href={recording.url} 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="underline text-blue-600 hover:text-blue-800 ml-2">
                 {recording.url}
               </Link>
             </p>
             {recording.duration && (
               <p className="text-gray-600">Duration: {recording.duration} minutes</p>
             )}
             <p className="text-gray-500 text-sm">Uploaded: {new Date(recording.uploadedAt).toLocaleDateString()}</p>
             
             <div className="flex gap-4">
               <Button
                 variant="outline"
                 size="sm"
                 onClick={() => handleEditRecording(recording)}
                 className="border-gray-300 text-gray-700 hover:bg-gray-100">
                 <Edit2 className="h-4 w-4 mr-2" />
                 Edit
               </Button>
               <Button
                 variant="destructive"
                 size="sm"
                 onClick={() => handleDeleteRecording(recording.id)}
                 className="bg-red-600 hover:bg-red-700 text-white transition-colors">
                 <Trash className="h-4 w-4 mr-2" />
                 Delete
               </Button>
             </div>
           </div>
         </div>
         
         
              ))}
            </div>
          ) : (
            <div className="text-gray-500 italic">No Recordings Available</div>
          )}
        </div>
      )}

      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Recording Title" {...field} className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Recording URL (e.g., Google Drive link)" {...field} className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="number" placeholder="Duration (minutes, optional)" {...field} className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-4">
              <Button disabled={!isValid || isSubmitting} type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                {editingRecordingId ? "Update Recording" : "Add Recording"}
                <Plus className="h-4 w-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={toggleEdit}
                disabled={isSubmitting}
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};