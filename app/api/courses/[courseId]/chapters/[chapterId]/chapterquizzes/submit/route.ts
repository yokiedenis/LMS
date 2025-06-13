// import { NextResponse, NextRequest } from "next/server"; 
// import prisma from "@/lib/prisma"; 
// import { z } from "zod"; 
// import { getAuth } from "@clerk/nextjs/server"; 

// // Zod schema for validating the answer submission
// const answerSchema = z.object({
//   answers: z
//     .array(
//       z.object({
//         questionId: z.string().min(1, "Question ID is required"),
//         answer: z.string().min(1, "Answer is required"),
//       })
//     )
//     .min(1, "At least one answer is required"),
// });

// // API route handler for submitting quiz answers
// export async function POST(request: NextRequest, { params }: { params: { courseId: string; chapterQuizId: string } }) {
//   const { chapterQuizId } = params;

//   // Parse the request body
//   const body = await request.json();

//   // Validate the request body against the schema
//   const result = answerSchema.safeParse(body);

//   if (!result.success) {
//     console.error("Validation errors:", result.error.errors);
//     return NextResponse.json(
//       { message: "Validation failed", errors: result.error.errors },
//       { status: 400 }
//     );
//   }

//   const { answers } = result.data;

//   // Get user authentication details from the request
//   const { userId } = getAuth(request); 

//   // Check if the user is authenticated
//   if (!userId) {
//     return NextResponse.json(
//       { message: "User not authenticated" },
      
//       { status: 401 }
//     );
//   }

//   try {
//     // Fetch the quiz questions and their correct answers
//     const quizQuestions = await prisma.chapterQuestion.findMany({
//       where: { chapterQuizId },
//       select: { id: true, correctAnswer: true },
//     });

//     console.log("quizQuestions:", quizQuestions);
//     console.log("submitted answers:", answers);

//     // Calculate score
//     let score = 0;
//     const totalQuestions = quizQuestions.length;

//     // Create a mapping of correct answers for quick lookup
//     const correctAnswersMap = Object.fromEntries(
//       quizQuestions.map(question => [question.id, question.correctAnswer])
//     );

//     // Iterate through answers to calculate the score
//     answers.forEach(answer => {
//       const submittedAnswer = answer.answer.split('.')[0].trim(); // Extract the letter and trim any whitespace
//       const correctAnswer = correctAnswersMap[answer.questionId];

//       console.log(`Checking: Question ID: ${answer.questionId}, Submitted Answer: ${submittedAnswer}, Correct Answer: ${correctAnswer}`);

//       // Compare the submitted answer with the correct answer
//       if (correctAnswer && correctAnswer === submittedAnswer) {
//         score++;
//       }
//     });

//     // Check if the user has already submitted the quiz before
//     const existingAttempt = await prisma.chapterQuizAttempt.findFirst({
//       where: {
//         chapterQuizId,
//         studentId: userId,
//       },
//     });

//     let quizAttempt;

//     if (existingAttempt) {
//       // If an attempt exists, update it
//       quizAttempt = await prisma.chapterQuizAttempt.update({
//         where: { id: existingAttempt.id },
//         data: {
//           score,
//           totalQuestions,
//           answers: JSON.stringify(answers), // Store the new answers
//         },
//       });
//     } else {
//       // If no previous attempt exists, create a new one
//       quizAttempt = await prisma.chapterQuizAttempt.create({
//         data: {
//           chapterQuizId,
//           studentId: userId,
//           score,
//           totalQuestions,
//           answers: JSON.stringify(answers),
//         },
//       });
//     }

//     // Return the results with status 201 (Created)
//     return NextResponse.json(
//       {
//         score,
//         totalQuestions,
//         attemptId: quizAttempt.id,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Failed to submit answers:", error);
//     const errorMessage = (error instanceof Error) ? error.message : "Failed to submit answers";

//     return NextResponse.json(
//       { message: errorMessage },
//       { status: 500 }
//     );
//   }
// }






// import { NextResponse, NextRequest } from "next/server";
// import prisma from "@/lib/prisma";
// import { z } from "zod";
// import { getAuth } from "@clerk/nextjs/server";

// const answerSchema = z.object({
//   answers: z
//     .array(
//       z.object({
//         questionId: z.string().min(1, "Question ID is required"),
//         answer: z.string().min(1, "Answer is required"),
//       })
//     )
//     .min(1, "At least one answer is required"),
// });

// export async function POST(request: NextRequest, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { chapterId } = params;

//   // Parse the request body
//   const body = await request.json();

//   // Validate the request body against the schema
//   const result = answerSchema.safeParse(body);

//   if (!result.success) {
//     console.error("Validation errors:", result.error.errors);
//     return NextResponse.json(
//       { message: "Validation failed", errors: result.error.errors },
//       { status: 400 }
//     );
//   }

//   const { answers } = result.data;

//   // Get user authentication details from the request
//   const { userId } = getAuth(request);

//   // Check if the user is authenticated and use type guard
//   if (!userId || typeof userId !== 'string') {
//     return NextResponse.json(
//       { message: "User not authenticated or user ID is invalid" },
//       { status: 401 }
//     );
//   }

