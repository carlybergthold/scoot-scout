import React, { Component } from "react"
import { withRouter, Link } from "react-router-dom"
import "./Nav.css"


class TopNav extends Component {

    state = {
        idk: ""
    }

    check = () => {
        document.getElementById("checkbox").checked = false;
        this.setState({idk: "ok"})
    }

    render() {
        return (
            <nav role='navigation'>
                <div id="menuToggle">
                    <input type="checkbox" id="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul id="menu">
                        <Link to="/home"><li onClick={this.check}>home</li></Link>
                        <Link to="/map"><li onClick={this.check}>scoot map</li></Link>
                        <Link to="/locations"><li onClick={this.check}>my locations</li></Link>
                        <Link to="/register" className={this.props.class}><li onClick={this.check}>register</li></Link>
                        <p id="logOut" onClick={this.props.logInOrOut}><li onClick={this.check}>{this.props.navLink}</li></p>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default withRouter(TopNav)

