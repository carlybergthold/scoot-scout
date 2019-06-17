import React, { Component } from "react"
import { withRouter, Link } from "react-router-dom"
import "./Homepage.css"
import scooter3 from "./scooter3.png"



class Homepage extends Component {

    render() {
        return (
            <div id="homeContainer">
                <img src={scooter3} id="splashLogo"></img>
                <h1>Scoot Scout</h1>
                {/* <h2>Witty Header</h2>
                <ul id="homeUL">
                    <li>Lime</li>
                    <li>Bird</li>
                    <li>Spin</li>
                </ul> */}
                <button id="splashBtn"><Link to="/map/" className="btnLink">Find Scooters!</Link></button>
            </div>
        )
    }
}

export default withRouter(Homepage)