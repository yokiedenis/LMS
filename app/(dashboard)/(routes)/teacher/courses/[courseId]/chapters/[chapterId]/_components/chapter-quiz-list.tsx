import { useState, useEffect } from "react"; 
import { ChapterQuiz } from "@prisma/client"; 
import { useRouter } from "next/navigation";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface QuizListProps {
  items: (ChapterQuiz & { _count: { questions: number } | null; chapterId: string | null })[] | null | undefined;
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (quizId: string) => void;
}

export const QuizList = ({ items, onReorder, onEdit }: QuizListProps) => {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (draggingId) {
      setDraggingId(draggingId);
    }
  }, [draggingId]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.index !== destination.index) {
      const updatedItems = Array.isArray(items) ? Array.from(items) : [];
      const [removed] = updatedItems.splice(source.index, 1);
      updatedItems.splice(destination.index, 0, removed);

      onReorder(
        updatedItems.map((item, index) => ({
          id: item.id,
          position: index,
        }))
      );
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="quizzes" type="quiz">
        {(provided) => (
          <div
            className="space-y-4"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {Array.isArray(items) &&
              items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      className={cn("border p-4 rounded-md", {
                        "border-gray-300": draggingId === item.id,
                      })}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <Grip className="h-4 w-4 text-gray-500" />
                          <h4 className="font-medium">{item.title}</h4>
                          <Badge>{item._count?.questions ?? 0} Questions</Badge>
                        </div>
                        <Button
                          variant="link"
                          onClick={() => onEdit(item.id)}
                          className="text-sm text-primary-500"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
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
