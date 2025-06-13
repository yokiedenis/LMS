// "use client";

// import axios from "axios";
// import { CheckCircle, XCircle } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import toast from "react-hot-toast";

// import { Button } from "@/components/ui/button";
// import { useConfettiStore } from "@/hooks/use-confetti-store";

// interface CourseProgressButtonProps {
//   chapterId: string;
//   courseId: string;
//   isCompleted?: boolean;
//   nextChapterId?: string;
// };

// export const CourseProgressButton = ({
//   chapterId,
//   courseId,
//   isCompleted,
//   nextChapterId
// }: CourseProgressButtonProps) => {
//   const router = useRouter();
//   const confetti = useConfettiStore();
//   const [isLoading, setIsLoading] = useState(false);

//   const onClick = async () => {
//     try {
//       setIsLoading(true);

//       await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
//         isCompleted: !isCompleted
//       });

//       if (!isCompleted && !nextChapterId) {
//         confetti.onOpen();
//       }

//       if (!isCompleted && nextChapterId) {
//         router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
//       }

//       toast.success("Progress updated");
//       router.refresh();
//     } catch {
//       toast.error("Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   const Icon = isCompleted ? XCircle : CheckCircle

//   return (
//     <Button
//       onClick={onClick}
//       disabled={isLoading}
//       type="button"
//       variant={isCompleted ? "outline" : "success"}
//       className="w-full md:w-auto"
//     >
//       {isCompleted ? "Not completed" : "Mark as complete"}
//       <Icon className="h-4 w-4 ml-2" />
//     </Button>
//   )
// }



// "use client";

// import axios from "axios";
// import { CheckCircle, XCircle } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import toast from "react-hot-toast";

// import { Button } from "@/components/ui/button";
// import { useConfettiStore } from "@/hooks/use-confetti-store";

// interface CourseProgressButtonProps {
//   chapterId: string;
//   courseId: string;
//   isCompleted?: boolean;
//   nextChapterId?: string;
//   isQuizPassed?: boolean; // Added isQuizPassed to the interface
//   className?: string; // Added to fix TypeScript error

// }

// export const CourseProgressButton = ({
//   chapterId,
//   courseId,
//   isCompleted,
//   nextChapterId,
//   isQuizPassed, // Destructured the new prop
// }: CourseProgressButtonProps) => {
//   const router = useRouter();
//   const confetti = useConfettiStore();
//   const [isLoading, setIsLoading] = useState(false);

//   const onClick = async () => {
//     try {
//       setIsLoading(true);

//       // Optionally, you could add logic here to check isQuizPassed before allowing progress updates
//       // For now, keeping original logic as per your request
//       await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
//         isCompleted: !isCompleted,
//       });

//       if (!isCompleted && !nextChapterId) {
//         confetti.onOpen();
//       }

//       if (!isCompleted && nextChapterId) {
//         router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
//       }

//       toast.success("Progress updated");
//       router.refresh();
//     } catch {
//       toast.error("Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const Icon = isCompleted ? XCircle : CheckCircle;

//   return (
//     <Button
//       onClick={onClick}
//       disabled={isLoading}
//       type="button"
//       variant={isCompleted ? "outline" : "success"}
//       className="w-full md:w-auto"
//     >
//       {isCompleted ? "Not completed" : "Mark as complete"}
//       <Icon className="h-4 w-4 ml-2" />
//     </Button>
//   );
// };





// "use client";

// import axios from "axios";
// import { CheckCircle, XCircle } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import toast from "react-hot-toast";

// import { Button } from "@/components/ui/button";
// import { useConfettiStore } from "@/hooks/use-confetti-store";

// interface CourseProgressButtonProps {
//   chapterId: string;
//   courseId: string;
//   isCompleted?: boolean;
//   nextChapterId?: string;
//   isQuizPassed?: boolean;
//   className?: string;
// }

// export const CourseProgressButton = ({
//   chapterId,
//   courseId,
//   isCompleted,
//   nextChapterId,
//   isQuizPassed,
// }: CourseProgressButtonProps) => {
//   const router = useRouter();
//   const confetti = useConfettiStore();
//   const [isLoading, setIsLoading] = useState(false);

