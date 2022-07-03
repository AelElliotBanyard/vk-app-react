import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { useRef, useState } from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from '../components/Home'
import Open from '../components/Open'
import Mine from '../components/Mine'
import Person from '../components/Person'

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
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default function Login() {

    const [username , setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState(false);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    function loginAuth(){
        setUsername(usernameRef.current.value);
        setPassword(passwordRef.current.value);
        const email = username + "@vkaw.ch";
        const user = null;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setValidation(true)
                user = userCredential.user;
            })
            .catch((error) => {
                setValidation(false);
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    if (validation === true) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/vk-app-react/' element={<Home/>}/>
                    <Route path='/vk-app-react/open' element={<Open/>}></Route>
                    <Route path='/vk-app-react/mine' element={<Mine username={username}/>}></Route>
                    <Route path='/vk-app-react/person' element={<Person username={username}/>}></Route>
                    <Route path='/vk-app-react/*' element={<Navigate to="/vk-app-react/" replace />}/>
                </Routes>
            </BrowserRouter>
        );
    } else {
        return (
            <div className="flex flex-col items-center justify-center h-screen w-screen dark:bg-black">
                <p className="text-orange-500 font-extrabold text-5xl mb-16">VKAW</p>
                <input ref={usernameRef} type="text" placeholder="Benutzername" className="input-container"/>
                <input ref={passwordRef} type="password" placeholder="Passwort" className="input-container"/>
                <button className="bg-orange-500 px-16 py-1 my-5 rounded-md text-white dark:text-black font-bold" onClick={loginAuth}>Login</button>
            </div>
        )
    }
}

