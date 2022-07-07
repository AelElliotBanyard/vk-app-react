import Sidebar from "../function/Sidebar";
import { getDocs, collection } from 'firebase/firestore';
import { auth, db } from '../firebase.config';
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { Link } from 'react-router-dom';

 function Person(props) {
    const [users, setUsers] = useState([])
    const username = props.username;
    const name = username.split(".")[0]
    const lastname = username.split(".")[1];

    useEffect(() => {
        const usersCollectionRef = collection(db, "users");
        const getPersonInfo =  async () => {
            const data = await getDocs(usersCollectionRef)
            setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }

        getPersonInfo();
    }, []);

    const logout = () =>{
        signOut(auth)
        window.location.reload();
    }

    return (
        <div>
            <Sidebar />
            <div>
                <button className="bg-orange-500 px-12 py-1 my-5 rounded-md text-white dark:text-black font-bold fixed top-2 right-5" onClick={() => logout()}><Link to="/vk-app-react/">Logout</Link></button>
            </div>
                {users.map((user) => {
                    if(user.firstname.toLowerCase() === name.toLowerCase() && user.name.toLowerCase() === lastname.toLowerCase()){
                        return (
                            <div className='main ml-28 mt-10 flex flex-col'>
                                <p className='text-3xl font-extrabold mb-5'>{user.firstname} {user.name}</p>
                                <p className='text-2xl font-bold mb-5'>{user.street} {user.number}, {user.areaCode} {user.city}</p>
                            </div>
                        )
                    } else {
                        return <div></div>
                    }
                })}
        </div>

    )
}

export default Person;