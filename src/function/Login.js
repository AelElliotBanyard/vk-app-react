import { signInWithEmailAndPassword} from 'firebase/auth';
import { useRef, useState } from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from '../function/Home'
import Open from '../function/Open'
import Mine from '../function/Mine'
import Person from '../function/Person'
import {auth} from '../firebase.config'

function Login() {

    const [username , setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState(false);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    function loginAuth(){
        setUsername(usernameRef.current.value);
        setPassword(passwordRef.current.value);
        const email = username + "@vkaw.ch";
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setValidation(true)
            })
            .catch((error) => {
                setValidation(false);
                const errorCode = error.code;
                console.log("Error: "+errorCode);
                const errorMessage = error.message;
                console.log("Because: "+ errorMessage);
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

export default Login;
