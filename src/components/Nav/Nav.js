import React, { Component } from "react"
import { withRouter, Link } from "react-router-dom"
import "./Nav.css"


class TopNav extends Component {

    state = {
        hidden: false
    }

    toggle = () => {
        const menu = document.querySelector('nav');
        menu.classList.add("hidden");
        // this.setState(state => ({ hidden: !state.hidden }));
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
                        <Link to="/home" onClick={this.toggle}><li>Home</li></Link>
                        <Link to="/map" onClick={this.toggle}><li>Find A Scooter</li></Link>
                        <li>Your Locations</li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default withRouter(TopNav)

