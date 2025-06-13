// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';
// import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//     apiKey: "AIzaSyCdEdpuui7Fm9TRE9D54clemM0NDQdCb8M",
//     authDomain: "lms-livestream.firebaseapp.com",
//     projectId: "lms-livestream",
//     storageBucket: "lms-livestream.appspot.com",
//     messagingSenderId: "824524822025",
//     appId: "1:824524822025:web:c9e5166d82d8987f3e4ad8", // Replace YOUR_APP_ID with the actual value from Firebase
//   };
  

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const storage = getStorage(app);
// export const auth = getAuth(app);




import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCxvn9HqtWkXw4ipnBYkQNqEhJ9pwiwyPY',
  authDomain: 'eduskill-lms.firebaseapp.com',
  projectId: 'eduskill-lms',
  storageBucket: 'eduskill-lms.appspot.com',
  messagingSenderId: '260883964424',
  appId: '1:260883964424:web:44d9d1e111b7ab0227e7bd', // Replace with your actual App ID from the Firebase Console
};

const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app); // Explicitly type auth as Auth

export { auth };