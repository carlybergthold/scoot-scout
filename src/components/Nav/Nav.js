import React, { Component } from "react"
import { withRouter, Link } from "react-router-dom"
import "./Nav.css"


class TopNav extends Component {

    render() {
        return (
            <nav role='navigation'>
                <div id="menuToggle">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul id="menu">
                        <Link to="/home"><li>Home</li></Link>
                        <Link to="/map"><li>Find A Scooter</li></Link>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default withRouter(TopNav)

