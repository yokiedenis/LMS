// "use client";

// import React, { useState, useEffect } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Trash } from "lucide-react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { QuizList } from "./chapter-quiz-list";
// import { useRouter } from "next/navigation";

// const formSchema = z.object({
//   title: z.string().min(3, "Title must be at least 3 characters long"),
//   questions: z
//     .array(
//       z.object({
//         text: z.string().min(5, "Question must be at least 5 characters long"),
//         options: z
//           .array(z.string().min(1, "Option cannot be empty"))
//           .min(4, "At least 4 options are required"),
//         correctAnswer: z.string().min(1, "Correct answer is required"),
//       })
//     )
//     .min(1, "At least one question is required"),
// });

// type Quiz = {
//   id: string;
//   title: string;
//   courseId: string;
//   chapterId: string; // Ensure chapterId is a string and required
//   createdAt: Date;
//   updatedAt: Date;
//   _count: {
//     questions: number;
//   } | null;
// };

// export const ChapterQuizForm = ({
//   courseId,
//   chapterId,
// }: {
//   courseId: string;
//   chapterId: string; // Ensure chapterId is passed correctly and is required
// }) => {
//   const [isCreating, setIsCreating] = useState(false);
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//   const [editingQuiz, setEditingQuiz] = useState<any | null>(null); // State for editing quiz
//   const [isUpdating, setIsUpdating] = useState(false);

//   const router = useRouter();

//   // Fetch quizzes from the database
//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const response = await axios.get(`/api/courses/${courseId}/chapterquizzes/fetch-chapterquiz-course`);
//         setQuizzes(response.data);
//       } catch (error) {
//         toast.error("Failed to fetch quizzes.");
//       }
//     };

