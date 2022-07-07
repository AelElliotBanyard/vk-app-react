import Sidebar from "../function/Sidebar";
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useEffect, useState } from "react";

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

    return (
        <div>
            <Sidebar />
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