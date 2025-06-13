import React, { useRef, useEffect } from "react";

interface VideoPlayerProps {
  isLocal: boolean;
  stream: MediaStream | null;
}

const VideoPlayer = React.forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ isLocal, stream }, ref) => {
    const internalRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
      // Resolve the actual video element ref
      const videoElement =
        typeof ref === "function"
          ? null // We can't directly manage function refs here
          : ref?.current || internalRef.current;

      if (videoElement && stream) {
        videoElement.srcObject = stream;
      }
    }, [stream, ref]);

    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: "10px",
          backgroundColor: "#000",
          overflow: "hidden",
        }}
      >
        <video
          ref={(typeof ref === "function" ? undefined : ref) || internalRef}
          autoPlay
          playsInline
          muted={isLocal}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            color: "#fff",
            fontSize: "14px",
            background: "rgba(0, 0, 0, 0.5)",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          {isLocal ? "You" : "Participant"}
        </div>
      </div>
    );
  }
);

export default VideoPlayer;
