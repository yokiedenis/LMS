"use client";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ChaptersListProps {
  items: (Chapter & { quizzes?: { id: string; title: string }[] })[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export const ChaptersList = ({
  items,
  onReorder,
  onEdit,
}: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updatedChapters = Array.from(chapters);
    const [reorderedItem] = updatedChapters.splice(result.source.index, 1);
    updatedChapters.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const affectedChapters = updatedChapters.slice(startIndex, endIndex + 1);

    setChapters(updatedChapters);

    const bulkUpdateData = affectedChapters.map((chapter) => ({
      id: chapter.id,
      position: updatedChapters.findIndex((item) => item.id === chapter.id),
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className={`flex flex-col gap-2 bg-gray-200 border-gray-200 border text-gray-700 rounded-md mb-4 text-sm
                      ${chapter.isPublished && "bg-blue-100 border-blue-200 text-blue-700"}
                      dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300
                      dark:${chapter.isPublished && "bg-blue-800 border-blue-600 text-blue-300"}
                    `}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={`flex items-center gap-x-2 px-2 py-3 border-b border-b-gray-200 hover:bg-gray-300 rounded-t-md transition
                        ${chapter.isPublished && "border-b-blue-200 hover:bg-blue-200"}
                        dark:border-b-slate-800 dark:hover:bg-slate-700
                        dark:${chapter.isPublished && "border-b-blue-600 hover:bg-blue-800"}
                      `}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                      {chapter.title}
                      <div className="ml-auto pr-2 flex items-center gap-x-2">
                        {chapter.isFree && <Badge>Free</Badge>}
                        <Badge
                          className={`bg-gray-500
                          ${chapter.isPublished && "bg-sky-700"}
                          dark:bg-slate-500
                          dark:${chapter.isPublished && "bg-sky-700"}
                          `}
                        >
                          {chapter.isPublished ? "Published" : "Draft"}
                        </Badge>
                        <Pencil
                          onClick={() => onEdit(chapter.id)}
                          className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                        />
                      </div>
                    </div>

                    {/* Render quizzes if they exist */}
                    {chapter.quizzes && chapter.quizzes.length > 0 && (
                      <div className="ml-8 flex flex-col gap-2">
                        {chapter.quizzes.map((quiz) => (
                          <div
                            key={quiz.id}
                            className="flex items-center gap-x-2 bg-gray-100 text-gray-600 rounded-md px-4 py-2 text-sm border-l-4 border-gray-300"
                          >
                            {quiz.title}
                          </div>
                        ))}
                      </div>
                    )}
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
