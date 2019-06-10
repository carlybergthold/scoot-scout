import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import "./Nav.css"
import logo from "./scooter.jpg"

class TopNav extends Component {
    render() {
        return (
            <div id="navBar">
                <img id="mainlogo" src={logo}></img>
                <ul>
                    <li>About</li>
                </ul>
            </div>
            )
    }
}

export default withRouter(TopNav)