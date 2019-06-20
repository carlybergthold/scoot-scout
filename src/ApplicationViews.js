import React, { Component } from "react"
import { withRouter, Route } from "react-router-dom"
import ScootMap from "./components/Map/ScootMap";
import Homepage from "./components/Homepage/Homepage";
import Registration from "./components/Registration/Registration";
import SavedLocations from "./components/SavedLocations/SavedLocations";
import Login from "./components/Registration/Login";


class ApplicationViews extends Component {

    render() {
      return(<>
        <Route path="/home" component={Homepage} />
        <Route path="/map" render={(props) => <ScootMap {...props} startingLat={this.props.startingLat} startingLng={this.props.startingLng} popup={this.props.popup} address={this.props.address} userId={this.props.userId} />}
        />
        <Route path="/register" render={(props) => <Registration {...props} userId={this.props.userId} />} />
        <Route path="/login" render={(props) => <Login {...props} userId={this.props.userId} verifyUser={this.props.verifyUser} />} />
        <Route path="/locations" render={(props) => <SavedLocations {...props} startingLat={this.props.startingLat} startingLng={this.props.startingLng} getAddress={this.props.getAddress} userId={this.props.userId} />}
        />
      </>
      )
    }

}

export default withRouter(ApplicationViews)


