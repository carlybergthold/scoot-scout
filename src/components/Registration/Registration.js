import React, { Component } from "react"
import { withRouter } from 'react-router'
import "./Registration.css"
import scooter3 from "../Homepage/scooter3.png"


class Registration extends Component {

    state = {
        user: false,
        text: "Register"
    }

    setStorage = () => {
        window.sessionStorage.getItem("registerOrLogin");
    }

    toggle = () => {
        if (this.state.user) {
          this.setState(state => ({ text: "Log In" }))
          return <button id="loginBtn">Login</button>
        } else {
          this.setState(state => ({ text: "Register" }))
          return <button id="registerBtn">Register new account</button>
        }
    }

    // toggleButton = () => {
    //    if (registerButton.classList.contains("welcome-header-active")) {
    //         window.sessionStorage.setItem("registerOrLogin", "login");

    //     } else {
    //         window.sessionStorage.setItem("registerOrLogin", "register");
    //     }
    // }

    render() {
        return (
            <div id="registerContainer">
                <img src={scooter3} className="topLogo"></img>
                <h1>register</h1>
                <form id="registerForm">
                    {this.toggle}
                    <label for="name">Username</label>
                    <input type="text" placeholder="Username" id="inputUsername"></input>
                    <label for="password">Password</label>
                    <input type="password" placeholder="Password" id="inputPassword"></input>
                    <label for="email">Email Address</label>
                    <input type="email" placeholder="Email Address" id="inputEmail"></input>
                    <button type="submit" id="submitBtn">Submit</button>
                </form>
            </div>
        )
    }
}

export default withRouter(Registration)