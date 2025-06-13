// "use client";

// import axios from "axios";
// import MuxPlayer from "@mux/mux-player-react";
// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { Loader2, Lock } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { useConfettiStore } from "@/hooks/use-confetti-store";

// interface VideoPlayerProps {
//     playbackId?: string | null;
//     courseId: string;
//     chapterId: string;
//     nextChapterId?: string;
//     isLocked: boolean;
//     completeOnEnd: boolean;
//     title: string;
//   }

// export const VideoPlayer = ({
//     playbackId,
//     courseId,
//     chapterId,
//     nextChapterId,
//     isLocked,
//     completeOnEnd,
//     title,
// }: VideoPlayerProps) => {
//     const [isReady, setIsReady] = useState(false);
//     const router = useRouter();
//     const confetti = useConfettiStore();

//     const onEnd = async () => {
//         try {
//             if (completeOnEnd) {
//                 await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
//                     isCompleted: true,
//                 });

//                 if (!nextChapterId) {
//                     confetti.onOpen();
//                 }

//                 toast.success("Progress updated");
//                 router.refresh();

//                 if (nextChapterId) {
//                     router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
//                 }
//             }
//         } catch {
//             toast.error("Something went wrong");
//         }
//     }

//     return (
//         <div className="relative aspect-video">
//             {!isReady && !isLocked && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-slate-800  dark:bg-slate-200">
//                     <Loader2 className="h-8 w-8 animate-spin text-secondary" />
//                 </div>
//             )}
//             {isLocked && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-slate-800  dark:bg-slate-200 flex-col gap-y-2 text-secondary">
//                     <Lock className="h-8 w-8" />
//                     <p className="text-sm">
//                         This chapter is locked
//                     </p>
//                 </div>
//             )}
//             {!isLocked && playbackId && (
//                 <MuxPlayer
//                     title={title}
//                     className={cn(
//                         !isReady && "hidden"
//                     )}
//                     onCanPlay={() => setIsReady(true)}
//                     onEnded={onEnd}
//                     autoPlay
//                     playbackId={playbackId}
//                 />
//             )}
//         </div>
//     )
// }








// "use client";

// import axios from "axios";
// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { Loader2, Lock } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { useConfettiStore } from "@/hooks/use-confetti-store";

// interface VideoPlayerProps {
//   playbackId?: string | null;
//   courseId: string;
//   chapterId: string;
//   nextChapterId?: string;
//   isLocked: boolean;
//   completeOnEnd: boolean;
//   title: string;
// }

// export const VideoPlayer = ({
//   playbackId,
//   courseId,
//   chapterId,
//   nextChapterId,
//   isLocked,
//   completeOnEnd,
//   title,
// }: VideoPlayerProps) => {
//   const [isReady, setIsReady] = useState(false);
//   const router = useRouter();
//   const confetti = useConfettiStore();

//   const onEnd = async () => {
//     try {
//       if (completeOnEnd) {
//         await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
//           isCompleted: true,
//         });

//         if (!nextChapterId) {
//           confetti.onOpen();
//         }

//         toast.success("Progress updated");
//         router.refresh();

//         if (nextChapterId) {
//           router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
//         }
//       }
//     } catch {
//       toast.error("Something went wrong");
//     }
//   };

//   // Construct the Google Drive embed URL from the playbackId (file ID or URL)
//   const googleDriveEmbedUrl = playbackId
//     ? `https://drive.google.com/file/d/${extractGoogleDriveFileId(playbackId)}/preview`
//     : "";

//   return (
//     <div className="relative aspect-video">
//       {!isReady && !isLocked && (
//         <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200">
//           <Loader2 className="h-8 w-8 animate-spin text-secondary" />
//         </div>
//       )}
//       {isLocked && (
//         <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200 flex-col gap-y-2 text-secondary">
//           <Lock className="h-8 w-8" />
//           <p className="text-sm">This chapter is locked</p>
//         </div>
//       )}
//       {!isLocked && playbackId && (
//         <iframe
//           title={title}
//           className={cn(!isReady && "hidden")}
//           src={googleDriveEmbedUrl}
//           allow="autoplay; fullscreen"
//           frameBorder="0"
//           allowFullScreen
//           onLoad={() => setIsReady(true)}
//           style={{ width: "100%", height: "100%" }}
//         />
//       )}
//     </div>
//   );
// };

// // Helper function to extract Google Drive file ID from a URL or ID
// function extractGoogleDriveFileId(urlOrId: string): string {
//   // If it's already a file ID (e.g., "1QD_HjP7fhHApMySxYsUZlRRYiACjbp_g"), return it directly
//   if (!urlOrId.includes("http")) {
//     return urlOrId;
//   }