//   try {
//     // Fetch the quiz questions and their correct answers
//     const quizQuestions = await prisma.chapterQuestion.findMany({
//       where: { chapterQuiz: { chapterId } },
//       select: { id: true, correctAnswer: true },
//     });

//     console.log("quizQuestions:", quizQuestions);
//     console.log("submitted answers:", answers);

//     // Calculate score
//     let score = 0;
//     const totalQuestions = quizQuestions.length;

//     const correctAnswersMap = Object.fromEntries(
//       quizQuestions.map(question => [question.id, question.correctAnswer])
//     );

//     answers.forEach(answer => {
//       const submittedAnswer = answer.answer.split('.')[0].trim();
//       const correctAnswer = correctAnswersMap[answer.questionId];

//       console.log(`Checking: Question ID: ${answer.questionId}, Submitted Answer: ${submittedAnswer}, Correct Answer: ${correctAnswer}`);

//       if (correctAnswer && correctAnswer === submittedAnswer) {
//         score++;
//       }
//     });

//     // Find the ChapterQuiz for this chapter
//     const chapterQuiz = await prisma.chapterQuiz.findFirst({
//       where: { chapterId: chapterId }
//     });

//     if (!chapterQuiz) {
//       return NextResponse.json({ message: "Chapter quiz not found" }, { status: 404 });
//     }

//     // Create or update the quiz attempt
//     const quizAttempt = await prisma.chapterQuizAttempt.create({
//       data: {
//         chapterQuiz: {
//           connect: { id: chapterQuiz.id } // Connect to the existing ChapterQuiz
//         },
//         student: {
//           connect: { id: userId } // Connect to the existing User (student)
//         },
//         score,
//         totalQuestions,
//         answers: JSON.stringify(answers),
//       },
//     });

//     return NextResponse.json(
//       {
//         score,
//         totalQuestions,
//         attemptId: quizAttempt.id,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Failed to submit answers:", error);
//     const errorMessage = (error instanceof Error) ? error.message : "Failed to submit answers";

//     return NextResponse.json(
//       { message: errorMessage },
//       { status: 500 }
//     );
//   }
// }






// import { NextResponse, NextRequest } from "next/server";
// import prisma from "@/lib/prisma";
// import { z } from "zod";
// import { getAuth } from "@clerk/nextjs/server";

// const answerSchema = z.object({
//   answers: z
//     .array(
//       z.object({
//         questionId: z.string().min(1, "Question ID is required"),
//         answer: z.string().min(1, "Answer is required"),
//       })
//     )
//     .min(1, "At least one answer is required"),
// });

// export async function POST(request: NextRequest, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { chapterId } = params;

//   // Parse the request body
//   const body = await request.json();

//   // Validate the request body against the schema
//   const result = answerSchema.safeParse(body);

//   if (!result.success) {
//     console.error("Validation errors:", result.error.errors);
//     return NextResponse.json(
//       { message: "Validation failed", errors: result.error.errors },
//       { status: 400 }
//     );
//   }

//   const { answers } = result.data;

//   // Get user authentication details from the request
//   const { userId } = getAuth(request);

//   // Check if the user is authenticated and use type guard
//   if (!userId || typeof userId !== 'string') {
//     return NextResponse.json(
//       { message: "User not authenticated or user ID is invalid" },
//       { status: 401 }
//     );
//   }

//   try {
//     // Check if user exists, if not, create the user
//     let user = await prisma.user.findUnique({ where: { id: userId } });
//     if (!user) {
//       console.log(`User not found, creating user with ID: ${userId}`);
//       user = await prisma.user.create({
//         data: {
//           id: userId,  // Assuming userId from Clerk matches your database ID format
//           name: "New User",  // You might want to fetch this from Clerk or default it
//           email: "user@example.com"  // Similarly, default or fetch from Clerk
//         }
//       });
//     } else {
//       console.log(`User found with ID: ${userId}`);
//     }

//     const quizQuestions = await prisma.chapterQuestion.findMany({
//       where: { chapterQuiz: { chapterId } },
//       select: { id: true, correctAnswer: true },
//     });

//     console.log("quizQuestions:", quizQuestions);
//     console.log("submitted answers:", answers);

//     let score = 0;
//     const totalQuestions = quizQuestions.length;

//     const correctAnswersMap = Object.fromEntries(
//       quizQuestions.map(question => [question.id, question.correctAnswer.trim()])
//     );

//     answers.forEach(answer => {
//       const submittedAnswer = answer.answer.split('.')[0].trim();
//       const correctAnswer = correctAnswersMap[answer.questionId];

//       console.log(`Checking: Question ID: ${answer.questionId}, Submitted Answer: ${submittedAnswer}, Correct Answer: ${correctAnswer}`);

//       if (correctAnswer && correctAnswer === submittedAnswer) {
//         score++;
//       }
//     });

//     const chapterQuiz = await prisma.chapterQuiz.findFirst({
//       where: { chapterId: chapterId }
//     });

//     if (!chapterQuiz) {
//       return NextResponse.json({ message: "Chapter quiz not found" }, { status: 404 });
//     }