//     fetchQuizzes();
//   }, [courseId]); // Fetch quizzes when courseId changes

  

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       questions: [
//         {
//           text: "",
//           options: ["", "", "", ""],
//           correctAnswer: "",
//         },
//       ],
//     },
//   });

     

//   const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: "questions",
//   });

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       setIsCreating(true);
//       if (editingQuiz) {
//         // Update existing ChapterQuiz
//         await axios.put(`/api/courses/${courseId}/chapterquizzes/${editingQuiz.id}/update`, { 
//           ...values, 
//           courseId,
//           chapterId, // Pass chapterId directly to the API
//         });
//         toast.success('Chapter quiz updated successfully!');
//       } else {
//         // Create new ChapterQuiz
//         await axios.post(`/api/courses/${courseId}/chapterquizzes`, { 
//           ...values, 
//           courseId, 
//           chapterId, // Pass chapterId directly to the API
//         });
//         toast.success("Chapter quiz created successfully!");
//       }
//       form.reset();
//       setIsFormVisible(false);
//       setEditingQuiz(null); // Reset editing state after success
//       // Refetch quizzes after creating/updating
//       const response = await axios.get(`/api/courses/${courseId}/chapterquizzes/fetch-chapterquiz-course`);
//       setQuizzes(response.data);
//     } catch (error) {
//       toast.error("Failed to save chapter quiz. Please try again.");
//     } finally {
//       setIsCreating(false);
//     }
//   };
  

//   const onReorder = async (updateData: { id: string; position: number }[]) => {
//     try {
//       setIsUpdating(true);
  
//       // Sending a PUT request to reorder chapter quizzes
//       await axios.put(`/api/courses/${courseId}/chapterquizzes/reorder`, {
//         list: updateData,  // Data to update the order of quizzes
//       });
//       toast.success("Chapter quizzes reordered successfully!");
//       router.refresh();  // Refresh the page to reflect the changes
//     } catch {
//       toast.error("Something went wrong while reordering the chapter quizzes");
//     } finally {
//       setIsUpdating(false);
//     }
//   };
  

//   return (
//     <div className="space-y-8">
//       <Button
//         type="button"
//         onClick={() => setIsFormVisible(!isFormVisible)}
//         className="w-full"
//       >
//         {isFormVisible ? "Hide Quiz Form" : "Create a Quiz for the Chapter"}
//       </Button>

//       {isFormVisible && (
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input placeholder="Quiz Title" disabled={isCreating} {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <div className="space-y-6">
//               {fields.map((field, index) => (
//                 <QuestionForm
//                   key={field.id}
//                   questionIndex={index}
//                   field={field}
//                   remove={remove}
//                   fields={fields}
//                   form={form}
//                   isSubmitting={isCreating}
//                 />
//               ))}
//             </div>
//             <Button
//               type="button"
//               onClick={() =>
//                 append({
//                   text: "",
//                   options: ["", "", "", ""],
//                   correctAnswer: "",
//                 })
//               }
//               className="w-full"
//               disabled={isCreating}
//             >
//               Add Question
//             </Button>
//             <Button type="submit" className="w-full" disabled={isCreating}>
//               {isCreating ? "Creating..." : "Create Quiz"}
//             </Button>
//           </form>
//         </Form>
//       )}
//       <div className="mt-8">
//         <h3 className="text-lg font-semibold">Quizzes</h3>
//         {!isCreating && (
//           <div className="text-sm mt-2">
//             {/* Display quizzes fetched from the database */}
//         <QuizList
//           items={quizzes}
//           onReorder={onReorder}
//           onEdit={(quizId) => {
//             const quiz = quizzes.find((q) => q.id === quizId);
//             if (quiz) {
//               setEditingQuiz(quiz);
//               setIsFormVisible(true);  // Make the form visible
//             }
//           }}
//         />
//         </div>
//          )}
//          {!isCreating && (
//            <p className="text-xs text-muted-foreground mt-4">
//              Drag and Drop to Reorder the Quizzes
//            </p>
//          )}
//       </div>
//     </div>
//   );
// };

// const QuestionForm = ({
//   questionIndex,
//   field,
//   remove,
//   fields,
//   form,
//   isSubmitting,
// }: {
//   questionIndex: number;
//   field: any;
//   remove: (index: number) => void;
//   fields: any[];
//   form: any;
//   isSubmitting: boolean;
// }) => (
//   <div className="space-y-4 border p-4 rounded-md">
//     <div className="flex justify-between items-center">
//       <h3 className="text-lg font-semibold">Question {questionIndex + 1}</h3>
//       {fields.length > 1 && (
//         <Button
//           type="button"
//           variant="destructive"
//           onClick={() => remove(questionIndex)}
//           disabled={isSubmitting}
//         >
//           <Trash className="h-4 w-4" />
//         </Button>
//       )}
//     </div>
//     <FormField
//       control={form.control}
//       name={`questions.${questionIndex}.text`}
//       render={({ field }) => (
//         <FormItem>
//           <FormControl>
//             <Textarea
//               placeholder="Enter question text"
//               disabled={isSubmitting}
//               {...field}
//             />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//     {Array.from({ length: 4 }).map((_, optionIndex) => (
//       <FormField
//         key={optionIndex}
//         control={form.control}
//         name={`questions.${questionIndex}.options.${optionIndex}`}
//         render={({ field }) => (
//           <FormItem>
//             <FormControl>
//               <Input
//                 placeholder={`Option ${optionIndex + 1}`}
//                 disabled={isSubmitting}
//                 {...field}
//               />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     ))}
//     <FormField
//       control={form.control}
//       name={`questions.${questionIndex}.correctAnswer`}
//       render={({ field }) => (
//         <FormItem>
//           <FormControl>
//             <Input
//               placeholder="Correct Answer"
//               disabled={isSubmitting}
//               {...field}
//             />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   </div>
// );






// "use client";

// import React, { useState, useEffect } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Trash } from "lucide-react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { QuizList } from "./chapter-quiz-list";
// import { useRouter } from "next/navigation";

// const formSchema = z.object({
//   title: z.string().min(3, "Title must be at least 3 characters long"),
//   questions: z
//     .array(
//       z.object({
//         text: z.string().min(5, "Question must be at least 5 characters long"),
//         options: z
//           .array(z.string().min(1, "Option cannot be empty"))
//           .min(4, "At least 4 options are required"),
//         correctAnswer: z.string().min(1, "Correct answer is required"),
//       })
//     )
//     .min(1, "At least one question is required"),
// });

// type Quiz = {
//   id: string;
//   title: string;
//   courseId: string;
//   chapterId: string; // Ensure chapterId is a string and required
//   createdAt: Date;
//   updatedAt: Date;
//   _count: {
//     questions: number;
//   } | null;
// };

// export const ChapterQuizForm = ({
//   courseId,
//   chapterId,
// }: {
//   courseId: string;
//   chapterId: string; // Ensure chapterId is passed correctly and is required
// }) => {
//   const [isCreating, setIsCreating] = useState(false);
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//   const [editingQuiz, setEditingQuiz] = useState<any | null>(null); // State for editing quiz
//   const [isUpdating, setIsUpdating] = useState(false);

//   const router = useRouter();

//   // Fetch quizzes from the database
//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const response = await axios.get(
//           `/api/courses/${courseId}/chapterquizzes/fetch-chapterquiz-course`,
//           {
//             params: {
//               chapterId: chapterId, // Pass chapterId as a query parameter
//             },
//           }
//         );
//         setQuizzes(response.data);
//       } catch (error) {
//         toast.error("Failed to fetch quizzes.");
//       }
//     };

//     fetchQuizzes();
//   }, [courseId, chapterId]); // Fetch quizzes when courseId or chapterId changes

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       questions: [
//         {
//           text: "",
//           options: ["", "", "", ""],
//           correctAnswer: "",
//         },
//       ],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: "questions",
//   });

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       setIsCreating(true);
//       if (editingQuiz) {
//         // Update existing ChapterQuiz
//         await axios.put(
//           `/api/courses/${courseId}/chapterquizzes/${editingQuiz.id}/update`,
//           {
//             ...values,
//             courseId,
//             chapterId, // Pass chapterId directly to the API
//           }
//         );
//         toast.success("Chapter quiz updated successfully!");
//       } else {
//         // Create new ChapterQuiz
//         await axios.post(`/api/courses/${courseId}/chapterquizzes`, {
//           ...values,
//           courseId,
//           chapterId, // Pass chapterId directly to the API
//         });
//         toast.success("Chapter quiz created successfully!");
//       }
//       form.reset();
//       setIsFormVisible(false);
//       setEditingQuiz(null); // Reset editing state after success
//       // Refetch quizzes after creating/updating
//       const response = await axios.get(
//         `/api/courses/${courseId}/chapterquizzes/fetch-chapterquiz-course`,
//         {
//           params: {
//             chapterId: chapterId, // Pass chapterId as a query parameter
//           },
//         }
//       );
//       setQuizzes(response.data);
//     } catch (error) {
//       toast.error("Failed to save chapter quiz. Please try again.");
//     } finally {
//       setIsCreating(false);
//     }
//   };

//   const onReorder = async (updateData: { id: string; position: number }[]) => {
//     try {
//       setIsUpdating(true);

//       // Sending a PUT request to reorder chapter quizzes
//       await axios.put(`/api/courses/${courseId}/chapterquizzes/reorder`, {
//         list: updateData, // Data to update the order of quizzes
//       });
//       toast.success("Chapter quizzes reordered successfully!");
//       router.refresh(); // Refresh the page to reflect the changes
//     } catch {
//       toast.error("Something went wrong while reordering the chapter quizzes");
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   return (
//     <div className="space-y-8">
//       <Button
//         type="button"
//         onClick={() => setIsFormVisible(!isFormVisible)}
//         className="w-full"
//       >
//         {isFormVisible ? "Hide Quiz Form" : "Create a Quiz for the Chapter"}
//       </Button>

//       {isFormVisible && (
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input placeholder="Quiz Title" disabled={isCreating} {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <div className="space-y-6">
//               {fields.map((field, index) => (
//                 <QuestionForm
//                   key={field.id}
//                   questionIndex={index}
//                   field={field}
//                   remove={remove}
//                   fields={fields}
//                   form={form}
//                   isSubmitting={isCreating}
//                 />
//               ))}
//             </div>
//             <Button
//               type="button"
//               onClick={() =>
//                 append({
//                   text: "",
//                   options: ["", "", "", ""],
//                   correctAnswer: "",
//                 })
//               }
//               className="w-full"
//               disabled={isCreating}
//             >
//               Add Question
//             </Button>
//             <Button type="submit" className="w-full" disabled={isCreating}>
//               {isCreating ? "Creating..." : "Create Quiz"}
//             </Button>
//           </form>
//         </Form>
//       )}
//       <div className="mt-8">
//         <h3 className="text-lg font-semibold">Quizzes</h3>
//         {!isCreating && (
//           <div className="text-sm mt-2">
//             {/* Display quizzes fetched from the database */}
//             <QuizList
//               items={quizzes}
//               onReorder={onReorder}
//               onEdit={(quizId) => {
//                 const quiz = quizzes.find((q) => q.id === quizId);
//                 if (quiz) {
//                   setEditingQuiz(quiz);
//                   setIsFormVisible(true); // Make the form visible
//                 }
//               }}
//             />
//           </div>
//         )}
//         {!isCreating && (
//           <p className="text-xs text-muted-foreground mt-4">
//             Drag and Drop to Reorder the Quizzes
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// const QuestionForm = ({
//   questionIndex,
//   field,
//   remove,
//   fields,
//   form,
//   isSubmitting,
// }: {
//   questionIndex: number;
//   field: any;
//   remove: (index: number) => void;
//   fields: any[];
//   form: any;
//   isSubmitting: boolean;
// }) => (
//   <div className="space-y-4 border p-4 rounded-md">
//     <div className="flex justify-between items-center">
//       <h3 className="text-lg font-semibold">Question {questionIndex + 1}</h3>
//       {fields.length > 1 && (
//         <Button
//           type="button"
//           variant="destructive"
//           onClick={() => remove(questionIndex)}
//           disabled={isSubmitting}
//         >
//           <Trash className="h-4 w-4" />
//         </Button>
//       )}
//     </div>
//     <FormField
//       control={form.control}
//       name={`questions.${questionIndex}.text`}
//       render={({ field }) => (
//         <FormItem>
//           <FormControl>
//             <Textarea
//               placeholder="Enter question text"
//               disabled={isSubmitting}
//               {...field}
//             />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//     {Array.from({ length: 4 }).map((_, optionIndex) => (
//       <FormField
//         key={optionIndex}
//         control={form.control}
//         name={`questions.${questionIndex}.options.${optionIndex}`}
//         render={({ field }) => (
//           <FormItem>
//             <FormControl>
//               <Input
//                 placeholder={`Option ${optionIndex + 1}`}
//                 disabled={isSubmitting}
//                 {...field}
//               />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     ))}
//     <FormField
//       control={form.control}
//       name={`questions.${questionIndex}.correctAnswer`}
//       render={({ field }) => (
//         <FormItem>
//           <FormControl>
//             <Input
//               placeholder="Correct Answer"
//               disabled={isSubmitting}
//               {...field}
//             />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   </div>
// );






// "use client";

// import React, { useState, useEffect } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Trash } from "lucide-react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { QuizList } from "./chapter-quiz-list";
// import { useRouter } from "next/navigation";

// const formSchema = z.object({
//   title: z.string().min(3, "Title must be at least 3 characters long"),
//   questions: z
//     .array(
//       z.object({
//         text: z.string().min(5, "Question must be at least 5 characters long"),
//         options: z
//           .array(z.string().min(1, "Option cannot be empty"))
//           .min(4, "At least 4 options are required"),
//         correctAnswer: z.string().min(1, "Correct answer is required"),
//       })
//     )
//     .min(1, "At least one question is required"),
// });

// type Quiz = {
//   id: string;
//   title: string;
//   courseId: string;
//   chapterId: string;
//   createdAt: Date;
//   updatedAt: Date;
//   _count: {
//     questions: number;
//   } | null;
// };

// type QuizDetails = {
//   id: string;
//   title: string;
//   questions: {
//     id: string;
//     questionText: string;
//     options: { id: string; text: string }[];
//     correctAnswer: string;
//   }[];
// };

// export const ChapterQuizForm = ({
//   courseId,
//   chapterId,
// }: {
//   courseId: string;
//   chapterId: string;
// }) => {
//   const [isCreating, setIsCreating] = useState(false);
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//   const [editingQuiz, setEditingQuiz] = useState<QuizDetails | null>(null);
//   const [isUpdating, setIsUpdating] = useState(false);

//   const router = useRouter();

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       questions: [
//         {
//           text: "",
//           options: ["", "", "", ""],
//           correctAnswer: "",
//         },
//       ],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: "questions",
//   });

//   // Fetch quizzes from the database
//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const response = await axios.get(
//           `/api/courses/${courseId}/chapterquizzes/fetch-chapterquiz-course`,
//           {
//             params: {
//               chapterId: chapterId,
//             },
//           }
//         );
//         setQuizzes(response.data);
//       } catch (error) {
//         toast.error("Failed to fetch quizzes.");
//       }
//     };

//     fetchQuizzes();
//   }, [courseId, chapterId]);

//   // Populate form when editingQuiz changes
//   useEffect(() => {
//     if (editingQuiz) {
//       form.reset({
//         title: editingQuiz.title,
//         questions: editingQuiz.questions.map((q) => ({
//           text: q.questionText,
//           options: q.options.map((opt) => opt.text),
//           correctAnswer: q.correctAnswer,
//         })),
//       });
//       setIsFormVisible(true);
//     } else {
//       form.reset({
//         title: "",
//         questions: [
//           {
//             text: "",
//             options: ["", "", "", ""],
//             correctAnswer: "",
//           },
//         ],
//       });
//     }
//   }, [editingQuiz, form]);

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       setIsCreating(true);
//       if (editingQuiz) {
//         // Update existing ChapterQuiz
//         await axios.put(
//           `/api/courses/${courseId}/chapterquizzes/${editingQuiz.id}/update`,
//           {
//             ...values,
//             courseId,
//             chapterId,
//           }
//         );
//         toast.success("Chapter quiz updated successfully!");
//       } else {
//         // Create new ChapterQuiz
//         await axios.post(`/api/courses/${courseId}/chapterquizzes`, {
//           ...values,
//           courseId,
//           chapterId,
//         });
//         toast.success("Chapter quiz created successfully!");
//       }
//       form.reset();
//       setIsFormVisible(false);
//       setEditingQuiz(null);
//       // Refetch quizzes after creating/updating
//       const response = await axios.get(
//         `/api/courses/${courseId}/chapterquizzes/fetch-chapterquiz-course`,
//         {
//           params: {
//             chapterId: chapterId,
//           },
//         }
//       );
//       setQuizzes(response.data);
//     } catch (error) {
//       toast.error("Failed to save chapter quiz. Please try again.");
//     } finally {
//       setIsCreating(false);
//     }
//   };

//   const onReorder = async (updateData: { id: string; position: number }[]) => {
//     try {
//       setIsUpdating(true);
//       await axios.put(`/api/courses/${courseId}/chapterquizzes/reorder`, {
//         list: updateData,
//       });
//       toast.success("Chapter quizzes reordered successfully!");
//       router.refresh();
//     } catch {
//       toast.error("Something went wrong while reordering the chapter quizzes");
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   const onEdit = async (quizId: string) => {
//     try {
//       // Fetch full quiz details including questions
//       const response = await axios.get(
//         `/api/courses/${courseId}/chapterquizzes/${quizId}`
//       );
//       const quizData = response.data;
//       setEditingQuiz({
//         id: quizData.id,
//         title: quizData.title,
//         questions: quizData.questions.map((q: any) => ({
//           id: q.id,
//           questionText: q.questionText,
//           options: q.options.map((opt: any) => ({
//             id: opt.id,
//             text: opt.text,
//           })),
//           correctAnswer: q.correctAnswer,
//         })),
//       });
//     } catch (error) {
//       toast.error("Failed to load quiz details.");
//     }
//   };

//   return (
//     <div className="space-y-8">
//       <Button
//         type="button"
//         onClick={() => {
//           setIsFormVisible(!isFormVisible);
//           if (isFormVisible) {
//             setEditingQuiz(null); // Clear editing state when hiding form
//             form.reset(); // Reset form to default values
//           }
//         }}
//         className="w-full"
//       >
//         {isFormVisible ? "Hide Quiz Form" : editingQuiz ? "Edit Quiz" : "Create a Quiz for the Chapter"}
//       </Button>

//       {isFormVisible && (
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input placeholder="Quiz Title" disabled={isCreating} {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <div className="space-y-6">
//               {fields.map((field, index) => (
//                 <QuestionForm
//                   key={field.id}
//                   questionIndex={index}
//                   field={field}
//                   remove={remove}
//                   fields={fields}
//                   form={form}
//                   isSubmitting={isCreating}
//                 />
//               ))}
//             </div>
//             <Button
//               type="button"
//               onClick={() =>
//                 append({
//                   text: "",
//                   options: ["", "", "", ""],
//                   correctAnswer: "",
//                 })
//               }
//               className="w-full"
//               disabled={isCreating}
//             >
//               Add Question
//             </Button>
//             <Button type="submit" className="w-full" disabled={isCreating}>
//               {isCreating ? (editingQuiz ? "Updating..." : "Creating...") : editingQuiz ? "Update Quiz" : "Create Quiz"}
//             </Button>
//           </form>
//         </Form>
//       )}
//       <div className="mt-8">
//         <h3 className="text-lg font-semibold">Quizzes</h3>
//         {!isCreating && (
//           <div className="text-sm mt-2">
//             <QuizList
//               items={quizzes}
//               onReorder={onReorder}
//               onEdit={onEdit}
//             />
//           </div>
//         )}
//         {!isCreating && (
//           <p className="text-xs text-muted-foreground mt-4">
//             Drag and Drop to Reorder the Quizzes
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// const QuestionForm = ({
//   questionIndex,
//   field,
//   remove,
//   fields,
//   form,
//   isSubmitting,
// }: {
//   questionIndex: number;
//   field: any;
//   remove: (index: number) => void;
//   fields: any[];
//   form: any;
//   isSubmitting: boolean;
// }) => (
//   <div className="space-y-4 border p-4 rounded-md">
//     <div className="flex justify-between items-center">
//       <h3 className="text-lg font-semibold">Question {questionIndex + 1}</h3>
//       {fields.length > 1 && (
//         <Button
//           type="button"
//           variant="destructive"
//           onClick={() => remove(questionIndex)}
//           disabled={isSubmitting}
//         >
//           <Trash className="h-4 w-4" />
//         </Button>
//       )}
//     </div>
//     <FormField
//       control={form.control}
//       name={`questions.${questionIndex}.text`}
//       render={({ field }) => (
//         <FormItem>
//           <FormControl>
//             <Textarea
//               placeholder="Enter question text"
//               disabled={isSubmitting}
//               {...field}
//             />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//     {Array.from({ length: 4 }).map((_, optionIndex) => (
//       <FormField
//         key={optionIndex}
//         control={form.control}
//         name={`questions.${questionIndex}.options.${optionIndex}`}
//         render={({ field }) => (
//           <FormItem>
//             <FormControl>
//               <Input
//                 placeholder={`Option ${optionIndex + 1}`}
//                 disabled={isSubmitting}
//                 {...field}
//               />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     ))}
//     <FormField
//       control={form.control}
//       name={`questions.${questionIndex}.correctAnswer`}
//       render={({ field }) => (
//         <FormItem>
//           <FormControl>
//             <Input
//               placeholder="Correct Answer"
//               disabled={isSubmitting}
//               {...field}
//             />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   </div>
// );






// "use client";

// import React, { useState, useEffect } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Trash } from "lucide-react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { QuizList } from "./chapter-quiz-list";
// import { useRouter } from "next/navigation";

// const formSchema = z.object({
//   title: z.string().min(3, "Title must be at least 3 characters long"),
//   questions: z
//     .array(
//       z.object({
//         text: z.string().min(5, "Question must be at least 5 characters long"),
//         options: z
//           .array(z.string().min(1, "Option cannot be empty"))
//           .min(4, "At least 4 options are required"),
//         correctAnswer: z.string().min(1, "Correct answer is required"),
//       })
//     )
//     .min(1, "At least one question is required"),
// });

// type Quiz = {
//   id: string;
//   title: string;
//   courseId: string;
//   chapterId: string;
//   createdAt: Date;
//   updatedAt: Date;
//   _count: {
//     questions: number;
//   } | null;
// };

// type QuizDetails = {
//   id: string;
//   title: string;
//   questions: {
//     id: string;
//     questionText: string;
//     options: { id: string; text: string }[];
//     correctAnswer: string;
//   }[];
// };

// export const ChapterQuizForm = ({
//   courseId,
//   chapterId,
// }: {
//   courseId: string;
//   chapterId: string;
// }) => {
//   const [isCreating, setIsCreating] = useState(false);
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//   const [editingQuiz, setEditingQuiz] = useState<QuizDetails | null>(null);
//   const [isUpdating, setIsUpdating] = useState(false);

//   const router = useRouter();

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       questions: [
//         {
//           text: "",
//           options: ["", "", "", ""],
//           correctAnswer: "",
//         },
//       ],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: "questions",
//   });

//   // Fetch quizzes from the database
//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const response = await axios.get(
//           `/api/courses/${courseId}/chapterquizzes/fetch-chapterquiz-course`,
//           {
//             params: {
//               chapterId: chapterId,
//             },
//           }
//         );
//         console.log("Fetched quizzes:", response.data); // Debug log
//         setQuizzes(response.data);
//       } catch (error: any) {
//         console.error("Error fetching quizzes:", error.response?.data || error.message);
//         toast.error("Failed to fetch quizzes.");
//       }
//     };

//     fetchQuizzes();
//   }, [courseId, chapterId]);

//   // Populate form when editingQuiz changes
//   useEffect(() => {
//     if (editingQuiz) {
//       console.log("Populating form with editingQuiz:", editingQuiz); // Debug log
//       form.reset({
//         title: editingQuiz.title,
//         questions: editingQuiz.questions.map((q) => ({
//           text: q.questionText,
//           options: q.options.map((opt) => opt.text),
//           correctAnswer: q.correctAnswer,
//         })),
//       });
//       setIsFormVisible(true);
//     } else {
//       form.reset({
//         title: "",
//         questions: [
//           {
//             text: "",
//             options: ["", "", "", ""],
//             correctAnswer: "",
//           },
//         ],
//       });
//     }
//   }, [editingQuiz, form]);

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       setIsCreating(true);
//       if (editingQuiz) {
//         console.log("Updating quiz with ID:", editingQuiz.id); // Debug log
//         console.log("Payload:", {
//           title: values.title,
//           questions: values.questions,
//           courseId,
//           chapterId,
//         }); // Debug log
//         const response = await axios.put(
//           `/api/courses/${courseId}/chapterquizzes/${editingQuiz.id}/update`,
//           {
//             title: values.title,
//             questions: values.questions,
//             courseId,
//             chapterId,
//           }
//         );
//         console.log("Update response:", response.data); // Debug log
//         toast.success("Chapter quiz updated successfully!");
//       } else {
//         console.log("Creating new quiz with payload:", {
//           title: values.title,
//           questions: values.questions,
//           courseId,
//           chapterId,
//         }); // Debug log
//         await axios.post(`/api/courses/${courseId}/chapterquizzes`, {
//           title: values.title,
//           questions: values.questions,
//           courseId,
//           chapterId,
//         });
//         toast.success("Chapter quiz created successfully!");
//       }
//       form.reset();
//       setIsFormVisible(false);
//       setEditingQuiz(null);
//       // Refetch quizzes after creating/updating
//       const response = await axios.get(
//         `/api/courses/${courseId}/chapterquizzes/fetch-chapterquiz-course`,
//         {
//           params: {
//             chapterId: chapterId,
//           },
//         }
//       );
//       console.log("Refetched quizzes:", response.data); // Debug log
//       setQuizzes(response.data);
//     } catch (error: any) {
//       console.error("Error in onSubmit:", error.response?.data || error.message);
//       toast.error("Failed to save chapter quiz. Please try again.");
//     } finally {
//       setIsCreating(false);
//     }
//   };

//   const onReorder = async (updateData: { id: string; position: number }[]) => {
//     try {
//       setIsUpdating(true);
//       await axios.put(`/api/courses/${courseId}/chapterquizzes/reorder`, {
//         list: updateData,
//       });
//       toast.success("Chapter quizzes reordered successfully!");
//       router.refresh();
//     } catch (error: any) {
//       console.error("Error reordering quizzes:", error.response?.data || error.message);
//       toast.error("Something went wrong while reordering the chapter quizzes");
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   const onEdit = async (quizId: string) => {
//     try {
//       console.log("Fetching quiz with ID:", quizId); // Debug log
//       const response = await axios.get(
//         `/api/courses/${courseId}/chapterquizzes/${quizId}`
//       );
//       const quizData = response.data;
//       console.log("Fetched quiz data:", quizData); // Debug log
//       setEditingQuiz({
//         id: quizData.id,
//         title: quizData.title,
//         questions: quizData.questions.map((q: any) => ({
//           id: q.id,
//           questionText: q.questionText,
//           options: q.options.map((opt: any) => ({
//             id: opt.id,
//             text: opt.text,
//           })),
//           correctAnswer: q.correctAnswer,
//         })),
//       });
//     } catch (error: any) {
//       console.error("Error fetching quiz details:", error.response?.data || error.message);
//       toast.error("Failed to load quiz details.");
//     }
//   };

//   return (
//     <div className="space-y-8">
//       <Button
//         type="button"
//         onClick={() => {
//           setIsFormVisible(!isFormVisible);
//           if (isFormVisible) {
//             setEditingQuiz(null); // Clear editing state when hiding form
//             form.reset(); // Reset form to default values
//           }
//         }}
//         className="w-full"
//       >
//         {isFormVisible
//           ? "Hide Quiz Form"
//           : editingQuiz
//           ? "Edit Quiz"
//           : "Create a Quiz for the Chapter"}
//       </Button>

//       {isFormVisible && (
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input
//                       placeholder="Quiz Title"
//                       disabled={isCreating}
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <div className="space-y-6">
//               {fields.map((field, index) => (
//                 <QuestionForm
//                   key={field.id}
//                   questionIndex={index}
//                   field={field}
//                   remove={remove}
//                   fields={fields}
//                   form={form}
//                   isSubmitting={isCreating}
//                 />
//               ))}
//             </div>
//             <Button
//               type="button"
//               onClick={() =>
//                 append({
//                   text: "",
//                   options: ["", "", "", ""],
//                   correctAnswer: "",
//                 })
//               }
//               className="w-full"
//               disabled={isCreating}
//             >
//               Add Question
//             </Button>
//             <Button type="submit" className="w-full" disabled={isCreating}>
//               {isCreating
//                 ? editingQuiz
//                   ? "Updating..."
//                   : "Creating..."
//                 : editingQuiz
//                 ? "Update Quiz"
//                 : "Create Quiz"}
//             </Button>
//           </form>
//         </Form>
//       )}
//       <div className="mt-8">
//         <h3 className="text-lg font-semibold">Quizzes</h3>
//         {!isCreating && (
//           <div className="text-sm mt-2">
//             <QuizList items={quizzes} onReorder={onReorder} onEdit={onEdit} />
//           </div>
//         )}
//         {!isCreating && (
//           <p className="text-xs text-muted-foreground mt-4">
//             Drag and Drop to Reorder the Quizzes
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// const QuestionForm = ({
//   questionIndex,
//   field,
//   remove,
//   fields,
//   form,
//   isSubmitting,
// }: {
//   questionIndex: number;
//   field: any;
//   remove: (index: number) => void;
//   fields: any[];
//   form: any;
//   isSubmitting: boolean;
// }) => (
//   <div className="space-y-4 border p-4 rounded-md">
//     <div className="flex justify-between items-center">
//       <h3 className="text-lg font-semibold">Question {questionIndex + 1}</h3>
//       {fields.length > 1 && (
//         <Button
//           type="button"
//           variant="destructive"
//           onClick={() => remove(questionIndex)}
//           disabled={isSubmitting}
//         >
//           <Trash className="h-4 w-4" />
//         </Button>
//       )}
//     </div>
//     <FormField
//       control={form.control}
//       name={`questions.${questionIndex}.text`}
//       render={({ field }) => (
//         <FormItem>
//           <FormControl>
//             <Textarea
//               placeholder="Enter question text"
//               disabled={isSubmitting}
//               {...field}
//             />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//     {Array.from({ length: 4 }).map((_, optionIndex) => (
//       <FormField
//         key={optionIndex}
//         control={form.control}
//         name={`questions.${questionIndex}.options.${optionIndex}`}
//         render={({ field }) => (
//           <FormItem>
//             <FormControl>
//               <Input
//                 placeholder={`Option ${optionIndex + 1}`}
//                 disabled={isSubmitting}
//                 {...field}
//               />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     ))}
//     <FormField
//       control={form.control}
//       name={`questions.${questionIndex}.correctAnswer`}
//       render={({ field }) => (
//         <FormItem>
//           <FormControl>
//             <Input
//               placeholder="Correct Answer"
//               disabled={isSubmitting}
//               {...field}
//             />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   </div>
// );



"use client";

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Trash } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { QuizList } from "./chapter-quiz-list";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  questions: z
    .array(
      z.object({
        text: z.string().min(5, "Question must be at least 5 characters long"),
        options: z
          .array(z.string().min(1, "Option cannot be empty"))
          .min(4, "At least 4 options are required"),
        correctAnswer: z.string().min(1, "Correct answer is required"),
      })
    )
    .min(1, "At least one question is required"),
});

type Quiz = {
  id: string;
  title: string;
  courseId: string;
  chapterId: string; // Ensure chapterId is a string and required
  createdAt: Date;
  updatedAt: Date;
  _count: {
    questions: number;
  } | null;
};

export const ChapterQuizForm = ({
  courseId,
  chapterId,
}: {
  courseId: string;
  chapterId: string; // Ensure chapterId is passed correctly and is required
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [editingQuiz, setEditingQuiz] = useState<any | null>(null); // State for editing quiz
  const [isUpdating, setIsUpdating] = useState(false);

  const router = useRouter();

  // Fetch quizzes from the database
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(
          `/api/courses/${courseId}/chapterquizzes/fetch-chapterquiz-course`,
          {
            params: {
              chapterId: chapterId, // Pass chapterId as a query parameter
            },
          }
        );
        setQuizzes(response.data);
      } catch (error) {
        toast.error("Failed to fetch quizzes.");
      }
    };

    fetchQuizzes();
  }, [courseId, chapterId]); // Fetch quizzes when courseId or chapterId changes

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      questions: [
        {
          text: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsCreating(true);
      if (editingQuiz) {
        // Update existing ChapterQuiz
        await axios.put(
          `/api/courses/${courseId}/chapterquizzes/${editingQuiz.id}/update`,
          {
            ...values,
            courseId,
            chapterId, // Pass chapterId directly to the API
          }
        );
        toast.success("Chapter quiz updated successfully!");
      } else {
        // Create new ChapterQuiz
        await axios.post(`/api/courses/${courseId}/chapterquizzes`, {
          ...values,
          courseId,
          chapterId, // Pass chapterId directly to the API
        });
        toast.success("Chapter quiz created successfully!");
      }
      form.reset();
      setIsFormVisible(false);
      setEditingQuiz(null); // Reset editing state after success
      // Refetch quizzes after creating/updating
      const response = await axios.get(
        `/api/courses/${courseId}/chapterquizzes/fetch-chapterquiz-course`,
        {
          params: {
            chapterId: chapterId, // Pass chapterId as a query parameter
          },
        }
      );
      setQuizzes(response.data);
    } catch (error) {
      toast.error("Failed to save chapter quiz. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);

      // Sending a PUT request to reorder chapter quizzes
      await axios.put(`/api/courses/${courseId}/chapterquizzes/reorder`, {
        list: updateData, // Data to update the order of quizzes
      });
      toast.success("Chapter quizzes reordered successfully!");
      router.refresh(); // Refresh the page to reflect the changes
    } catch {
      toast.error("Something went wrong while reordering the chapter quizzes");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-8">
      <Button
        type="button"
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="w-full"
      >
        {isFormVisible ? "Hide Quiz Form" : "Create a Quiz for the Chapter"}
      </Button>

      {isFormVisible && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Quiz Title" disabled={isCreating} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-6">
              {fields.map((field, index) => (
                <QuestionForm
                  key={field.id}
                  questionIndex={index}
                  field={field}
                  remove={remove}
                  fields={fields}
                  form={form}
                  isSubmitting={isCreating}
                />
              ))}
            </div>
            <Button
              type="button"
              onClick={() =>
                append({
                  text: "",
                  options: ["", "", "", ""],
                  correctAnswer: "",
                })
              }
              className="w-full"
              disabled={isCreating}
            >
              Add Question
            </Button>
            <Button type="submit" className="w-full" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Quiz"}
            </Button>
          </form>
        </Form>
      )}
      <div className="mt-8">
        <h3 className="text-lg font-semibold">Quizzes</h3>
        {!isCreating && (
          <div className="text-sm mt-2">
            {/* Display quizzes fetched from the database */}
            <QuizList
              items={quizzes}
              onReorder={onReorder}
              onEdit={(quizId) => {
                const quiz = quizzes.find((q) => q.id === quizId);
                if (quiz) {
                  setEditingQuiz(quiz);
                  setIsFormVisible(true); // Make the form visible
                }
              }}
            />
          </div>
        )}
        {!isCreating && (
          <p className="text-xs text-muted-foreground mt-4">
            Drag and Drop to Reorder the Quizzes
          </p>
        )}
      </div>
    </div>
  );
};

const QuestionForm = ({
  questionIndex,
  field,
  remove,
  fields,
  form,
  isSubmitting,
}: {
  questionIndex: number;
  field: any;
  remove: (index: number) => void;
  fields: any[];
  form: any;
  isSubmitting: boolean;
}) => (
  <div className="space-y-4 border p-4 rounded-md">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold">Question {questionIndex + 1}</h3>
      {fields.length > 1 && (
        <Button
          type="button"
          variant="destructive"
          onClick={() => remove(questionIndex)}
          disabled={isSubmitting}
        >
          <Trash className="h-4 w-4" />
        </Button>
      )}
    </div>
    <FormField
      control={form.control}
      name={`questions.${questionIndex}.text`}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Textarea
              placeholder="Enter question text"
              disabled={isSubmitting}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    {Array.from({ length: 4 }).map((_, optionIndex) => (
      <FormField
        key={optionIndex}
        control={form.control}
        name={`questions.${questionIndex}.options.${optionIndex}`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder={`Option ${optionIndex + 1}`}
                disabled={isSubmitting}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ))}
    <FormField
      control={form.control}
      name={`questions.${questionIndex}.correctAnswer`}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              placeholder="Correct Answer"
              disabled={isSubmitting}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);
