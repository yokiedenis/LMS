// import Mux from "@mux/mux-node";
// import { db } from "@/lib/db";
// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// const { Video } = new Mux(process.env.MUX_TOKEN_ID!, process.env.MUX_TOKEN_SECRET!);

// // DELETE Method
// export async function DELETE(
//   req: Request,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {
//   try {
//     const { userId } = auth();

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const ownCourse = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//         userId,
//       },
//     });

//     if (!ownCourse) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const chapter = await db.chapter.findUnique({
//       where: {
//         id: params.chapterId,
//         courseId: params.courseId,
//       },
//     });

//     if (!chapter) {
//       return new NextResponse("Chapter not found", { status: 404 });
//     }

//     // Handle Mux video deletion if videoUrl exists
//     if (chapter.videoUrl) {
//       const existingMuxData = await db.muxData.findFirst({
//         where: {
//           chapterId: params.chapterId,
//         },
//       });

//       if (existingMuxData) {
//         try {
//           await Video.Assets.del(existingMuxData.assetId);
//           await db.muxData.delete({
//             where: {
//               id: existingMuxData.id,
//             },
//           });
//         } catch (muxError) {
//           console.error("[MUX_ERROR]", muxError);
//           return new NextResponse("Mux Video Deletion Failed", { status: 500 });
//         }
//       }
//     }

//     const deletedChapter = await db.chapter.delete({
//       where: {
//         id: params.chapterId,
//       },
//     });

//     // Check if there are any published chapters left in the course
//     const publishedChaptersInCourse = await db.chapter.findMany({
//       where: {
//         courseId: params.courseId,
//         isPublished: true,
//       },
//     });

//     if (!publishedChaptersInCourse.length) {
//       await db.course.update({
//         where: {
//           id: params.courseId,
//         },
//         data: {
//           isPublished: false,
//         },
//       });
//     }

//     return NextResponse.json(deletedChapter);
//   } catch (error) {
//     console.log("[CHAPTER_ID_DELETE]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }

// // PATCH Method
// export async function PATCH(
//   req: Request,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {
//   try {
//     const { userId } = auth();
//     const { isPublished, ...values } = await req.json();

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const ownCourse = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//         userId,
//       },
//     });

//     if (!ownCourse) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Update the chapter in the database
//     const chapter = await db.chapter.update({
//       where: {
//         id: params.chapterId,
//         courseId: params.courseId,
//       },
//       data: {
//         ...values,
//       },
//     });

//     // Handle video upload logic
//     if (values.videoUrl) {
//       const existingMuxData = await db.muxData.findFirst({
//         where: {
//           chapterId: params.chapterId,
//         },
//       });

//       // Delete the previous Mux video if it exists
//       if (existingMuxData) {
//         try {
//           await Video.Assets.del(existingMuxData.assetId);
//           await db.muxData.delete({
//             where: {
//               id: existingMuxData.id,
//             },
//           });
//         } catch (muxError) {
//           console.error("[MUX_ERROR]", muxError);
//           return new NextResponse("Mux Video Deletion Failed", { status: 500 });
//         }
//       }

//       // Create a new Mux asset for the updated video URL
//       try {
//         const asset = await Video.Assets.create({
//           input: values.videoUrl,
//           playback_policy: "public",
//           test: false,
//         });

//         // Store the new Mux asset data in the database
//         await db.muxData.create({
//           data: {
//             chapterId: params.chapterId,
//             assetId: asset.id,
//             playbackId: asset.playback_ids?.[0]?.id,
//           },
//         });
//       } catch (muxError) {
//         console.error("[MUX_ERROR]", muxError);
//         return new NextResponse("Mux Asset Creation Failed", { status: 500 });
//       }
//     }

//     return NextResponse.json(chapter);
//   } catch (error) {
//     console.log("[COURSES_CHAPTER_ID]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }












import Mux from "@mux/mux-node";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const { Video } = new Mux(process.env.MUX_TOKEN_ID!, process.env.MUX_TOKEN_SECRET!);

// DELETE Method (unchanged)
export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });

    if (!chapter) {
      return new NextResponse("Chapter not found", { status: 404 });
    }

    if (chapter.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });

      if (existingMuxData) {
        try {
          await Video.Assets.del(existingMuxData.assetId);
          await db.muxData.delete({
            where: {
              id: existingMuxData.id,
            },
          });
        } catch (muxError) {
          console.error("[MUX_ERROR]", muxError);
          return new NextResponse("Mux Video Deletion Failed", { status: 500 });
        }
      }
    }

    const deletedChapter = await db.chapter.delete({
      where: {
        id: params.chapterId,
      },
    });

    const publishedChaptersInCourse = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
    });

    if (!publishedChaptersInCourse.length) {
      await db.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(deletedChapter);
  } catch (error) {
    console.log("[CHAPTER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// PATCH Method
export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { isPublished, googleDriveUrl, videoUrl, ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Update the chapter with all values including googleDriveUrl if provided
    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
        googleDriveUrl: googleDriveUrl || undefined, // Only update if provided
      },
    });

    // Handle video upload logic (for direct uploads via Mux)
    if (videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });

      if (existingMuxData) {
        try {
          await Video.Assets.del(existingMuxData.assetId);
          await db.muxData.delete({
            where: {
              id: existingMuxData.id,
            },
          });
        } catch (muxError) {
          console.error("[MUX_ERROR]", muxError);
          return new NextResponse("Mux Video Deletion Failed", { status: 500 });
        }
      }

      try {
        const asset = await Video.Assets.create({
          input: videoUrl,
          playback_policy: "public",
          test: false,
        });

        await db.muxData.create({
          data: {
            chapterId: params.chapterId,
            assetId: asset.id,
            playbackId: asset.playback_ids?.[0]?.id,
          },
        });

        // Update chapter with the new videoUrl
        await db.chapter.update({
          where: {
            id: params.chapterId,
          },
          data: {
            videoUrl,
          },
        });
      } catch (muxError) {
        console.error("[MUX_ERROR]", muxError);
        return new NextResponse("Mux Asset Creation Failed", { status: 500 });
      }
    }

    // Fetch the updated chapter to return
    const updatedChapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
      },
    });

    return NextResponse.json(updatedChapter);
  } catch (error) {
    console.log("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}