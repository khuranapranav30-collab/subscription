import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBEJB4D2bwWGEapNpc6IwS2-52oJhPgtJY",
  authDomain: "pranav-database.firebaseapp.com",
  projectId: "pranav-database",
  storageBucket: "pranav-database.firebasestorage.app",
  messagingSenderId: "259892820912",
  appId: "1:259892820912:web:12c4409fcef3978ff1f475"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);