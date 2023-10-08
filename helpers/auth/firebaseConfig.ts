import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA66dkAChee4nJ5ULReNyzvfoSffsyt4mg",
  authDomain: "weather112.firebaseapp.com",
  databaseURL: "https://weather112.firebaseio.com",
  projectId: "weather112",
  storageBucket: "weather112.appspot.com",
  messagingSenderId: "902000084898",
  appId: "1:902000084898:web:d4d78b96f2a586fc7dd4fb",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