//   // Example: Extract file ID from "https://drive.google.com/file/d/1QD_HjP7fhHApMySxYsUZlRRYiACjbp_g/view?usp=sharing"
//   const match = urlOrId.match(/\/d\/([^/]+)(?:\/|$)/);
//   return match ? match[1] : urlOrId; // Return the file ID or the full URL if no match
// }








// "use client";

// import axios from "axios";
// import { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { Loader2, Lock } from "lucide-react";
// import MuxPlayer from "@mux/mux-player-react";
// import { cn } from "@/lib/utils";
// import { useConfettiStore } from "@/hooks/use-confetti-store";

// interface VideoPlayerProps {
//   playbackId?: string | null;
//   courseId: string;
//   chapterId: string;
//   nextChapterId?: string;
//   isLocked: boolean;
//   completeOnEnd: boolean;
//   title: string;
//   videoUrl?: string | null;
//   googleDriveUrl?: string | null;
// }

// export const VideoPlayer = ({
//   playbackId,
//   courseId,
//   chapterId,
//   nextChapterId,
//   isLocked,
//   completeOnEnd,
//   title,
//   videoUrl,
//   googleDriveUrl,
// }: VideoPlayerProps) => {
//   const [isReady, setIsReady] = useState(false);
//   const [videoSource, setVideoSource] = useState<"mux" | "google-drive" | "direct" | null>(null);
//   const router = useRouter();
//   const confetti = useConfettiStore();

//   useEffect(() => {
//     // Determine the video source type
//     if (playbackId) {
//       setVideoSource("mux");
//     } else if (googleDriveUrl) {
//       setVideoSource("google-drive");
//     } else if (videoUrl) {
//       setVideoSource("direct");
//     } else {
//       setVideoSource(null);
//     }
//   }, [playbackId, googleDriveUrl, videoUrl]);

//   const onEnd = async () => {
//     try {
//       if (completeOnEnd) {
//         await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
//           isCompleted: true,
//         });

//         if (!nextChapterId) {
//           confetti.onOpen();
//         }

//         toast.success("Progress updated");
//         router.refresh();

//         if (nextChapterId) {
//           router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
//         }
//       }
//     } catch {
//       toast.error("Something went wrong");
//     }
//   };

//   // Construct the Google Drive embed URL from the playbackId (file ID or URL)
//   const getGoogleDriveEmbedUrl = (url: string) => {
//     const fileId = extractGoogleDriveFileId(url);
//     return `https://drive.google.com/file/d/${fileId}/preview`;
//   };

//   return (
//     <div className="relative aspect-video">
//       {!isReady && !isLocked && (
//         <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200">
//           <Loader2 className="h-8 w-8 animate-spin text-secondary" />
//         </div>
//       )}
//       {isLocked && (
//         <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200 flex-col gap-y-2 text-secondary">
//           <Lock className="h-8 w-8" />
//           <p className="text-sm">This chapter is locked</p>
//         </div>
//       )}
//       {!isLocked && (
//         <>
//           {videoSource === "mux" && playbackId && (
//             <MuxPlayer
//               playbackId={playbackId}
//               onLoadedData={() => setIsReady(true)}
//               onEnded={onEnd}
//               className={cn(!isReady && "hidden")}
//               style={{ width: "100%", height: "100%" }}
//             />
//           )}
//           {videoSource === "google-drive" && googleDriveUrl && (
//             <iframe
//               title={title}
//               className={cn(!isReady && "hidden")}
//               src={getGoogleDriveEmbedUrl(googleDriveUrl)}
//               allow="autoplay; fullscreen"
//               frameBorder="0"
//               allowFullScreen
//               onLoad={() => setIsReady(true)}
//               style={{ width: "100%", height: "100%" }}
//             />
//           )}
//           {videoSource === "direct" && videoUrl && (
//             <video
//               controls
//               onCanPlay={() => setIsReady(true)}
//               onEnded={onEnd}
//               className={cn(!isReady && "hidden")}
//               style={{ width: "100%", height: "100%" }}
//             >
//               <source src={videoUrl} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// // Helper function to extract Google Drive file ID from a URL or ID
// function extractGoogleDriveFileId(urlOrId: string): string {
//   // If it's already a file ID (e.g., "1QD_HjP7fhHApMySxYsUZlRRYiACjbp_g"), return it directly
//   if (!urlOrId.includes("http")) {
//     return urlOrId;
//   }

//   // Example: Extract file ID from "https://drive.google.com/file/d/1QD_HjP7fhHApMySxYsUZlRRYiACjbp_g/view?usp=sharing"
//   const match = urlOrId.match(/\/d\/([^/]+)(?:\/|$)/);
//   return match ? match[1] : urlOrId; // Return the file ID or the full URL if no match
// }




// "use client";

// import React from "react";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { Loader2, Lock } from "lucide-react";
// import MuxPlayer from "@mux/mux-player-react";
// import { cn } from "@/lib/utils";
// import { useConfettiStore } from "@/hooks/use-confetti-store";

// interface VideoPlayerProps {
//   playbackId?: string | null;
//   courseId: string;
//   chapterId: string;
//   nextChapterId?: string;
//   isLocked: boolean;
//   completeOnEnd: boolean;
//   title: string;
//   videoUrl?: string | null;
//   googleDriveUrl?: string | null;
// }

// export const VideoPlayer = ({
//   playbackId,
//   courseId,
//   chapterId,
//   nextChapterId,
//   isLocked,
//   completeOnEnd,
//   title,
//   videoUrl,
//   googleDriveUrl,
// }: VideoPlayerProps) => {
//   const [isReady, setIsReady] = useState(false);
//   const [hasError, setHasError] = useState(false);
//   const [videoSource, setVideoSource] = useState<"mux" | "google-drive" | "direct" | null>(null);
//   const router = useRouter();
//   const confetti = useConfettiStore();

//   useEffect(() => {
//     // Determine the video source type
//     if (playbackId) {
//       setVideoSource("mux");
//     } else if (googleDriveUrl) {
//       setVideoSource("google-drive");
//     } else if (videoUrl) {
//       setVideoSource("direct");
//     } else {
//       setVideoSource(null);
//     }
//   }, [playbackId, googleDriveUrl, videoUrl]);

//   const onEnd = async () => {
//     try {
//       if (completeOnEnd) {
//         await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
//           isCompleted: true,
//         });

//         if (!nextChapterId) {
//           confetti.onOpen();
//         }

//         toast.success("Progress updated");
//         router.refresh();

//         if (nextChapterId) {
//           router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
//         }
//       }
//     } catch {
//       toast.error("Something went wrong");
//     }
//   };

//   // Construct the proxied URL for Google Drive videos
//   const getGoogleDriveProxyUrl = (url: string) => {
//     const fileId = extractGoogleDriveFileId(url);
//     return `/api/proxy-video?fileId=${fileId}`;
//   };

//   return (
//     <div className="relative aspect-video">
//       {!isReady && !isLocked && !hasError && (
//         <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200">
//           <Loader2 className="h-8 w-8 animate-spin text-secondary" />
//         </div>
//       )}
//       {isLocked && (
//         <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200 flex-col gap-y-2 text-secondary">
//           <Lock className="h-8 w-8" />
//           <p className="text-sm">This chapter is locked</p>
//         </div>
//       )}
//       {hasError && (
//         <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200 flex-col gap-y-2 text-secondary">
//           <p className="text-sm text-red-500">
//             Failed to load video. Please check the Google Drive link or try again later.
//           </p>
//         </div>
//       )}
//       {!isLocked && (
//         <>
//           {videoSource === "mux" && playbackId && (
//             <MuxPlayer
//               playbackId={playbackId}
//               onLoadedData={() => setIsReady(true)}
//               onEnded={onEnd}
//               className={cn(!isReady && "hidden")}
//               style={{ width: "100%", height: "100%" }}
//             />
//           )}
//           {videoSource === "google-drive" && googleDriveUrl && (
//             <video
//               controls
//               onCanPlay={() => setIsReady(true)}
//               onEnded={onEnd}
//               className={cn(!isReady && "hidden")}
//               style={{ width: "100%", height: "100%" }}
//               onError={() => {
//                 setHasError(true);
//                 setIsReady(true);
//               }}
//             >
//               <source src={getGoogleDriveProxyUrl(googleDriveUrl)} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           )}
//           {videoSource === "direct" && videoUrl && (
//             <video
//               controls
//               onCanPlay={() => setIsReady(true)}
//               onEnded={onEnd}
//               className={cn(!isReady && "hidden")}
//               style={{ width: "100%", height: "100%" }}
//               onError={() => {
//                 setHasError(true);
//                 setIsReady(true);
//               }}
//             >
//               <source src={videoUrl} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// // Helper function to extract Google Drive file ID from a URL or ID
// function extractGoogleDriveFileId(urlOrId: string): string {
//   // If it's already a file ID (e.g., "1QD_HjP7fhHApMySxYsUZlRRYiACjbp_g"), return it directly
//   if (!urlOrId.includes("http")) {
//     return urlOrId;
//   }

