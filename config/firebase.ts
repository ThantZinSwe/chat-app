import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDltVlObISTyTylhBk0JZOuBqbcz6_3Kqw",
  authDomain: "chat-app-9437d.firebaseapp.com",
  projectId: "chat-app-9437d",
  storageBucket: "chat-app-9437d.appspot.com",
  messagingSenderId: "1077281827477",
  appId: "1:1077281827477:web:b22d889ef37bed06fb099c",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
