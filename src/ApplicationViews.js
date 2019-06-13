import React, { Component } from "react"
import { withRouter, Route } from "react-router-dom"
import ScootMap from "./components/Map/ScootMap";
import Homepage from "./components/Homepage/Homepage";


class ApplicationViews extends Component {

    render() {
      return(<>
        <Route path="/home/" component={Homepage} />
        <Route path="/map/" component={ScootMap} />
      </>
      )
    }

}

export default withRouter(ApplicationViews)