//   // Handle different Google Drive URL formats:
//   // 1. https://drive.google.com/file/d/{fileId}/view?usp=sharing
//   // 2. https://drive.google.com/open?id={fileId}
//   // 3. https://drive.google.com/file/d/{fileId}/edit
//   const fileIdMatch =
//     urlOrId.match(/\/d\/([^/]+)(?:\/|$)/) || // Matches /d/{fileId}
//     urlOrId.match(/[?&]id=([^&]+)/); // Matches ?id={fileId}

//   if (fileIdMatch) {
//     return fileIdMatch[1];
//   }

//   // If no match, return the input as a fallback (though this may indicate an invalid URL)
//   console.warn(`Could not extract file ID from Google Drive URL: ${urlOrId}`);
//   return urlOrId;
// }







// "use client";

// import React from "react";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { Loader2, Lock } from "lucide-react";
// import MuxPlayer from "@mux/mux-player-react";
// import { cn } from "@/lib/utils";
// import { useConfettiStore } from "@/hooks/use-confetti-store";

// interface VideoPlayerProps {
//   playbackId?: string | null;
//   courseId: string;
//   chapterId: string;
//   nextChapterId?: string;
//   isLocked: boolean;
//   completeOnEnd: boolean;
//   title: string;
//   videoUrl?: string | null;
//   googleDriveUrl?: string | null;
// }

// export const VideoPlayer = ({
//   playbackId,
//   courseId,
//   chapterId,
//   nextChapterId,
//   isLocked,
//   completeOnEnd,
//   title,
//   videoUrl,
//   googleDriveUrl,
// }: VideoPlayerProps) => {
//   const [isReady, setIsReady] = useState(false);
//   const [hasError, setHasError] = useState(false);
//   const [videoSource, setVideoSource] = useState<"mux" | "google-drive" | "direct" | null>(null);
//   const router = useRouter();
//   const confetti = useConfettiStore();

//   useEffect(() => {
//     setIsReady(false);
//     setHasError(false);

//     if (playbackId) {
//       setVideoSource("mux");
//     } else if (googleDriveUrl) {
//       setVideoSource("google-drive");
//     } else if (videoUrl) {
//       setVideoSource("direct");
//     } else {
//       setVideoSource(null);
//     }
//   }, [playbackId, googleDriveUrl, videoUrl]);

//   const onEnd = async () => {
//     try {
//       if (completeOnEnd) {
//         await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
//           isCompleted: true,
//         });

//         if (!nextChapterId) {
//           confetti.onOpen();
//         }

//         toast.success("Progress updated");
//         router.refresh();

//         if (nextChapterId) {
//           router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
//         }
//       }
//     } catch {
//       toast.error("Something went wrong");
//     }
//   };

//   const getGoogleDriveProxyUrl = (url: string) => {
//     const fileId = extractGoogleDriveFileId(url);
//     return `/api/drive-proxy?fileId=${fileId}`;
//   };

//   return (
//     <div className="relative aspect-video">
//       {!isReady && !isLocked && !hasError && (
//         <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200">
//           <Loader2 className="h-8 w-8 animate-spin text-secondary" />
//         </div>
//       )}
//       {isLocked && (
//         <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200 flex-col gap-y-2 text-secondary">
//           <Lock className="h-8 w-8" />
//           <p className="text-sm">This chapter is locked</p>
//         </div>
//       )}
//       {hasError && (
//         <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200 flex-col gap-y-2 text-secondary">
//           <p className="text-sm text-red-500">
//             Failed to load video. Please check the video link or try again later.
//           </p>
//         </div>
//       )}
//       {!isLocked && (
//         <>
//           {videoSource === "mux" && playbackId && (
//             <MuxPlayer
//               playbackId={playbackId}
//               onLoadedData={() => setIsReady(true)}
//               onEnded={onEnd}
//               className={cn(!isReady && "hidden")}
//               style={{ width: "100%", height: "100%" }}
//             />
//           )}
//           {videoSource === "google-drive" && googleDriveUrl && (
//             <video
//               key={`drive-${googleDriveUrl}`}
//               controls
//               autoPlay
//               onCanPlay={() => setIsReady(true)}
//               onEnded={onEnd}
//               className={cn(!isReady && "hidden")}
//               style={{ width: "100%", height: "100%" }}
//               onError={() => {
//                 setHasError(true);
//                 setIsReady(true);
//               }}
//             >
//               <source src={getGoogleDriveProxyUrl(googleDriveUrl)} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           )}
//           {videoSource === "direct" && videoUrl && (
//             <video
//               key={`direct-${videoUrl}`}
//               controls
//               autoPlay
//               onCanPlay={() => setIsReady(true)}
//               onEnded={onEnd}
//               className={cn(!isReady && "hidden")}
//               style={{ width: "100%", height: "100%" }}
//               onError={() => {
//                 setHasError(true);
//                 setIsReady(true);
//               }}
//             >
//               <source src={videoUrl} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// function extractGoogleDriveFileId(urlOrId: string): string {
//   if (!urlOrId.includes("http")) {
//     return urlOrId;
//   }

