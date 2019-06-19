import React, { Component } from "react"
import { withRouter, Link } from "react-router-dom"
import "./Nav.css"


class TopNav extends Component {

    state = {
        navLink: "log out"
    }

    logout = () => {
        localStorage.removeItem('user');
    }

    componentDidMount() {
        if (localStorage.getItem('user')) {
            this.setState(state => ({ navLink: "log out" }))
            } else {
            this.setState(state => ({ navLink: "log in" }))
        }
    }

    render() {
        return (
            <nav role='navigation'>
                <div id="menuToggle">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul id="menu">
                        <Link to="/home"><li>home</li></Link>
                        <Link to="/map"><li>scoot map</li></Link>
                        <Link to="/locations"><li>my locations</li></Link>
                        <Link to="/register"><li>register</li></Link>
                        <p id="logOut" onClick={this.logout}>{this.state.navLink}</p>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default withRouter(TopNav)

