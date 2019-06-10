import React, { Component } from "react"
import { withRouter } from "react-router-dom"


class ApplicationViews extends Component {

    state = {
      userLat: "",
      userLng: "",
      limes: [],
      birds: [],
      spins: []
    }


    componentDidMount() {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords)
      })
    }

    render() {
        return (<h1>hello</h1>)
            // <>
            //     <Route exact path="/friends" render={(props) => {
            //        <Friends friends={this.state.friends} {...props} />
            //         }
            //     } />
            // </>
    }

}

export default withRouter(ApplicationViews)
