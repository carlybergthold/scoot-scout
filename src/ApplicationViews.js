import React, { Component } from "react"
import { withRouter, Route } from "react-router-dom"
import API from "./API/apiCalls";
import ScootMap from "./components/Map/ScootMap";


class ApplicationViews extends Component {

    state = {
      userLat: "",
      userLng: "",
      limes: [],
      birds: [],
      spins: []
    }


    componentDidMount() {
      API.getUserLocation()
      .then(user => {
        this.setState({userLat: user.location.lat, userLng: user.location.lng})
      })
    }

    getSpin = () => {
      API.getSpin()
      .then(r => {
        this.setState({spins: r.data.bikes})
      })
    }

    render() {
      return(<>
        <h1>homepage</h1>
        <button>Find a Scooter</button>
        {/* <Route path="/map/" component={ScootMap} /> */}
        <ScootMap />
      </>
      )
    }

}

export default withRouter(ApplicationViews)