//   const fileIdMatch =
//     urlOrId.match(/\/d\/([^/]+)(?:\/|$)/) ||
//     urlOrId.match(/[?&]id=([^&]+)/);

//   if (fileIdMatch) {
//     return fileIdMatch[1];
//   }

//   console.warn(`Could not extract file ID from Google Drive URL: ${urlOrId}`);
//   return urlOrId;
// }



                          
// "use client";

// import axios from "axios";
// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { Loader2, Lock } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { useConfettiStore } from "@/hooks/use-confetti-store";

// interface VideoPlayerProps {
//   playbackId?: string | null;
//   courseId: string;
//   chapterId: string;
//   nextChapterId?: string;
//   isLocked: boolean;
//   completeOnEnd: boolean;
//   title: string;
// }

// export const VideoPlayer = ({
//   playbackId,
//   courseId,
//   chapterId,
//   nextChapterId,
//   isLocked,
//   completeOnEnd,
//   title,
// }: VideoPlayerProps) => {
//   const [isReady, setIsReady] = useState(false);
//   const router = useRouter();
//   const confetti = useConfettiStore();

//   const onEnd = async () => {
//     try {
//       if (completeOnEnd) {
//         await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
//           isCompleted: true,
//         });

//         if (!nextChapterId) {
//           confetti.onOpen();
//         }

//         toast.success("Progress updated");
//         router.refresh();

//         if (nextChapterId) {
//           router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
//         }
//       }
//     } catch {
//       toast.error("Something went wrong");
//     }
//   };

//   // Construct the Google Drive embed URL from the playbackId (file ID or URL)
//   const googleDriveEmbedUrl = playbackId
//     ? `https://drive.google.com/file/d/${extractGoogleDriveFileId(playbackId)}/preview`
//     : "";

//   return (
//     <div className="relative aspect-video">
//       {!isReady && !isLocked && (
//         <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200">
//           <Loader2 className="h-8 w-8 animate-spin text-secondary" />
//         </div>
//       )}
//       {isLocked && (
//         <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200 flex-col gap-y-2 text-secondary">
//           <Lock className="h-8 w-8" />
//           <p className="text-sm">This chapter is locked</p>
//         </div>
//       )}
//       {!isLocked && playbackId && (
//         <iframe
//           title={title}
//           className={cn(!isReady && "hidden")}
//           src={googleDriveEmbedUrl}
//           allow="autoplay; fullscreen"
//           frameBorder="0"
//           allowFullScreen
//           onLoad={() => setIsReady(true)}
//           style={{ width: "100%", height: "100%" }}
//         />
//       )}
//     </div>
//   );
// };

// // Helper function to extract Google Drive file ID from a URL or ID
// function extractGoogleDriveFileId(urlOrId: string): string {
//   // If it's already a file ID (e.g., "1QD_HjP7fhHApMySxYsUZlRRYiACjbp_g"), return it directly
//   if (!urlOrId.includes("http")) {
//     return urlOrId;
//   }

//   // Example: Extract file ID from "https://drive.google.com/file/d/1QD_HjP7fhHApMySxYsUZlRRYiACjbp_g/view?usp=sharing"
//   const match = urlOrId.match(/\/d\/([^/]+)(?:\/|$)/);
//   return match ? match[1] : urlOrId; // Return the file ID or the full URL if no match
// }


 





// "use client";

// import axios from "axios";
// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { Loader2, Lock } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { useConfettiStore } from "@/hooks/use-confetti-store";

// interface VideoPlayerProps {
//   playbackId?: string | null;
//   courseId: string;
//   chapterId: string;
//   nextChapterId?: string;
//   isLocked: boolean;
//   completeOnEnd: boolean;
//   title: string;
// }

