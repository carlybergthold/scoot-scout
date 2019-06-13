import React, { Component } from "react"
import { withRouter, Link } from "react-router-dom"
import "./Homepage.css"


class Homepage extends Component {


    // ok = () => {
    //     navigator.geolocation.getCurrentPosition()
    // }

    render() {
        return (
            <div id="homeContainer">
                <h1>Scoot Scout</h1>
                <h2>Witty Header</h2>
                <ul id="homeUL">
                    <li>Lime</li>
                    <li>Bird</li>
                    <li>Spin</li>
                </ul>
                <button><Link to="/map/" className="btnLink">Find Scooters!</Link></button>
            </div>
        )
    }
}

export default withRouter(Homepage)