import React, { Component } from "react"
import { withRouter, Route } from "react-router-dom"
import API from "./API/apiCalls";
import ScootMap from "./components/Map/ScootMap";
import Homepage from "./components/Homepage/Homepage";


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
      .then(() => API.getSpin())
      .then(r => {
        this.setState({spins: r.data.bikes})
      })
    }

    render() {
      return(<>
        <Route path="/home/" component={Homepage} />
        <Route path="/map/" render={(props) => <ScootMap {...props} userLat={this.state.userLat} userLng={this.state.userLng} spins={this.state.spins} />} />
      </>
      )
    }

}

export default withRouter(ApplicationViews)
