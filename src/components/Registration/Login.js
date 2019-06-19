import React, { Component } from "react"
import { withRouter } from 'react-router'
import "./Registration.css"
import scooter3 from "../Homepage/scooter3.png"


class Login extends Component {

    state = {
        email: "",
        password: ""
    }

    handleChange = (e) =>{
        this.setState({[e.target.id]: e.target.value})
    }

    render() {
        return (
            <div id="registerContainer">
                <img src={scooter3} className="topLogo" alt="Scoot-Scout-logo"></img>
                <h1>log in</h1>
                <form id="logInForm">
                    <label>Email</label>
                    <input type="email" placeholder="Email" id="email" onChange={this.handleChange.bind(this)}></input>
                    <label>Password</label>
                    <input type="password" placeholder="Password" id="password" onChange={this.handleChange.bind(this)}></input>
                    <button type="submit" className="submitBtn"
                    onClick={() => this.props.login(this.state.email, this.state.password)}
                    >Submit</button>
                </form>
            </div>
        )
    }
}

export default withRouter(Login)