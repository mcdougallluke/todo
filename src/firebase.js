import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBU06z-HQgKD6kOyu67JSrTFFlfP3eawOE",
  authDomain: "todo-app-2-7ef26.firebaseapp.com",
  projectId: "todo-app-2-7ef26",
  storageBucket: "todo-app-2-7ef26.appspot.com",
  messagingSenderId: "580107915135",
  appId: "1:580107915135:web:c449c3f38073cd6a8b944a"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)