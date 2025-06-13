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
import { QuizList } from "./quiz-list"; // Import the QuizList component
import { useRouter } from "next/navigation";

// Validation schema
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

export const TeacherQuizForm = ({ courseId }: { courseId: string }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [quizzes, setQuizzes] = useState<any[]>([]); // State to store quizzes
  const [editingQuiz, setEditingQuiz] = useState<any | null>(null); // State for editing quiz
  const [isUpdating, setIsUpdating] = useState(false);

  const router = useRouter();

  // Fetch quizzes from the database
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}/quizzes/fetch-quiz-course`);
        setQuizzes(response.data);
      } catch (error) {
        toast.error("Failed to fetch quizzes.");
      }
    };

    fetchQuizzes();
  }, [courseId]); // Fetch quizzes when courseId changes

  // Initialize form with editingQuiz or default empty values
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: editingQuiz
      ? { title: editingQuiz.title, questions: editingQuiz.questions }
      : { title: "", questions: [{ text: "", options: ["", "", "", ""], correctAnswer: "" }] },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsCreating(true);
      if (editingQuiz) {
        // Update quiz
        await axios.put(`/api/courses/${courseId}/quizzes/${editingQuiz.id}/update`, { ...values, courseId });
        toast.success('Quiz updated successfully!');
      } else {
        // Create quiz
        await axios.post(`/api/courses/${courseId}/quizzes`, { ...values, courseId });
        toast.success("Quiz created successfully!");
      }
      form.reset();
      setIsFormVisible(false);
      setEditingQuiz(null);
      // Refetch quizzes after creating/updating a quiz
      const response = await axios.get(`/api/courses/${courseId}/quizzes/fetch-quiz-course`);
      setQuizzes(response.data);
    } catch (error) {
      toast.error("Failed to save quiz. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);

      await axios.put(`/api/courses/${courseId}/quizzes/reorder`, {
        list: updateData,
      });
      toast.success("Quizzes reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Toggle Button */}
      <Button
        type="button"
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="w-full"
      >
        {isFormVisible ? (editingQuiz ? "Edit Quiz" : "Hide Quiz Form") : "Create a Quiz for a Course"}
      </Button>

      {isFormVisible && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Quiz Title */}
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

            {/* Dynamic Questions */}
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

            {/* Add Question Button */}
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

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isCreating}>
              {isCreating ? "Saving..." : editingQuiz ? "Update Quiz" : "Create Quiz"}
            </Button>
          </form>
        </Form>
      )}

      {/* Quiz List */}
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
                  setIsFormVisible(true);  // Make the form visible
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
  <div className="relative border p-4 rounded-md space-y-4">
    <div className="flex justify-between items-center">
      <h3 className="font-semibold">Question {questionIndex + 1}</h3>
      {fields.length > 1 && (
        <Button
          type="button"
          variant="destructive"
          onClick={() => remove(questionIndex)}
          className="text-red-600"
        >
          <Trash className="w-4 h-4" />
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
              disabled={isSubmitting}
              placeholder="Enter the quiz question"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Options */}
    <div className="space-y-2">
      {form.watch(`questions.${questionIndex}.options`).map((_: string, optionIndex: number) => (
        <FormField
          key={optionIndex}
          control={form.control}
          name={`questions.${questionIndex}.options.${optionIndex}`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder={`Option ${optionIndex + 1}`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>

    {/* Correct Answer */}
    <FormField
      control={form.control}
      name={`questions.${questionIndex}.correctAnswer`}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              disabled={isSubmitting}
              placeholder="Enter the correct answer"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);
