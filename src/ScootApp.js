import React, { Component } from "react"
import ApplicationViews from "./ApplicationViews"
import TopNav from "./components/Nav/Nav";
import { withRouter } from "react-router-dom"
import API from "./API/apiCalls"



class ScootApp extends Component {

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

    // login = (email, password) => {
    //   this.props.verifyUser(email, password)
    //   .then(() => {
    //   if (this.props.userId !== "") {
    //      this.props.history.push("/map")
    //   }
    //   })
    //   }

    verifyUser = (email, password) => {
         return fetch(`http://localhost:8088/users?email=${email}`)
          .then(res => res.json())
          .then(matchingUsers => {
            if (!matchingUsers.length) {
              alert('No user exists with that email address');
            }
            else if (matchingUsers[0].password !== password) {
              alert('wrong password');
            }
            else {
              const user = matchingUsers[0];
              localStorage.setItem('user', JSON.stringify(user));
              this.setState({userId: user.id}, () => this.props.history.push('/map'));
            }
          })
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
        return (
            <>
                <TopNav userId={this.state.userId} startingLat={this.state.startingLat} startingLng={this.state.startingLng} popup={this.state.popup} address={this.state.address} />
                <ApplicationViews userId={this.state.userId} startingLat={this.state.startingLat} startingLng={this.state.startingLng} popup={this.state.popup} address={this.state.address} verifyUser={this.verifyUser} getAddress={this.getAddress} />
            </>
        )
    }
}

export default withRouter(ScootApp)