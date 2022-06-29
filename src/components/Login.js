import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Open from './Open'
import Mine from './Mine'
import Person from './Person'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          authentication: false,
          error: "",
          username: "",
          password: "",
          url: "https://sfba-vkapp-api.herokuapp.com",
        };
        this.handleCheckLogin = this.handleCheckLogin.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }
    
    handleCheckLogin() {
        fetch(
            this.state.url +
            "/authenticate?username=" +
            this.state.username +
            "&password=" +
            this.state.password
        )
          .then((response) => response.text())
          .then((data) => this.setState({ authentication: data }))
          .catch((error) => console.log(error));
        if (this.state.authentication === false) {
          this.setState({ error: "Benutzername oder Passwort falsch" });
          console.log(this.state.authentication);
        }
    }
    
    handleChangeUsername(e) {
        this.setState({ username: e.target.value });
    }
    
    handleChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    render() {
        if (this.state.authentication) {
            return (
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Open/>}/>
                        <Route path='open' element={<Open/>}></Route>
                        <Route path='mine' element={<Mine username={this.state.username}/>}></Route>
                        <Route path='person' element={<Person username={this.state.username}/>}></Route>
                    </Routes>
                </BrowserRouter>
            );
        } else {
            return (
                <div className="flex flex-col items-center justify-center h-screen w-screen dark:bg-black">
                    <p className="text-orange-500 font-extrabold text-5xl mb-16">VKAW</p>
                    <input type="text" placeholder="Benutzername" className="input-container" onChange={this.handleChangeUsername}/>
                    <input type="password" placeholder="Passwort" className="input-container" onChange={this.handleChangePassword}/>
                    <button className="bg-orange-500 px-16 py-1 my-5 rounded-md text-white dark:text-black font-bold" onClick={this.handleCheckLogin}>Login</button>
                </div>
            )
        }
    }
}

export default Login;