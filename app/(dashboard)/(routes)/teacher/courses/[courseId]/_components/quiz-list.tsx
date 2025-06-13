"use client";

import { useState, useEffect } from "react"; // Import React hooks
import { Quiz } from "@prisma/client";
import { useRouter } from "next/navigation";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface QuizListProps {
  items: (Quiz & { _count: { questions: number } | null; chapterId: string | null })[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export const QuizList: React.FC<QuizListProps> = ({ items, onReorder, onEdit }) => {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState(items);

  useEffect(() => {
    setQuizzes(items);
  }, [items]);

  // Handle drag-and-drop reordering
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updatedQuizzes = [...quizzes];
    const [movedQuiz] = updatedQuizzes.splice(result.source.index, 1);
    updatedQuizzes.splice(result.destination.index, 0, movedQuiz);

    setQuizzes(updatedQuizzes);

    // Generate update payload
    const updatePayload = updatedQuizzes.map((quiz, index) => ({
      id: quiz.id,
      position: index + 1,
    }));
    onReorder(updatePayload);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="quiz-list">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-4"
          >
            {quizzes.map((quiz, index) => (
              <Draggable key={quiz.id} draggableId={quiz.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={cn(
                      "flex items-center justify-between p-4 bg-muted rounded-md shadow-sm",
                      snapshot.isDragging && "bg-accent"
                    )}
                  >
                    <div className="flex items-center space-x-4">
                      <Grip className="w-4 h-4 text-gray-500 cursor-grab" />
                      <div>
                        <h4 className="text-sm font-semibold">{quiz.title}</h4>
                        {quiz._count?.questions && (
                          <p className="text-xs text-gray-500">
                            {quiz._count.questions} Question(s)
                          </p>
                        )}
                        <div className="space-x-2 mt-2">
                          <Badge variant="outline">
                            {quiz.chapterId ? "Assigned" : "Unassigned"}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-600"
                          >
                            Published
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onEdit(quiz.id)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
