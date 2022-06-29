import React from "react";
import Sidebar from "./Sidebar";

class Person extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          url: "http://sfba-vkapp-api.herokuapp.com/",
          personInfo: [""],
          tasks: [""],
          functions: [""],
          username: this.props.username,
        }
    }
    componentDidMount(){
        fetch(this.state.url + "/getPersonInfo?username=" + this.state.username)
        .then((Response) => Response.json())
        .then((data) => this.setState({personInfo: data}))
        .catch((error) => error)
        
        fetch(this.state.url + "/getTasks?username=" + this.state.username)
        .then((Response) => Response.json())
        .then((data) => this.setState({tasks: data}))
        .catch((error) => error)

        fetch(this.state.url + "/getFunctions?username=" + this.state.username)
        .then((Response) => Response.json())
        .then((data) => this.setState({functions: data}))
        .catch((error) => error)
    }
    render(){
        return(
                <div>
                    <Sidebar/>
                    <div className="main ml-28 mt-10 flex flex-col">
                        {
                            this.state.personInfo.map((p) =>(
                                <p className="text-3xl font-extrabold mb-5">{p.firstname} {p.surname}, {p.rank}</p>
                            ))
                        }
                        {
                            this.state.personInfo.map((p) =>(
                                <p  className="text-2xl font-bold mb-5">{p.road} {p.number}, {p.areaCode} {p.place}</p>
                            ))        
                        }
                        <p className="text-1xl font-bold mb-3">Aufgaben: </p>
                            {
                                this.state.tasks.map((t) => (
                                        <p className="text-md mb-2"> - {t.name}</p>
                                    )
                                )
                            }
                        <p className="text-1xl font-bold mb-3 mt-3">Funktionen: </p>
                           {
                                this.state.functions.map((f) => (
                                        <p className="text-md mb-2"> - {f.function}</p>
                                    )
                                )
                            }
                    </div>
                </div>
        )
    }
}

export default Person;