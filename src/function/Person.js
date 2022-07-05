import Sidebar from "../components/Sidebar";
import { getFirestore, getDoc, doc } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

export default function Person() {

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
    
    const auth = getAuth(firebaseApp);

    const db = getFirestore(firebaseApp);

    const getData = () => {
        auth.onAuthStateChanged(user => {
            if (user) {
                const split = user.email.split(".");
                const ref = doc(db, 'users', split[0].toString())
                getDoc(ref)
                    .then(
                       (doc) => {
                            console.log(doc);
                            return (
                                <div className='main ml-28 mt-10 flex flex-col'>
                                    <p className='text-3xl font-extrabold mb-5'>{doc.firstname} {doc.name}</p>
                                    <p className='text-2xl font-bold mb-5'>{doc.street} {doc.number}, {doc.areaCode} {doc.city}</p>
                                </div>
                            )
                        }
                    )
            }
        })
    }


    return (
        <div>
            <Sidebar />
            {
                getData()
            }
        </div>

    )
}