//     const quizAttempt = await prisma.chapterQuizAttempt.create({
//       data: {
//         chapterQuiz: {
//           connect: { id: chapterQuiz.id }
//         },
//         student: {
//           connect: { id: userId }
//         },
//         score,
//         totalQuestions,
//         answers: JSON.stringify(answers),
//       },
//     });

//     return NextResponse.json(
//       {
//         score,
//         totalQuestions,
//         attemptId: quizAttempt.id,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Failed to submit answers:", error);
//     const errorMessage = (error instanceof Error) ? error.message : "Failed to submit answers";

//     return NextResponse.json(
//       { message: errorMessage },
//       { status: 500 }
//     );
//   }
// }








// import { NextResponse, NextRequest } from "next/server";
// import prisma from "@/lib/prisma";
// import { z } from "zod";
// import { getAuth } from "@clerk/nextjs/server";

// const answerSchema = z.object({
//   answers: z
//     .array(
//       z.object({
//         questionId: z.string().min(1, "Question ID is required"),
//         answer: z.string().min(1, "Answer is required"),
//       })
//     )
//     .min(1, "At least one answer is required"),
// });

// export async function POST(request: NextRequest, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { chapterId } = params;

//   // Parse the request body
//   const body = await request.json();

//   // Validate the request body against the schema
//   const result = answerSchema.safeParse(body);

//   if (!result.success) {
//     console.error("Validation errors:", result.error.errors);
//     return NextResponse.json(
//       { message: "Validation failed", errors: result.error.errors },
//       { status: 400 }
//     );
//   }

//   const { answers } = result.data;

//   // Get user authentication details from the request
//   const { userId } = getAuth(request);

//   // Check if the user is authenticated and use type guard
//   if (!userId || typeof userId !== 'string') {
//     return NextResponse.json(
//       { message: "User not authenticated or user ID is invalid" },
//       { status: 401 }
//     );
//   }

//   try {
//     // Check if user exists, if not, create the user
//     let user = await prisma.user.findUnique({ where: { id: userId } });
//     if (!user) {
//       console.log(`User not found, creating user with ID: ${userId}`);
//       user = await prisma.user.create({
//         data: {
//           id: userId,  // Assuming userId from Clerk matches your database ID format
//           name: "New User",  // You might want to fetch this from Clerk or default it
//           email: "user@example.com"  // Similarly, default or fetch from Clerk
//         }
//       });
//     } else {
//       console.log(`User found with ID: ${userId}`);
//     }

//     const quizQuestions = await prisma.chapterQuestion.findMany({
//       where: { chapterQuiz: { chapterId } },
//       select: { id: true, correctAnswer: true },
//     });

//     console.log("quizQuestions:", quizQuestions);
//     console.log("submitted answers:", answers);

//     let score = 0;
//     const totalQuestions = quizQuestions.length;

//     const correctAnswersMap = Object.fromEntries(
//       quizQuestions.map(question => [question.id, question.correctAnswer.trim()])
//     );

//     answers.forEach(answer => {
//       // Extract the letter (e.g., "A", "B", "C", "D") from the submitted answer
//       const submittedAnswerMatch = answer.answer.match(/^[A-D]\./i);
//       const submittedAnswer = submittedAnswerMatch ? submittedAnswerMatch[0].replace('.', '').trim() : '';
      
//       const correctAnswer = correctAnswersMap[answer.questionId];

//       console.log(`Checking: Question ID: ${answer.questionId}, Submitted Answer: ${submittedAnswer}, Correct Answer: ${correctAnswer}`);

//       if (correctAnswer && correctAnswer === submittedAnswer) {
//         score++;
//       }
//     });

//     const chapterQuiz = await prisma.chapterQuiz.findFirst({
//       where: { chapterId: chapterId }
//     });

//     if (!chapterQuiz) {
//       return NextResponse.json({ message: "Chapter quiz not found" }, { status: 404 });
//     }

//     const quizAttempt = await prisma.chapterQuizAttempt.create({
//       data: {
//         chapterQuiz: {
//           connect: { id: chapterQuiz.id }
//         },
//         student: {
//           connect: { id: userId }
//         },
//         score,
//         totalQuestions,
//         answers: JSON.stringify(answers),
//       },
//     });

//     return NextResponse.json(
//       {
//         score,
//         totalQuestions,
//         attemptId: quizAttempt.id,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Failed to submit answers:", error);
//     const errorMessage = (error instanceof Error) ? error.message : "Failed to submit answers";

//     return NextResponse.json(
//       { message: errorMessage },
//       { status: 500 }
//     );
//   }
// }







// import { NextResponse, NextRequest } from "next/server";
// import prisma from "@/lib/prisma";
// import { z } from "zod";
// import { getAuth } from "@clerk/nextjs/server";

// const answerSchema = z.object({
//   answers: z
//     .array(
//       z.object({
//         questionId: z.string().min(1, "Question ID is required"),
//         answer: z.string().min(1, "Answer is required"),
//       })
//     )
//     .min(1, "At least one answer is required"),
// });

// export async function POST(
//   request: NextRequest,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {
//   const { courseId, chapterId } = params;

//   // Parse the request body
//   const body = await request.json();

//   // Validate the request body against the schema
//   const result = answerSchema.safeParse(body);

