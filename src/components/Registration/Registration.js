import React, { Component } from "react"
import { withRouter } from 'react-router'
import "./Registration.css"
import scooter3 from "../Homepage/scooter3.png"
import API from "../../API/apiCalls";


class Registration extends Component {

    state = {
        username: "",
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
                <h1>register</h1>
                <form id="registerForm">
                    <label>Username</label>
                    <input type="text" placeholder="Username" id="username" onChange={this.handleChange.bind(this)}></input>
                    <label>Email</label>
                    <input type="email" placeholder="Email" id="email" onChange={this.handleChange.bind(this)}></input>
                    <label>Password</label>
                    <input type="password" placeholder="Password" id="password" onChange={this.handleChange.bind(this)}></input>
                    <button type="submit" className="submitBtn"
                    onClick={(e) => {
                        e.preventDefault()
                        this.props.addUser(this.state.username, this.state.email, this.state.password) }
                    }
                    >submit</button>
                </form>
            </div>
        )
    }
}

export default withRouter(Registration)