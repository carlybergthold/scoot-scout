import React, { Component } from "react"
import { withRouter, Link } from "react-router-dom"
import "./Nav.css"
import logo from "./scooter.jpg"

class TopNav extends Component {
    render() {
        return (
            <div id="navBar">
                <img id="mainlogo" src={logo} alt="scoot-scout-logo"></img>
                <ul id="navUL">
                    <Link className="navLink" to="/home">Home</Link>
                    <Link className="navLink" to="/map">Find a Scooter</Link>
                </ul>
            </div>
            )
    }
}

export default withRouter(TopNav)