//   if (!result.success) {
//     console.error("Validation errors:", result.error.errors);
//     return NextResponse.json(
//       { message: "Validation failed", errors: result.error.errors },
//       { status: 400 }
//     );
//   }

//   const { answers } = result.data;

//   // Get user authentication details from the request
//   const { userId } = getAuth(request);

//   // Check if the user is authenticated and use type guard
//   if (!userId || typeof userId !== "string") {
//     return NextResponse.json(
//       { message: "User not authenticated or user ID is invalid" },
//       { status: 401 }
//     );
//   }

//   try {
//     // Check if user exists, if not, create the user
//     let user = await prisma.user.findUnique({ where: { id: userId } });
//     if (!user) {
//       console.log(`User not found, creating user with ID: ${userId}`);
//       user = await prisma.user.create({
//         data: {
//           id: userId, // Assuming userId from Clerk matches your database ID format
//           name: "New User", // You might want to fetch this from Clerk or default it
//           email: "user@example.com", // Similarly, default or fetch from Clerk
//         },
//       });
//     } else {
//       console.log(`User found with ID: ${userId}`);
//     }

//     // Fetch quiz questions for the chapter quiz associated with this chapterId
//     const quizQuestions = await prisma.chapterQuestion.findMany({
//       where: { chapterQuiz: { chapterId } },
//       select: { id: true, correctAnswer: true },
//     });

//     if (quizQuestions.length === 0) {
//       return NextResponse.json(
//         { message: "No questions found for this chapter quiz" },
//         { status: 404 }
//       );
//     }

//     console.log("quizQuestions:", quizQuestions);
//     console.log("submitted answers:", answers);

//     let score = 0;
//     const totalQuestions = quizQuestions.length;

//     const correctAnswersMap = Object.fromEntries(
//       quizQuestions.map((question) => [question.id, question.correctAnswer.trim()])
//     );

//     answers.forEach((answer) => {
//       // Extract the letter (e.g., "A", "B", "C", "D") from the submitted answer
//       const submittedAnswerMatch = answer.answer.match(/^[A-D]\./i);
//       const submittedAnswer = submittedAnswerMatch
//         ? submittedAnswerMatch[0].replace(".", "").trim()
//         : "";
//       const correctAnswer = correctAnswersMap[answer.questionId];

//       console.log(
//         `Checking: Question ID: ${answer.questionId}, Submitted Answer: ${submittedAnswer}, Correct Answer: ${correctAnswer}`
//       );

//       if (correctAnswer && correctAnswer === submittedAnswer) {
//         score++;
//       }
//     });

//     // Fetch the chapter quiz to get its ID
//     const chapterQuiz = await prisma.chapterQuiz.findFirst({
//       where: { chapterId },
//     });

//     if (!chapterQuiz) {
//       return NextResponse.json({ message: "Chapter quiz not found" }, { status: 404 });
//     }

//     // Create the quiz attempt with all required fields
//     const quizAttempt = await prisma.chapterQuizAttempt.create({
//       data: {
//         chapterQuiz: {
//           connect: { id: chapterQuiz.id },
//         },
//         student: {
//           connect: { id: userId },
//         },
//         score,
//         totalQuestions,
//         chapterId, // Added required chapterId from params
//         answers: JSON.stringify(answers),
//       },
//     });

//     return NextResponse.json(
//       {
//         score,
//         totalQuestions,
//         attemptId: quizAttempt.id,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Failed to submit answers:", error);
//     const errorMessage =
//       error instanceof Error ? error.message : "Failed to submit answers";

//     return NextResponse.json(
//       { message: errorMessage },
//       { status: 500 }
//     );
//   }
// }






// import { NextResponse, NextRequest } from "next/server";
// import prisma from "@/lib/prisma";
// import { z } from "zod";
// import { getAuth } from "@clerk/nextjs/server";

// const answerSchema = z.object({
//   answers: z
//     .array(
//       z.object({
//         questionId: z.string().min(1, "Question ID is required"),
//         answer: z.string().min(1, "Answer is required"),
//       })
//     )
//     .min(1, "At least one answer is required"),
// });

// export async function POST(
//   request: NextRequest,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {
//   const { courseId, chapterId } = params;

//   // Parse the request body
//   const body = await request.json();

//   // Validate the request body against the schema
//   const result = answerSchema.safeParse(body);

//   if (!result.success) {
//     console.error("Validation errors:", result.error.errors);
//     return NextResponse.json(
//       { message: "Validation failed", errors: result.error.errors },
//       { status: 400 }
//     );
//   }

//   const { answers } = result.data;

//   // Get user authentication details from the request
//   const { userId } = getAuth(request);

//   // Check if the user is authenticated and use type guard
//   if (!userId || typeof userId !== "string") {
//     return NextResponse.json(
//       { message: "User not authenticated or user ID is invalid" },
//       { status: 401 }
//     );
//   }

//   try {
//     // Check if user exists, if not, create the user
//     let user = await prisma.user.findUnique({ where: { id: userId } });
//     if (!user) {
//       console.log(`User not found, creating user with ID: ${userId}`);
//       user = await prisma.user.create({
//         data: {
//           id: userId, // Assuming userId from Clerk matches your database ID format
//           name: "New User", // You might want to fetch this from Clerk or default it
//           email: "user@example.com", // Similarly, default or fetch from Clerk
//         },
//       });
//     } else {
//       console.log(`User found with ID: ${userId}`);
//     }

