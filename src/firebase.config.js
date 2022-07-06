import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC19iPRnCt5tloEK0B0KYaDCSHH70w-3qU",
    authDomain: "vk-app-8400.firebaseapp.com",
    projectId: "vk-app-8400",
    storageBucket: "vk-app-8400.appspot.com",
    messagingSenderId: "370078750720",
    appId: "1:370078750720:web:6695f85d9817c2a9ee60e5",
    measurementId: "G-7P195ZQG7F"
  };
  
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);