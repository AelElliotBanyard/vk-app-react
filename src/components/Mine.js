import React from "react";
import Sidebar from "./Sidebar";

class Mine extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          url: "https://sfba-vkapp-api.herokuapp.com",
          deployments: [""],
          username: this.props.username,
          user: this.props.user,
          name: "",
          surname: ""
        }
    }
componentDidMount(){    
    fetch(this.state.url + "/getTrafficWardenDeployments?username=" + this.state.username)
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
                                <p>{d.location}</p>
                            </div>
                        )
                        )}
                    </div>
                </div>
        )
    }
}

export default Mine;