import { collection, getDocs } from "firebase/firestore";
import {db} from '../firebase.config'
import { useEffect, useState } from "react";
import Sidebar from "../function/Sidebar";

function Open(){

    const [deployments, setDeployments] = useState([])

    useEffect(() => {
        const openDeploymentsRef = collection(db, "einsaetze")
        const getOpenDeployments = async () => {
            const data = await getDocs(openDeploymentsRef)
            setDeployments(data.docs.map((doc) => ({...doc.data()})))
            console.log(data);
        }

        getOpenDeployments();
    }, [])


    return(
        <div>
            <Sidebar/>
            <div className="main flex flex-col">
                <h1 className=" ml-10 mt-5 mb-10 dark:text-white text-black text-3xl font-bold">Freie Einsätze</h1>
                {deployments.map((deployment) => {
                    if(deployment.complete === false){
                        return(
                            <div className="card">
                                <h1>{deployment.name}</h1>
                                <p>{deployment.date}, {deployment.timeStart.toString()}-{deployment.timeEnd.toString()}</p>
                                <p>EL: {deployment.einsatzLeiter}</p>
                                <p>{deployment.amountVK} VK: </p>
                                <ul>
                                    {deployment.vk.map((vk) => 
                                        <li>{vk}</li>
                                    )}
                                </ul>
                            </div>
                        )
                    }else{
                        return null;
                    }
                })}
            </div>
        </div>
    )

}

export default Open;