// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDkhzWSjN1bJ16rADyZOZTqxfsLcZ5PE6k",
	authDomain: "aircab-1284a.firebaseapp.com",
	projectId: "aircab-1284a",
	storageBucket: "aircab-1284a.firebasestorage.app",
	messagingSenderId: "668643806056",
	appId: "1:668643806056:web:529bbba50c2dc0572ba4dd",
	measurementId: "G-RQZ89RWPZ1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
// export const analytics = getAnalytics(app);
