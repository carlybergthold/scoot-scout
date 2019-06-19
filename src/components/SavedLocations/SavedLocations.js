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
        const userId = this.props.userId;
        console.log(userId)
        API.getLocations(userId).then(results => this.setState({savedLocations: results.savedLocations}))
    }

    render() {
        return (
                <div id="locations">
                    <img src={scooter3} className="topLogo" alt="Scoot-Scout-logo"></img>
                        <h1 id="locationsHeader">my locations</h1>
                        {
                            this.state.savedLocations ?
                            this.state.savedLocations.map(location => {return <section key={location.id} className={location.location}><p>{location.address}</p>
                            <div className="btnContainer">
                            <button className="locationOpenBtn">
                                <Link to='/map' onClick={() => this.props.getAddress(location.lat, location.lng, location.address)}>Open in Map</Link>
                            </button>
                            </div>
                            </section>
                            })
                            : <section><p>You have no locations saved!</p>
                            <div className="btnContainer">
                            <button className="locationOpenBtn">
                                <Link to='/map'>Go to Scoot Map</Link>
                            </button>
                            </div>
                            </section>
                        }
                </div>
        )
    }
}

export default withRouter(SavedLocations)