import React from "react";
import Sidebar from "./Sidebar";

class Home extends React.Component {
    render(){
        return(
                <div>
                    <Sidebar/>
                    <div className="main">
                        <h1>Wilkommen</h1>
                    </div>
                </div>
        )
    }
}

export default Home;