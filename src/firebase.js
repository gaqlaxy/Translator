// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: import.meta.env.Firebase_API_KEY,
//     authDomain: import.meta.env.Firebase_AUTH_DOMAIN,
//     projectId: import.meta.env.Firebase_PROJECT_ID,
//     storageBucket: import.meta.env.Firebase_STORAGE_BUCKET,
//     messagingSenderId: import.meta.env.Firebase_MESSAGING_SENDER_ID,
//     appId: import.meta.env.Firebase_App_ID
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);



import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA7GTyjXQhpcVneJPuaGYiiBcSlD45cwII",
    authDomain: "translator2807.firebaseapp.com",
    projectId: "translator2807",
    storageBucket: "translator2807.firebasestorage.app",
    messagingSenderId: "994040202474",
    appId: "1:994040202474:web:1082252d65d084c357c393"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };