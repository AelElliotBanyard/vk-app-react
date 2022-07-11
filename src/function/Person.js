import Sidebar from "../function/Sidebar";
import { getDocs, collection } from 'firebase/firestore';
import { db, auth } from '../firebase.config';
import { useEffect, useState } from "react";
import { updatePassword } from "firebase/auth";

function Person(props) {
    const [users, setUsers] = useState([])
    const username = props.username;
    const name = username.split(".")[0]
    const lastname = username.split(".")[1];
    const [success, setSuccess] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const usersCollectionRef = collection(db, "users");
        const getPersonInfo = async () => {
            const data = await getDocs(usersCollectionRef)
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }

        getPersonInfo();
    }, []);

    const changePassword = () => {
        setError("")
        let oldPw = document.getElementById('oldPw').value
        let newPw = document.getElementById('newPw').value
        let newPwC = document.getElementById('newPwC').value
        if (newPw !== newPwC) {
            setError('Passwörter stimmen nicht überein')
            setSuccess(false);
        } else if (newPw === oldPw) {
            setError('Das neue Passwort darf nicht gleich sein wie das alte')
            setSuccess(false);
        } else if (newPw === newPwC && newPw !== oldPw) {
            const user = auth.currentUser;
            updatePassword(user, newPw).then(() => setSuccess(true)).catch((e) => {console.log(e); setSuccess(false)})
        }

    }

    const SuccessForm = () => {
        return (
            <div>
                <div>
                    <button className="fixed right-5 top-5 p-0 m-0 font-bold text-2xl text-gray-500 opacity-70" onClick={() => setShowForm(false)}>X</button>
                </div>
                <div className="flex flex-col space-y-5">
                    <h1 className="text-xl font-bold mt-16">Passwort ändern</h1>
                    <p>Passwort erfolgreich geändert</p>
                </div>
            </div>
        )
    }

    const PasswordForm = () => {
        return (
            <div>
                <div>
                    <button className="fixed right-5 top-5 p-0 m-0 font-bold text-2xl text-gray-500 opacity-70" onClick={() => setShowForm(false)}>X</button>
                </div>
                <div className="flex flex-col space-y-5">
                    <h1 className="text-xl font-bold mt-16">Passwort ändern</h1>
                    <div>
                        <p>altes Passwort:</p>
                        <input id="oldPw" type="password" className="input-container dark:bg-orange-900 text-left"></input>
                    </div>
                    <div>
                        <p>neues Passwort:</p>
                        <input id="newPw" type="password" className="input-container dark:bg-orange-900 text-left"></input>
                    </div>
                    <div>
                        <p>neues Passwort bestätigen:</p>
                        <input id="newPwC" type="password" className="input-container dark:bg-orange-900 text-left"></input>
                    </div>
                    <button className="bg-orange-500 mt-5 py-1 rounded-md" onClick={() => changePassword()}>Passwort ändern</button>
                    <p className="text-red-500 font-bold">{error}</p>
                </div>
            </div>
            
        )
    }


    return (
        <div>
            <Sidebar />
            {users.map((user) => {
                if (user.firstname.toLowerCase() === name.toLowerCase() && user.name.toLowerCase() === lastname.toLowerCase()) {
                    return (
                        <div className='main ml-28 mt-10 flex flex-col'>
                            <p className='text-3xl font-extrabold mb-5'>{user.firstname} {user.name}</p>
                            <p className='text-2xl font-bold mb-5'>{user.street} {user.number}, {user.areaCode} {user.city}</p>
                        </div>
                    )
                } else {
                    return null;
                }
            })}
            <div className="ml-28">
                <button onClick={() => setShowForm(true)} className="bg-orange-500 px-16 py-1 my-5 rounded-md text-white dark:text-black font-bold">Passwort ändern</button>
            </div>
            <div className={`form ${showForm ? "form-on" : "form-off"}`} >
                {success ? <SuccessForm/> : <PasswordForm/>}
            </div>
        </div>

    )
}

export default Person;