//     // Fetch quiz questions for the chapter quiz associated with this chapterId
//     const quizQuestions = await prisma.chapterQuestion.findMany({
//       where: { chapterQuiz: { chapterId } },
//       select: { id: true, correctAnswer: true },
//     });

//     if (quizQuestions.length === 0) {
//       return NextResponse.json(
//         { message: "No questions found for this chapter quiz" },
//         { status: 404 }
//       );
//     }

//     console.log("quizQuestions:", quizQuestions);
//     console.log("submitted answers:", answers);

//     let score = 0;
//     const totalQuestions = quizQuestions.length;

//     const correctAnswersMap = Object.fromEntries(
//       quizQuestions.map((question) => [question.id, question.correctAnswer.trim()])
//     );

//     answers.forEach((answer) => {
//       // Extract the letter (e.g., "A", "B", "C", "D") from the submitted answer
//       const submittedAnswerMatch = answer.answer.match(/^[A-D]\./i);
//       const submittedAnswer = submittedAnswerMatch
//         ? submittedAnswerMatch[0].replace(".", "").trim()
//         : "";
//       const correctAnswer = correctAnswersMap[answer.questionId];

//       console.log(
//         `Checking: Question ID: ${answer.questionId}, Submitted Answer: ${submittedAnswer}, Correct Answer: ${correctAnswer}`
//       );

//       if (correctAnswer && correctAnswer === submittedAnswer) {
//         score++;
//       }
//     });

//     // Fetch the chapter quiz to get its ID
//     const chapterQuiz = await prisma.chapterQuiz.findFirst({
//       where: { chapterId },
//     });

//     if (!chapterQuiz) {
//       return NextResponse.json({ message: "Chapter quiz not found" }, { status: 404 });
//     }

//     // Create the quiz attempt with all required fields
//     const quizAttempt = await prisma.chapterQuizAttempt.create({
//       data: {
//         chapterQuiz: {
//           connect: { id: chapterQuiz.id },
//         },
//         student: {
//           connect: { id: userId },
//         },
//         score,
//         totalQuestions,
//         chapterId, // Added required chapterId from params
//         answers: JSON.stringify(answers),
//       },
//     });

//     return NextResponse.json(
//       {
//         score,
//         totalQuestions,
//         attemptId: quizAttempt.id,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Failed to submit answers:", error);
//     const errorMessage =
//       error instanceof Error ? error.message : "Failed to submit answers";

//     return NextResponse.json(
//       { message: errorMessage },
//       { status: 500 }
//     );
//   }
// }




// import { NextResponse, NextRequest } from "next/server";
// import prisma from "@/lib/prisma";
// import { z } from "zod";
// import { getAuth } from "@clerk/nextjs/server";

// const answerSchema = z.object({
//   answers: z
//     .array(
//       z.object({
//         questionId: z.string().min(1, "Question ID is required"),
//         answer: z.string().min(1, "Answer is required"),
//       })
//     )
//     .min(1, "At least one answer is required"),
// });

// export async function POST(
//   request: NextRequest,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {
//   const { courseId, chapterId } = params;

//   // Parse the request body
//   const body = await request.json();

//   // Validate the request body against the schema
//   const result = answerSchema.safeParse(body);

//   if (!result.success) {
//     console.error("Validation errors:", result.error.errors);
//     return NextResponse.json(
//       { message: "Validation failed", errors: result.error.errors },
//       { status: 400 }
//     );
//   }

//   const { answers } = result.data;

//   // Get user authentication details from the request
//   const { userId } = getAuth(request);

//   // Check if the user is authenticated and use type guard
//   if (!userId || typeof userId !== "string") {
//     return NextResponse.json(
//       { message: "User not authenticated or user ID is invalid" },
//       { status: 401 }
//     );
//   }

//   try {
//     // Check if user exists, if not, create the user
//     let user = await prisma.user.findUnique({ where: { id: userId } });
//     if (!user) {
//       console.log(`User not found, creating user with ID: ${userId}`);
//       user = await prisma.user.create({
//         data: {
//           id: userId,
//           name: "New User",
//           email: "user@example.com",
//         },
//       });
//     } else {
//       console.log(`User found with ID: ${userId}`);
//     }

//     // Fetch quiz questions with their options for the chapter quiz
//     const quizQuestions = await prisma.chapterQuestion.findMany({
//       where: { chapterQuiz: { chapterId } },
//       include: {
//         chapterOptions: true,
//       },
//     });

//     if (quizQuestions.length === 0) {
//       return NextResponse.json(
//         { message: "No questions found for this chapter quiz" },
//         { status: 404 }
//       );
//     }

//     console.log("quizQuestions:", quizQuestions);
//     console.log("submitted answers:", answers);

//     let score = 0;
//     const totalQuestions = quizQuestions.length;