// export const VideoPlayer = ({
//   playbackId,
//   courseId,
//   chapterId,
//   nextChapterId,
//   isLocked,
//   completeOnEnd,
//   title,
// }: VideoPlayerProps) => {
//   const [isReady, setIsReady] = useState(false);
//   const router = useRouter();
//   const confetti = useConfettiStore();

//   const onEnd = async () => {
//     try {
//       if (completeOnEnd) {
//         await axios.put(
//           `/api/courses/${courseId}/chapters/${chapterId}/progress`,
//           { isCompleted: true }
//         );

//         if (!nextChapterId) {
//           confetti.onOpen();
//         }

//         toast.success("Progress updated");
//         router.refresh();

//         if (nextChapterId) {
//           router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
//         }
//       }
//     } catch {
//       toast.error("Something went wrong");
//     }
//   };

//   const googleDriveEmbedUrl = playbackId
//     ? `https://drive.google.com/file/d/${extractGoogleDriveFileId(playbackId)}/preview`
//     : "";

//   return (
//     <div className="relative aspect-video">
//       {!isReady && !isLocked && (
//         <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200">
//           <Loader2 className="h-8 w-8 animate-spin text-secondary" />
//         </div>
//       )}
//       {isLocked && (
//         <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200 flex-col gap-y-2 text-secondary">
//           <Lock className="h-8 w-8" />
//           <p className="text-sm">This chapter is locked</p>
//         </div>
//       )}
//       {!isLocked && playbackId && (
//         <iframe
//           title={title}
//           className={cn(!isReady && "hidden")}
//           src={googleDriveEmbedUrl}
//           allow="autoplay; fullscreen"
//           frameBorder="0"
//           allowFullScreen
//           onLoad={() => {
//             setIsReady(true);
//             onEnd(); // Trigger onEnd when video loads (you can change this if you need it on actual end)
//           }}
//           style={{ width: "100%", height: "100%" }}
//         />
//       )}
//     </div>
//   );
// };

// // Extracts a Google Drive File ID from various possible formats
// function extractGoogleDriveFileId(input: string): string {
//   // If it’s already a file ID (no URL structure), return it
//   if (!input.includes("http")) return input;

//   // Common Google Drive link patterns
//   const patterns = [
//     /\/file\/d\/([a-zA-Z0-9_-]+)/, // standard file link
//     /id=([a-zA-Z0-9_-]+)/,         // sharing link with id param
//     /\/uc\?export=download&id=([a-zA-Z0-9_-]+)/, // uc links
//   ];

//   for (const pattern of patterns) {
//     const match = input.match(pattern);
//     if (match && match[1]) return match[1];
//   }

//   // fallback: try to extract using /d/ pattern
//   const fallbackMatch = input.match(/\/d\/([^/]+)/);
//   return fallbackMatch ? fallbackMatch[1] : input;
// }






// "use client";

// import axios from "axios";
// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { Loader2, Lock, CheckCircle } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { useConfettiStore } from "@/hooks/use-confetti-store";
// import { Button } from "@/components/ui/button";

// interface VideoPlayerProps {
//   playbackId?: string | null;
//   courseId: string;
//   chapterId: string;
//   nextChapterId?: string;
//   isLocked: boolean;
//   completeOnEnd: boolean;
//   title: string;
// }

// export const VideoPlayer = ({
//   playbackId,
//   courseId,
//   chapterId,
//   nextChapterId,
//   isLocked,
//   completeOnEnd,
//   title,
// }: VideoPlayerProps) => {
//   const [isReady, setIsReady] = useState(false);
//   const [hasError, setHasError] = useState(false);
//   const router = useRouter();
//   const confetti = useConfettiStore();

//   const onEnd = async () => {
//     try {
//       if (completeOnEnd) {
//         await axios.put(
//           `/api/courses/${courseId}/chapters/${chapterId}/progress`,
//           { isCompleted: true }
//         );

//         if (!nextChapterId) {
//           confetti.onOpen();
//         }

//         toast.success("Progress updated");
//         router.refresh();

//         if (nextChapterId) {
//           router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
//         }
//       }
//     } catch {
//       toast.error("Something went wrong");
//     }
//   };

//   const googleDriveEmbedUrl = playbackId
//     ? `https://drive.google.com/file/d/${extractGoogleDriveFileId(playbackId)}/preview`
//     : "";