//   const onClick = async () => {
//     try {
//       setIsLoading(true);

//       // Prevent progress update if quiz is required but not passed
//       if (!isQuizPassed) {
//         toast.error("You must pass the quiz to mark this chapter as complete.");
//         return;
//       }

//       // Update progress
//       await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
//         isCompleted: !isCompleted,
//       });

//       if (!isCompleted && !nextChapterId) {
//         confetti.onOpen();
//       }

//       if (!isCompleted && nextChapterId) {
//         router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
//       }

//       toast.success("Progress updated");
//       router.refresh();
//     } catch (error) {
//       toast.error("Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const Icon = isCompleted ? XCircle : CheckCircle;

//   return (
//     <Button
//       onClick={onClick}
//       disabled={isLoading || (!isQuizPassed && !isCompleted)}
//       type="button"
//       variant={isCompleted ? "outline" : "success"}
//       className="w-full md:w-auto"
//     >
//       {isCompleted ? "Not completed" : "Mark as complete"}
//       <Icon className="h-4 w-4 ml-2" />
//     </Button>
//   );
// };



// "use client";

// import axios from "axios";
// import { CheckCircle, XCircle } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import toast from "react-hot-toast";

// import { Button } from "@/components/ui/button";
// import { useConfettiStore } from "@/hooks/use-confetti-store";

// interface CourseProgressButtonProps {
//   chapterId: string;
//   courseId: string;
//   isCompleted?: boolean;
//   nextChapterId?: string;
//   isQuizPassed?: boolean;
//   className?: string;
// }

// export const CourseProgressButton = ({
//   chapterId,
//   courseId,
//   isCompleted,
//   nextChapterId,
//   isQuizPassed = true, // default to true to prevent accidental disabling
// }: CourseProgressButtonProps) => {
//   const router = useRouter();
//   const confetti = useConfettiStore();
//   const [isLoading, setIsLoading] = useState(false);

//   const onClick = async () => {
//     try {
//       setIsLoading(true);

//       if (!isQuizPassed && !isCompleted) {
//         toast.error("You must pass the quiz to mark this chapter as complete.");
//         return;
//       }

//       await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
//         isCompleted: !isCompleted,
//       });

//       if (!isCompleted && !nextChapterId) {
//         confetti.onOpen();
//       }

//       if (!isCompleted && nextChapterId) {
//         router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
//       }

//       toast.success("Progress updated");
//       router.refresh();
//     } catch (error) {
//       toast.error("Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const Icon = isCompleted ? XCircle : CheckCircle;

//   return (
//     <Button
//       onClick={onClick}
//       disabled={isLoading}
//       type="button"
//       variant={isCompleted ? "outline" : "success"}
//       className="w-full md:w-auto"
//     >
//       {isCompleted ? "Not completed" : "Mark as complete"}
//       <Icon className="h-4 w-4 ml-2" />
//     </Button>
//   );
// };




"use client";

import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface CourseProgressButtonProps {
  chapterId: string;
  courseId: string;
  isCompleted?: boolean;
  nextChapterId?: string;
  isQuizPassed?: boolean; // Added isQuizPassed to the interface
  className?: string; // Added to fix TypeScript error

}

export const CourseProgressButton = ({
  chapterId,
  courseId,
  isCompleted,
  nextChapterId,
  isQuizPassed, // Destructured the new prop
}: CourseProgressButtonProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      // Optionally, you could add logic here to check isQuizPassed before allowing progress updates
      // For now, keeping original logic as per your request
      await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
        isCompleted: !isCompleted,
      });

      if (!isCompleted && !nextChapterId) {
        confetti.onOpen();
      }

      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      toast.success("Progress updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = isCompleted ? XCircle : CheckCircle;

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      variant={isCompleted ? "outline" : "success"}
      className="w-full md:w-auto"
    >
      {isCompleted ? "Not completed" : "Mark as complete"}
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  );
};