// import React, { useEffect, useRef, useState } from 'react';
// import { 
//   IAgoraRTCClient, 
//   ICameraVideoTrack, 
//   IMicrophoneAudioTrack, 
//   createClient, 
//   createMicrophoneAndCameraTracks 
// } from 'agora-rtc-sdk-ng';

// const appId = 'YOUR_APP_ID';
// const channel = 'test-channel';
// const token = 'YOUR_TEMP_TOKEN'; // Replace with a generated token if your project requires token authentication.

// const VideoCall: React.FC = () => {
//   const [client, setClient] = useState<IAgoraRTCClient | null>(null);
//   const [tracks, setTracks] = useState<[IMicrophoneAudioTrack, ICameraVideoTrack] | null>(null);
//   const remoteUsers = useRef<HTMLDivElement>(null);
//   const localVideoRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const initAgoraClient = async () => {
//       const agoraClient = createClient({ mode: 'rtc', codec: 'vp8' });
//       setClient(agoraClient);

//       await agoraClient.join(appId, channel, token, null);
     
//       const [microphoneTrack, cameraTrack] = await createMicrophoneAndCameraTracks();
//       setTracks([microphoneTrack, cameraTrack]);

//       if (localVideoRef.current) cameraTrack.play(localVideoRef.current);

//       agoraClient.on('user-published', async (user: any, mediaType: 'audio' | 'video') => {
//         await agoraClient.subscribe(user, mediaType);
//         if (mediaType === 'video') {
//           const remoteVideoContainer = document.createElement('div');
//           remoteVideoContainer.id = user.uid.toString();
//           remoteUsers.current?.appendChild(remoteVideoContainer);
//           user.videoTrack?.play(remoteVideoContainer);
//         }
//       });

//       agoraClient.on('user-unpublished', (user: any) => {
//         const remoteVideoContainer = document.getElementById(user.uid.toString());
//         if (remoteVideoContainer) remoteVideoContainer.remove();
//       });

//       await agoraClient.publish([microphoneTrack, cameraTrack]);
//     };

//     initAgoraClient();

//     return () => {
//       client?.leave();
//       tracks?.forEach((track) => track.close());
//     };
//   }, []);

//   return (
//     <div>
//       <h2>Live Video Call</h2>
//       <div ref={localVideoRef} style={{ width: '400px', height: '300px', backgroundColor: 'black' }}>
//         Local Video
//       </div>
//       <div ref={remoteUsers}></div>
//     </div>
//   );
// };

// export default VideoCall;