//     // Create a map of correct answers with question IDs
//     const correctAnswersMap = new Map();
//     quizQuestions.forEach((question) => {
//       const correctOption = question.chapterOptions.find((option) => option.isCorrect);
//       if (correctOption) {
//         correctAnswersMap.set(question.id, correctOption.text);
//       }
//     });

//     // Compare submitted answers with correct answers
//     answers.forEach((submittedAnswer) => {
//       const correctAnswer = correctAnswersMap.get(submittedAnswer.questionId);
//       console.log(
//         `Checking: Question ID: ${submittedAnswer.questionId}, Submitted Answer: ${submittedAnswer.answer}, Correct Answer: ${correctAnswer}`
//       );

//       if (correctAnswer && correctAnswer === submittedAnswer.answer) {
//         score++;
//       }
//     });

//     // Fetch the chapter quiz to get its ID
//     const chapterQuiz = await prisma.chapterQuiz.findFirst({
//       where: { chapterId },
//     });

//     if (!chapterQuiz) {
//       return NextResponse.json({ message: "Chapter quiz not found" }, { status: 404 });
//     }

//     // Create the quiz attempt with all required fields
//     const quizAttempt = await prisma.chapterQuizAttempt.create({
//       data: {
//         chapterQuiz: {
//           connect: { id: chapterQuiz.id },
//         },
//         student: {
//           connect: { id: userId },
//         },
//         score,
//         totalQuestions,
//         chapterId,
//         answers: JSON.stringify(answers),
//       },
//     });

//     return NextResponse.json(
//       {
//         score,
//         totalQuestions,
//         attemptId: quizAttempt.id,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Failed to submit answers:", error);
//     const errorMessage =
//       error instanceof Error ? error.message : "Failed to submit answers";

//     return NextResponse.json(
//       { message: errorMessage },
//       { status: 500 }
//     );
//   }
// }






// import { NextResponse, NextRequest } from "next/server";
// import prisma from "@/lib/prisma";
// import { z } from "zod";
// import { getAuth } from "@clerk/nextjs/server";

// const answerSchema = z.object({
//   answers: z
//     .array(
//       z.object({
//         questionId: z.string().min(1, "Question ID is required"),
//         answer: z.string().min(1, "Answer is required"),
//       })
//     )
//     .min(1, "At least one answer is required"),
// });

// export async function POST(
//   request: NextRequest,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {
//   const { courseId, chapterId } = params;

//   // Parse the request body
//   const body = await request.json();

//   // Validate the request body against the schema
//   const result = answerSchema.safeParse(body);

//   if (!result.success) {
//     console.error("Validation errors:", result.error.errors);
//     return NextResponse.json(
//       { message: "Validation failed", errors: result.error.errors },
//       { status: 400 }
//     );
//   }

//   const { answers } = result.data;

//   // Get user authentication details from the request
//   const { userId } = getAuth(request);

//   // Check if the user is authenticated and use type guard
//   if (!userId || typeof userId !== "string") {
//     return NextResponse.json(
//       { message: "User not authenticated or user ID is invalid" },
//       { status: 401 }
//     );
//   }

//   try {
//     // Check if user exists, if not, create the user
//     let user = await prisma.user.findUnique({ where: { id: userId } });
//     if (!user) {
//       console.log(`User not found, creating user with ID: ${userId}`);
//       user = await prisma.user.create({
//         data: {
//           id: userId, // Assuming userId from Clerk matches your database ID format
//           name: "New User", // You might want to fetch this from Clerk or default it
//           email: "user@example.com", // Similarly, default or fetch from Clerk
//         },
//       });
//     } else {
//       console.log(`User found with ID: ${userId}`);
//     }

//     // Fetch quiz questions for the chapter quiz associated with this chapterId
//     const quizQuestions = await prisma.chapterQuestion.findMany({
//       where: { chapterQuiz: { chapterId } },
//       select: { id: true, correctAnswer: true },
//     });

//     if (quizQuestions.length === 0) {
//       return NextResponse.json(
//         { message: "No questions found for this chapter quiz" },
//         { status: 404 }
//       );
//     }

//     console.log("quizQuestions:", quizQuestions);
//     console.log("submitted answers:", answers);

//     let score = 0;
//     const totalQuestions = quizQuestions.length;

//     const correctAnswersMap = Object.fromEntries(
//       quizQuestions.map((question) => [question.id, question.correctAnswer.trim()])
//     );

//     answers.forEach((answer) => {
//       // Extract the letter (e.g., "A", "B", "C", "D") from the submitted answer
//       const submittedAnswerMatch = answer.answer.match(/^[A-D]\./i);
//       const submittedAnswer = submittedAnswerMatch
//         ? submittedAnswerMatch[0].replace(".", "").trim()
//         : "";
//       const correctAnswer = correctAnswersMap[answer.questionId];

//       console.log(
//         `Checking: Question ID: ${answer.questionId}, Submitted Answer: ${submittedAnswer}, Correct Answer: ${correctAnswer}`
//       );

//       if (correctAnswer && correctAnswer === submittedAnswer) {
//         score++;
//       }
//     });

//     // Fetch the chapter quiz to get its ID
//     const chapterQuiz = await prisma.chapterQuiz.findFirst({
//       where: { chapterId },
//     });

