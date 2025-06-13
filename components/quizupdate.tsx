"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useRouter } from 'next/router';

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  questionText: string;
  options: Option[];
  correctAnswer: string;
}

type FormData = {
  title: string;
  questions: Question[];
};

const QuizUpdate = ({ courseId, quizId }: { courseId: string; quizId: string }) => {
  const { control, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      title: "",
      questions: [
        {
          id: crypto.randomUUID(),
          questionText: "",
          options: [{ id: crypto.randomUUID(), text: "" }],
          correctAnswer: "",
        },
      ],
    },
  });

  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuizData = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}/quizzes/${quizId}/update`);
      if (!response.ok) throw new Error("Failed to fetch quiz data");

      const data = await response.json();
      setValue("title", data.title);
      setValue("questions", data.questions);
      setIsLoading(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, [quizId, courseId]);

  const handleUpdate = async (data: FormData) => {
    setIsCreating(true);
    try {
      const response = await fetch(`/api/courses/${courseId}/quizzes/${quizId}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Quiz updated successfully!");
      } else {
        toast.error("Failed to update quiz.");
      }
    } catch {
      toast.error("An error occurred.");
    } finally {
      setIsCreating(false);
    }
  };

  const addOption = (questionIndex: number) => {
    const currentQuestions = watch("questions");
    const updatedQuestions = currentQuestions.map((question, index) => {
      if (index === questionIndex) {
        return {
          ...question,
          options: [...question.options, { id: crypto.randomUUID(), text: "" }],
        };
      }
      return question;
    });
    setValue("questions", updatedQuestions);
  };

  const addQuestion = () => {
    const currentQuestions = watch("questions");
    setValue("questions", [
      ...currentQuestions,
      {
        id: crypto.randomUUID(),
        questionText: "",
        options: [{ id: crypto.randomUUID(), text: "" }],
        correctAnswer: "",
      },
    ]);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-gray-800">
      <motion.div
        className="bg-white shadow-xl p-8 rounded-lg max-w-2xl w-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Quiz</h2>

        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
          <FormField
            control={control}
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
            {watch("questions").map((question, index) => (
              <motion.div key={question.id} className="mb-6">
                <h3 className="font-semibold text-gray-700">Question {index + 1}</h3>

                <FormField
                  control={control}
                  name={`questions.${index}.questionText`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Question text" disabled={isCreating} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {question.options.map((option, idx) => (
                  <div key={option.id} className="flex items-center gap-2 mb-2">
                    <FormField
                      control={control}
                      name={`questions.${index}.options.${idx}.text`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder={`Option ${idx + 1}`} disabled={isCreating} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}

                <FormField
                  control={control}
                  name={`questions.${index}.correctAnswer`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          id={`correct-answer-${index}`}
                          {...field}
                          options={question.options.map((opt) => ({ value: opt.id, label: opt.text }))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="button" onClick={() => addOption(index)} disabled={isCreating}>
                  Add Option
                </Button>
              </motion.div>
            ))}
          </div>

          <Button type="button" onClick={addQuestion} className="w-full" disabled={isCreating}>
            Add Question
          </Button>

          <Button type="submit" className="w-full" disabled={isCreating}>
            {isCreating ? "Saving..." : "Update Quiz"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default QuizUpdate;
