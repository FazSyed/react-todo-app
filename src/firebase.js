import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8_vFQDj1B0o74WhDWcGZHWYAPsLEJb2M",
  authDomain: "react-todo-app-6e201.firebaseapp.com",
  projectId: "react-todo-app-6e201",
  storageBucket: "react-todo-app-6e201.appspot.com",
  messagingSenderId: "704754748742",
  appId: "1:704754748742:web:ae4678c207c74121ad6947",
  measurementId: "G-PS7LQYEW88",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };
