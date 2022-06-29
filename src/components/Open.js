import React from "react";
import Sidebar from "./Sidebar";

class Open extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          url: "http://sfba-vkapp-api.herokuapp.com",
          deployments: [""],
        }
    }

    componentDidMount(){
        fetch(this.state.url + "/uncompleteDeployments")
        .then((Response) => Response.json())
        .then((data) => this.setState({deployments: data}))
        .catch((error) => error)
    }

    render(){
        return(
                <div>
                    <Sidebar/>
                    <div className="main">
                        {this.state.deployments.map((d) => (
                            <div className="card">
                                <h1>{d.name}</h1>
                                <p>{d.timeStart}-{d.timeEnd}</p>
                                <p>EL: {d.operationsManager}</p>
                                <p>VK: {d.trafficWardens}</p>
                            </div>
                        )
                        )}
                    </div>
                </div>
        )
    }
}

export default Open;