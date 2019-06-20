import React, { Component } from "react"
import { withRouter, Link } from "react-router-dom"
import "./Homepage.css"
import scooter3 from "./scooter3.png"



class Homepage extends Component {

    render() {
        return (
            <div id="homeContainer">
                <img src={scooter3} id="splashLogo" alt="Scoot-Scout-logo"></img>
                <h1>scoot scout</h1>
                <button id="splashBtn"><Link to="/map/" className="btnLink">Find Scooters!</Link></button>
                <div className="actionLinks">
                    <Link to="/register/">register&nbsp;&nbsp;| </Link>
                    <Link to="/login/">&nbsp;&nbsp;log in</Link>
                </div>
            </div>
        )
    }
}

export default withRouter(Homepage)