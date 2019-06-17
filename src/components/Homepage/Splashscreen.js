import React, { Component } from "react"
import "./Homepage.css"
import scooter1 from "./scooter1.jpg"
import scooter2 from "./scooter2.png"
import scooter3 from "./scooter3.png"


class Splashscreen extends Component {

    render() {
        return (
            <div id="splashscreen">
                <img src={scooter3} id="splashLogo"></img>
            </div>
        )
    }
}

export default Splashscreen