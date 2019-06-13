import React, { Component } from "react"
import { withRouter, Link } from "react-router-dom"
import logo from "./scooter.jpg"
import "./Nav.css"


class Footer extends Component {
    render() {
        return (
            <div id="footer">
                <button id="addLocationBtn">Add a Location</button>
            </div>
            )
    }
}

export default withRouter(Footer)