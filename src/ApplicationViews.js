import React, { Component } from "react"
import { withRouter, Route } from "react-router-dom"
import ScootMap from "./components/Map/ScootMap";
import Homepage from "./components/Homepage/Homepage";
import Registration from "./components/Registration/Registration";


class ApplicationViews extends Component {

    render() {
      return(<>
        <Route path="/home/" component={Homepage} />
        <Route path="/map/" component={ScootMap} />
        <Route path="/register/" component={Registration} />
      </>
      )
    }

}

export default withRouter(ApplicationViews)
