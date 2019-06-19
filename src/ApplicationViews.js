import React, { Component } from "react"
import { withRouter, Route, Redirect } from "react-router-dom"
import ScootMap from "./components/Map/ScootMap";
import Homepage from "./components/Homepage/Homepage";
import Registration from "./components/Registration/Registration";
import SavedLocations from "./components/SavedLocations/SavedLocations";
import API from "./API/apiCalls"
import Login from "./components/Registration/Login";


class ApplicationViews extends Component {

  state = {
    startingLat: "",
    startingLng: "",
    popup: false,
    address: "",
    userId: ""
  }

  getAddress = (lat, lng, address) => {
    this.setState({startingLat: lat, startingLng: lng, popup: true, address: address})
  }

  login = (email, password) => {
    return fetch(`http://localhost:8088/users?email=${email}`)
      .then(res => res.json())
      .then(matchingUsers => {
        if (!matchingUsers.length) {
          alert('No user exists with that email address');
          return;
        }
        else if (matchingUsers[0].password !== password) {
          alert('wrong password');
        }
        else {
        const user = matchingUsers[0];
        localStorage.setItem('user', JSON.stringify(user));
        this.setState({userId: user.id});
        this.props.history.push("/map")
      }
      });
  }


  componentDidMount() {
    const sessionUser = localStorage.getItem('user')
    const user = JSON.parse(sessionUser);

    if (user) {
      this.setState({userId: user.id})
    } else {
      console.log("no user in session storage (from appviews)")
    }
    API.getUserLocation()
    .then(user => {
      this.setState({startingLat: user.location.lat, startingLng: user.location.lng})
    })
  }

    render() {
      return(<>
        <Route path="/home/" component={Homepage} />
        <Route path="/map/" render={(props) => <ScootMap {...props} startingLat={this.state.startingLat} startingLng={this.state.startingLng} popup={this.state.popup} address={this.state.address} userId={this.state.userId} />}
        />
        <Route path="/register/" render={(props) => <Registration {...props} userId={this.state.userId} />} />
        <Route path="/login/" render={(props) => <Login {...props} userId={this.state.userId} login={this.login} />} />
        <Route path="/locations/" render={(props) => <SavedLocations {...props} startingLat={this.state.startingLat} startingLng={this.state.startingLng} getAddress={this.getAddress} userId={this.state.userId} />}
        />
      </>
      )
    }

}

export default withRouter(ApplicationViews)


