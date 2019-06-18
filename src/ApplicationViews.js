import React, { Component } from "react"
import { withRouter, Route } from "react-router-dom"
import ScootMap from "./components/Map/ScootMap";
import Homepage from "./components/Homepage/Homepage";
import Registration from "./components/Registration/Registration";
import SavedLocations from "./components/SavedLocations/SavedLocations";


class ApplicationViews extends Component {

  state = {
    user: "",
    SavedLocations: []
  }

  // setUserState = () => {
  //   API.get(path, id)
  // }

    render() {
      return(<>
        <Route path="/home/" component={Homepage} />
        <Route path="/map/" component={ScootMap} />
        <Route path="/register/" component={Registration} />
        <Route path="/locations/" component={SavedLocations} />
      </>
      )
    }

}

export default withRouter(ApplicationViews)