//     if (!chapterQuiz) {
//       return NextResponse.json({ message: "Chapter quiz not found" }, { status: 404 });
//     }

//     // Create the quiz attempt with all required fields
//     const quizAttempt = await prisma.chapterQuizAttempt.create({
//       data: {
//         chapterQuiz: {
//           connect: { id: chapterQuiz.id },
//         },
//         student: {
//           connect: { id: userId },
//         },
//         score,
//         totalQuestions,
//         chapterId, // Added required chapterId from params
//         answers: JSON.stringify(answers),
//       },
//     });

//     return NextResponse.json(
//       {
//         score,
//         totalQuestions,
//         attemptId: quizAttempt.id,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Failed to submit answers:", error);
//     const errorMessage =
//       error instanceof Error ? error.message : "Failed to submit answers";

//     return NextResponse.json(
//       { message: errorMessage },
//       { status: 500 }
//     );
//   }
// }




// import { NextResponse, NextRequest } from "next/server";
// import prisma from "@/lib/prisma";
// import { z } from "zod";
// import { getAuth } from "@clerk/nextjs/server";
// import { clerkClient } from "@clerk/nextjs/server";

// const answerSchema = z.object({
//   answers: z
//     .array(
//       z.object({
//         questionId: z.string().min(1, "Question ID is required"),
//         answer: z.string().min(1, "Answer is required"),
//       })
//     )
//     .min(1, "At least one answer is required"),
// });

// export async function POST(
//   request: NextRequest,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {
//   const { courseId, chapterId } = params;

//   // Parse the request body
//   const body = await request.json();

//   // Validate the request body against the schema
//   const result = answerSchema.safeParse(body);

//   if (!result.success) {
//     console.error("Validation errors:", result.error.errors);
//     return NextResponse.json(
//       { message: "Validation failed", errors: result.error.errors },
//       { status: 400 }
//     );
//   }

//   const { answers } = result.data;

//   // Get user authentication details from the request
//   const { userId } = getAuth(request);

//   // Check if the user is authenticated and use type guard
//   if (!userId || typeof userId !== "string") {
//     return NextResponse.json(
//       { message: "User not authenticated or user ID is invalid" },
//       { status: 401 }
//     );
//   }

//   try {
//     // Check if user exists, if not, create the user
//     let user = await prisma.user.findUnique({ where: { id: userId } });
//     if (!user) {
//       console.log(`User not found, creating user with ID: ${userId}`);
      
//       // Fetch user details from Clerk
//       const clerkUser = await clerkClient.users.getUser(userId);
//       const email = clerkUser.emailAddresses[0]?.emailAddress || `default-${userId}@example.com`;
//       const name = clerkUser.firstName || clerkUser.lastName ? `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() : "New User";

//       // Check if a user with this email already exists
//       const existingUserWithEmail = await prisma.user.findUnique({ where: { email } });
//       if (existingUserWithEmail) {
//         // If the existing user has a different userId, log the issue and use the existing user
//         if (existingUserWithEmail.id !== userId) {
//           console.warn(
//             `Email ${email} exists for another user ID: ${existingUserWithEmail.id}. Using existing user for user ID: ${userId}. Manual resolution may be required.`
//           );
//         }
//         // Use the existing user regardless of userId match
//         user = existingUserWithEmail;
//       } else {
//         // Create a new user if no user with this email exists
//         user = await prisma.user.create({
//           data: {
//             id: userId,
//             name,
//             email,
//           },
//         });
//         console.log(`User created with ID: ${userId}, Email: ${email}`);
//       }
//     } else {
//       console.log(`User found with ID: ${userId}`);
//     }

//     // Fetch quiz questions for the chapter quiz associated with this chapterId
//     const quizQuestions = await prisma.chapterQuestion.findMany({
//       where: { chapterQuiz: { chapterId } },
//       select: { id: true, correctAnswer: true },
//     });

//     if (quizQuestions.length === 0) {
//       return NextResponse.json(
//         { message: "No questions found for this chapter quiz" },
//         { status: 404 }
//       );
//     }

//     console.log("quizQuestions:", quizQuestions);
//     console.log("submitted answers:", answers);

//     let score = 0;
//     const totalQuestions = quizQuestions.length;

//     const correctAnswersMap = Object.fromEntries(
//       quizQuestions.map((question) => [question.id, question.correctAnswer.trim()])
//     );

//     answers.forEach((answer) => {
//       // Extract the letter (e.g., "A", "B", "C", "D") from the submitted answer
//       const submittedAnswerMatch = answer.answer.match(/^[A-D]\./i);
//       const submittedAnswer = submittedAnswerMatch
//         ? submittedAnswerMatch[0].replace(".", "").trim()
//         : "";
//       const correctAnswer = correctAnswersMap[answer.questionId];

//       console.log(
//         `Checking: Question ID: ${answer.questionId}, Submitted Answer: ${submittedAnswer}, Correct Answer: ${correctAnswer}`
//       );

//       if (correctAnswer && correctAnswer === submittedAnswer) {
//         score++;
//       }
//     });

//     // Fetch the chapter quiz to get its ID
//     const chapterQuiz = await prisma.chapterQuiz.findFirst({
//       where: { chapterId },
//     });

