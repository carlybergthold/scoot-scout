import React, { Component } from "react"
import { withRouter, Link } from 'react-router-dom'
import "./SavedLocations.css"
import scooter3 from "../Homepage/scooter3.png"
import API from "../../API/apiCalls";


class SavedLocations extends Component {

    state = {
        savedLocations: "",
        username: ""
    }


    componentDidMount() {
        if (localStorage.getItem('user')) {
            const sessionUser = localStorage.getItem('user')
            const user = JSON.parse(sessionUser);
            const id = user.id;
            API.getLocations(id).then(results => this.setState({savedLocations: results.savedLocations}))
            .then(() => API.getUsername(id).then(r => this.setState({username: r.username})))
        }
    }

    deleteLocation = (savedLocations, id) => {
        const sessionUser = localStorage.getItem('user')
        const user = JSON.parse(sessionUser);
        const userId = user.id;

        API.delete(savedLocations, id).then(results => this.setState({savedLocations: results.savedLocations}))
        .then(() => API.getLocations(userId))
        .then(results => this.setState({savedLocations: results.savedLocations}))
    }

    render() {
        return (
                <div id="locations">
                    <img src={scooter3} className="topLogo" alt="Scoot-Scout-logo"></img>
                        {
                            this.state.username ?
                            <h1 id="locationsHeader">{this.state.username}'s locations</h1>
                            : <h1 id="locationsHeader">my locations</h1>
                        }
                        {
                            this.state.savedLocations ?
                            this.state.savedLocations.map(location => {return <section key={location.id} className={location.location}><p>{location.address}</p>
                            <span className="locationDelete" onClick={() => this.deleteLocation("savedLocations", location.id)}>x</span>
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