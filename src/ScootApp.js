import React, { Component } from "react"
import ApplicationViews from "./ApplicationViews"
import { withRouter } from 'react-router'
import TopNav from "./components/Nav/Nav";


class ScootApp extends Component {
    render() {
        return (
            <>
                <TopNav />
                <ApplicationViews />
            </>
        )
    }
}

export default withRouter(ScootApp)