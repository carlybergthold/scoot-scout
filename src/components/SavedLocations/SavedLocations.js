import React, { Component } from "react"
import { withRouter, Link } from 'react-router-dom'
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
                    {this.state.savedLocations.map(location => {return <section key={location.id} className={location.location}><p>{location.address}</p>
                    <button className="locationOpenBtn">
                        <Link
                        to='/map' onClick={() => this.props.getAddress(location.lat, location.lng)}>Open in Map</Link>
                    </button>
                    </section>})}
                </div>
            </div>
        )
    }
}

export default withRouter(SavedLocations)