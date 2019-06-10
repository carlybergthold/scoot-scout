import React, { Component } from "react"
import ApplicationViews from "./ApplicationViews"
import { withRouter, Route } from 'react-router'

class ScootApp extends Component {
    render() {
        return (
            <>
                {/* <Nav /> */}
                <ApplicationViews />
            </>
        )
    }
}

export default withRouter(ScootApp)