//   return (
//     <div className="relative aspect-video">
//       {!isReady && !isLocked && !hasError && (
//         <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200">
//           <Loader2 className="h-8 w-8 animate-spin text-secondary" />
//         </div>
//       )}
//       {isLocked && (
//         <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200 flex-col gap-y-2 text-secondary">
//           <Lock className="h-8 w-8" />
//           <p className="text-sm">This chapter is locked</p>
//         </div>
//       )}
//       {hasError && (
//         <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200 flex-col gap-y-2 text-secondary">
//           <p className="text-sm">Failed to load video. Please check the video link or try again later.</p>
//         </div>
//       )}
//       {!isLocked && playbackId && !hasError && (
//         <>
//           <iframe
//             title={title}
//             className={cn("w-full h-full", !isReady && "hidden")}
//             src={googleDriveEmbedUrl}
//             allow="autoplay; fullscreen; encrypted-media"
//             allowFullScreen
//             sandbox="allow-same-origin allow-scripts allow-presentation"
//             onLoad={() => setIsReady(true)}
//             onError={() => {
//               setHasError(true);
//               toast.error("Failed to load video");
//             }}
//           />
//           {isReady && completeOnEnd && (
//             <div className="absolute bottom-4 right-4">
//               <Button
//                 onClick={onEnd}
//                 className="flex items-center gap-x-2 bg-primary text-white"
//               >
//                 <CheckCircle className="h-4 w-4" />
//                 Mark as Complete
//               </Button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// // Extracts a Google Drive File ID from various possible formats
// function extractGoogleDriveFileId(input: string): string {
//   // If it’s already a file ID (no URL structure), return it
//   if (!input.includes("http")) return input;

//   // Common Google Drive link patterns
//   const patterns = [
//     /\/file\/d\/([a-zA-Z0-9_-]+)/, // standard file link
//     /id=([a-zA-Z0-9_-]+)/,         // sharing link with id param
//     /\/uc\?export=download&id=([a-zA-Z0-9_-]+)/, // uc links
//   ];

//   for (const pattern of patterns) {
//     const match = input.match(pattern);
//     if (match && match[1]) return match[1];
//   }

//   // Fallback: try to extract using /d/ pattern
//   const fallbackMatch = input.match(/\/d\/([^/]+)/);
//   return fallbackMatch ? fallbackMatch[1] : input;
// }



// "use client";

// import axios from "axios";
// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { Loader2, Lock } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { useConfettiStore } from "@/hooks/use-confetti-store";

// interface VideoPlayerProps {
//   playbackId?: string | null;
//   courseId: string;
//   chapterId: string;
//   nextChapterId?: string;
//   isLocked: boolean;
//   completeOnEnd: boolean;
//   title: string;
// }

// export const VideoPlayer = ({
//   playbackId,
//   courseId,
//   chapterId,
//   nextChapterId,
//   isLocked,
//   completeOnEnd,
//   title,
// }: VideoPlayerProps) => {
//   const [isReady, setIsReady] = useState(false);
//   const router = useRouter();
//   const confetti = useConfettiStore();

//   const onEnd = async () => {
//     try {
//       if (completeOnEnd) {
//         await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
//           isCompleted: true,
//         });

//         if (!nextChapterId) {
//           confetti.onOpen();
//         }

//         toast.success("Progress updated");
//         router.refresh();

//         if (nextChapterId) {
//           router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
//         }
//       }
//     } catch {
//       toast.error("Something went wrong");
//     }
//   };

//   // Construct the Google Drive embed URL from the playbackId (file ID or URL)
//   const googleDriveEmbedUrl = playbackId
//     ? `https://drive.google.com/file/d/${extractGoogleDriveFileId(playbackId)}/preview`
//     : "";

//   return (
//     <div className="relative aspect-video">
//       {!isReady && !isLocked && (
//         <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200">
//           <Loader2 className="h-8 w-8 animate-spin text-secondary" />
//         </div>
//       )}
//       {isLocked && (
//         <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200 flex-col gap-y-2 text-secondary">
//           <Lock className="h-8 w-8" />
//           <p className="text-sm">This chapter is locked</p>
//         </div>
//       )}
//       {!isLocked && playbackId && (
//         <iframe
//           title={title}
//           className={cn(!isReady && "hidden")}
//           src={googleDriveEmbedUrl}
//           allow="autoplay; fullscreen"
//           frameBorder="0"
//           allowFullScreen
//           onLoad={() => setIsReady(true)}
//           style={{ width: "100%", height: "100%" }}
//         />
//       )}
//     </div>
//   );
// };

