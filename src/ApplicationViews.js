import React, { Component } from "react"
import { withRouter, Route } from "react-router-dom"
import ScootMap from "./components/Map/ScootMap";
import Homepage from "./components/Homepage/Homepage";
import Registration from "./components/Registration/Registration";
import SavedLocations from "./components/SavedLocations/SavedLocations";
import API from "./API/apiCalls"


class ApplicationViews extends Component {

  state = {
    startingLat: "",
    startingLng: ""
  }

  componentDidMount() {
    API.getUserLocation()
    .then(user => {
      this.setState({startingLat: user.location.lat, startingLng: user.location.lng})
    })
  }


    render() {
      return(<>
        <Route path="/home/" component={Homepage} />
        {/* <Route path="/map/" component={ScootMap} startingLat={this.state.startingLat} startingLng={this.state.startingLng} /> */}
        <Route path="/map/" render={(props) => {
              return (<ScootMap startingLat={this.state.startingLat} startingLng={this.state.startingLng} {...props} />)}
        } />
        <Route path="/register/" component={Registration} />
        {/* <Route path="/locations/" component={SavedLocations} startingLat={this.state.startingLat} startingLng={this.state.startingLng} /> */}
        <Route path="/locations/" render={(props) => {
              return (<SavedLocations startingLat={this.state.startingLat} startingLng={this.state.startingLng} {...props} />)}
        } />
      </>
      )
    }

}

export default withRouter(ApplicationViews)


