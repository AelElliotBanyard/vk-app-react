import Sidebar from "./Sidebar";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase.config'
import { useEffect, useState } from "react";

function Mine(props) {

    const [deployments, setDeployments] = useState([])
    var username = props.username;
    const name = username.split(".")[0] + " " + username.split(".")[1]

    useEffect(() => {
        const openDeploymentsRef = collection(db, "einsaetze")
        const getOpenDeployments = async () => {
            const data = await getDocs(openDeploymentsRef)
            setDeployments(data.docs.map((doc) => ({ ...doc.data() })))
            console.log(data);
        }

        getOpenDeployments();
    }, [])


    return (
        <div>
            <Sidebar />
            <div className="main flex flex-col">
                <h1 className=" ml-10 mt-5 mb-10 dark:text-white text-black text-3xl font-bold">Meine Einsätze</h1>
                {deployments.map((deployment) => {
                    if (deployment.einsatzLeiter.toLowerCase() === name) {
                        return (
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
                    } else {
                        return null;
                    }
                })}
                {deployments.map((deployment) => {
                    var count = 0;
                    deployment.vk.map((vkName) => {
                        if (vkName.toLowerCase() === name) {
                            return (
                                count += 1
                            )
                        } else {
                            return null;
                        }
                    })
                    if (count >= 1){
                        return (
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
                    }else {
                        return null
                    }
                })}
            </div>
        </div>
    )
}

export default Mine