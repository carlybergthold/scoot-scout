import React, { Component } from "react"
import { withRouter, Link } from "react-router-dom"
import "./Nav.css"


class TopNav extends Component {

    state = {
        navLink: "log out",
        class: "hidden"
    }

    logout = () => {
        localStorage.removeItem('user');
    }

    login = () => {
        this.props.history.push('/login')
    }

    logInOrOut = () => {
        if (localStorage.getItem('user')) {
            localStorage.removeItem('user');
            this.props.history.push('/home')
            console.log("remove localstorage and redirect to home")
        } else {
            this.props.history.push('/login')
            console.log("redirect to login")
        }
    }

    componentDidMount() {
        if (localStorage.getItem('user')) {
            this.setState(state => ({ navLink: "log out", class: "hidden" }))
            } else {
            this.setState(state => ({ navLink: "log in" , class: "registerlink"}))
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
                        <Link to="/register" className={this.state.class}><li>register</li></Link>
                        <p id="logOut" onClick={this.logInOrOut}>{this.state.navLink}</p>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default withRouter(TopNav)