// // Helper function to extract Google Drive file ID from a URL or ID
// function extractGoogleDriveFileId(urlOrId: string): string {
//   // If it's already a file ID (e.g., "1QD_HjP7fhHApMySxYsUZlRRYiACjbp_g"), return it directly
//   if (!urlOrId.includes("http")) {
//     return urlOrId;
//   }

//   // Example: Extract file ID from "https://drive.google.com/file/d/1QD_HjP7fhHApMySxYsUZlRRYiACjbp_g/view?usp=sharing"
//   const match = urlOrId.match(/\/d\/([^/]+)(?:\/|$)/);
//   return match ? match[1] : urlOrId; // Return the file ID or the full URL if no match
// }









// "use client";

// import axios from "axios";
// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { Loader2, Lock } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { useConfettiStore } from "@/hooks/use-confetti-store";

// interface VideoPlayerProps {
//   playbackId?: string | null;
//   courseId: string;
//   chapterId: string;
//   nextChapterId?: string;
//   isLocked: boolean;
//   completeOnEnd: boolean;
//   title: string;
// }

// export const VideoPlayer = ({
//   playbackId,
//   courseId,
//   chapterId,
//   nextChapterId,
//   isLocked,
//   completeOnEnd,
//   title,
// }: VideoPlayerProps) => {
//   const [isReady, setIsReady] = useState(false);
//   const router = useRouter();
//   const confetti = useConfettiStore();

//   const onEnd = async () => {
//     try {
//       if (completeOnEnd) {
//         await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
//           isCompleted: true,
//         });

//         if (!nextChapterId) {
//           confetti.onOpen();
//         }

//         toast.success("Progress updated");
//         router.refresh();

//         if (nextChapterId) {
//           router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
//         }
//       }
//     } catch {
//       toast.error("Something went wrong");
//     }
//   };

//   const googleDriveFileId = playbackId ? extractGoogleDriveFileId(playbackId) : "";

//   return (
//     <div className="relative aspect-video">
//       {!isReady && !isLocked && (
//         <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200">
//           <Loader2 className="h-8 w-8 animate-spin text-secondary" />
//         </div>
//       )}
//       {isLocked && (
//         <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200 flex-col gap-y-2 text-secondary">
//           <Lock className="h-8 w-8" />
//           <p className="text-sm">This chapter is locked</p>
//         </div>
//       )}
//       {!isLocked && playbackId && (
//         <div className={cn(!isReady && "hidden")}>
//           <p className="text-center text-sm text-gray-600 dark:text-gray-400">
//             Cannot embed Google Drive video due to browser security policy.
//           </p>
//           <a
//             href={`https://drive.google.com/file/d/${googleDriveFileId}/view`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 underline text-center block mt-2"
//           >
//             Open Video in Google Drive
//           </a>
//         </div>
//       )}
//     </div>
//   );
// };

// function extractGoogleDriveFileId(urlOrId: string): string {
//   if (!urlOrId.includes("http")) {
//     return urlOrId;
//   }
//   const match = urlOrId.match(/\/d\/([^/]+)(?:\/|$)/);
//   return match ? match[1] : urlOrId;
// }






"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface VideoPlayerProps {
  playbackId?: string | null;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
  videoUrl?: string | null;
  googleDriveUrl?: string | null;
}

export const VideoPlayer = ({
  playbackId,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
  videoUrl,
  googleDriveUrl,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();
  const [showFallback, setShowFallback] = useState(false);

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
          isCompleted: true,
        });

        if (!nextChapterId) {
          confetti.onOpen();
        }

        toast.success("Progress updated");
        router.refresh();

        if (nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (!videoUrl && !googleDriveUrl) {
      setIsReady(false);
      return;
    }
    setIsReady(true);
  }, [videoUrl, googleDriveUrl]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}

      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}

      {!isLocked && isReady && (
        <>
          {googleDriveUrl ? (
            <iframe
              src={googleDriveUrl.replace("/view", "/preview")}
              width="100%"
              height="100%"
              allow="autoplay; fullscreen"
              title="Google Drive Video"
              className="rounded-md"
            />
          ) : videoUrl ? (
            <video
              src={videoUrl}
              controls
              className="w-full h-full"
              onLoadedData={() => setIsReady(true)}
              onEnded={onEnd}
              onError={() => setShowFallback(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200">
              <p className="text-sm text-secondary">No video available</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

function extractGoogleDriveFileId(urlOrId: string): string {
  if (!urlOrId.includes("http")) {
    return urlOrId;
  }
  const match = urlOrId.match(/\/d\/([^/]+)(?:\/|$)/);
  return match ? match[1] : urlOrId;
}