//     if (!chapterQuiz) {
//       return NextResponse.json({ message: "Chapter quiz not found" }, { status: 404 });
//     }

//     // Create the quiz attempt with all required fields
//     const quizAttempt = await prisma.chapterQuizAttempt.create({
//       data: {
//         chapterQuiz: {
//           connect: { id: chapterQuiz.id },
//         },
//         student: {
//           connect: { id: user.id }, // Use the user's ID from the resolved user
//         },
//         score,
//         totalQuestions,
//         chapterId,
//         answers: JSON.stringify(answers),
//       },
//     });

//     return NextResponse.json(
//       {
//         score,
//         totalQuestions,
//         attemptId: quizAttempt.id,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Failed to submit answers:", error);
//     const errorMessage =
//       error instanceof Error ? error.message : "Failed to submit answers";

//     return NextResponse.json(
//       { message: errorMessage },
//       { status: 500 }
//     );
//   }
// }




import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";

const answerSchema = z.object({
  answers: z
    .array(
      z.object({
        questionId: z.string().min(1, "Question ID is required"),
        answer: z.string().min(1, "Answer is required"),
      })
    )
    .min(1, "At least one answer is required"),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  const { courseId, chapterId } = params;

  // Parse the request body
  const body = await request.json();

  // Validate the request body against the schema
  const result = answerSchema.safeParse(body);

  if (!result.success) {
    console.error("Validation errors:", result.error.errors);
    return NextResponse.json(
      { message: "Validation failed", errors: result.error.errors },
      { status: 400 }
    );
  }

  const { answers } = result.data;

  // Get user authentication details from the request
  const { userId } = getAuth(request);

  // Check if the user is authenticated and use type guard
  if (!userId || typeof userId !== "string") {
    return NextResponse.json(
      { message: "User not authenticated or user ID is invalid" },
      { status: 401 }
    );
  }

  try {
    // Check if user exists, if not, create the user
    let user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      console.log(`User not found, creating user with ID: ${userId}`);
      
      // Fetch user details from Clerk
      const clerkUser = await clerkClient.users.getUser(userId);
      let email = clerkUser.emailAddresses[0]?.emailAddress || `default-${userId}@example.com`;
      const name = clerkUser.firstName || clerkUser.lastName ? `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() : "New User";

      // Check if a user with this email already exists
      const existingUserWithEmail = await prisma.user.findUnique({ where: { email } });
      if (existingUserWithEmail) {
        // If the email exists, use a unique fallback email
        console.warn(`Email ${email} exists for another user ID: ${existingUserWithEmail.id}. Using unique fallback email for user ID: ${userId}.`);
        email = `user-${userId}-${Date.now()}@example.com`; // Ensure unique email
      }

      // Create a new user
      user = await prisma.user.create({
        data: {
          id: userId,
          name,
          email,
        },
      });
      console.log(`User created with ID: ${userId}, Email: ${email}`);
    } else {
      console.log(`User found with ID: ${userId}`);
    }

    // Fetch quiz questions for the chapter quiz associated with this chapterId
    const quizQuestions = await prisma.chapterQuestion.findMany({
      where: { chapterQuiz: { chapterId } },
      select: { id: true, correctAnswer: true },
    });

    if (quizQuestions.length === 0) {
      return NextResponse.json(
        { message: "No questions found for this chapter quiz" },
        { status: 404 }
      );
    }

    console.log("quizQuestions:", quizQuestions);
    console.log("submitted answers:", answers);

    let score = 0;
    const totalQuestions = quizQuestions.length;

    const correctAnswersMap = Object.fromEntries(
      quizQuestions.map((question) => [question.id, question.correctAnswer.trim()])
    );

    answers.forEach((answer) => {
      // Extract the letter (e.g., "A", "B", "C", "D") from the submitted answer
      const submittedAnswerMatch = answer.answer.match(/^[A-D]\./i);
      const submittedAnswer = submittedAnswerMatch
        ? submittedAnswerMatch[0].replace(".", "").trim()
        : "";
      const correctAnswer = correctAnswersMap[answer.questionId];

      console.log(
        `Checking: Question ID: ${answer.questionId}, Submitted Answer: ${submittedAnswer}, Correct Answer: ${correctAnswer}`
      );

      if (correctAnswer && correctAnswer === submittedAnswer) {
        score++;
      }
    });

    // Fetch the chapter quiz to get its ID
    const chapterQuiz = await prisma.chapterQuiz.findFirst({
      where: { chapterId },
    });

    if (!chapterQuiz) {
      return NextResponse.json({ message: "Chapter quiz not found" }, { status: 404 });
    }

    // Create the quiz attempt with all required fields
    const quizAttempt = await prisma.chapterQuizAttempt.create({
      data: {
        chapterQuiz: {
          connect: { id: chapterQuiz.id },
        },
        student: {
          connect: { id: userId }, // Use Clerk userId
        },
        score,
        totalQuestions,
        chapterId,
        answers: JSON.stringify(answers),
      },
    });

    return NextResponse.json(
      {
        score,
        totalQuestions,
        attemptId: quizAttempt.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to submit answers:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to submit answers";

    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}