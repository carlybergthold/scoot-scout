import React, { Component } from "react"
import ApplicationViews from "./ApplicationViews"
import { withRouter } from 'react-router'
import TopNav from "./components/Nav/Nav";
import Footer from "./components/Nav/Footer";



class ScootApp extends Component {
    render() {
        return (
            <>
                <TopNav />
                <ApplicationViews />
                <Footer />
            </>
        )
    }
}

export default withRouter(ScootApp)