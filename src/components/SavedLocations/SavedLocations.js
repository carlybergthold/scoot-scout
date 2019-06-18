import React, { Component } from "react"
import { withRouter } from 'react-router'
import "./SavedLocations.css"
import scooter3 from "../Homepage/scooter3.png"
import API from "../../API/apiCalls";


class SavedLocations extends Component {

    state = {
        savedLocations: []
    }

    componentDidMount() {
        API.getLocations(1).then(results => this.setState({savedLocations: results.savedLocations}))
    }

    render() {
        return (
            <div id="SavedLocationsContainer">
                <img src={scooter3} className="topLogo"></img>
                <h1>My Locations</h1>
                <div id="locations">
                    {this.state.savedLocations.map(location => {return <section><p>{location.address}</p><button className="locationOpenBtn">Open in Map</button></section>})}
                </div>
            </div>
        )
    }
}

export default withRouter(SavedLocations)