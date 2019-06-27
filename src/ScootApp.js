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
        userId: "",
        navLink: "log out",
        class: "hidden"
    }

    getAddress = (lat, lng, address) => {
        this.setState({startingLat: lat, startingLng: lng, popup: true, address: address})
    }

    addUser = (username, email, password) => {
      let userObj = {
          username: username,
          email: email,
          password: password
      }
      API.post("users", userObj)
      .then(newUser => {
          localStorage.setItem('user', JSON.stringify(newUser));
          this.setState({userId: newUser.id, navLink: "log out" , class: "hidden"}, () =>
          this.props.history.push('/map'));
        })
  }

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
              this.setState({userId: user.id, navLink: "log out" , class: "hidden"}, () => this.props.history.push('/map'));
            }
          })
    }

    logInOrOut = () => {
      if (localStorage.getItem('user')) {
          localStorage.removeItem('user');
          this.setState(state => ({ navLink: "log in" , class: "registerlink"}))
          this.props.history.push('/home')

      } else {
          this.props.history.push('/login')
      }
    }

      componentDidMount() {
        const sessionUser = localStorage.getItem('user')
        const user = JSON.parse(sessionUser);

        if (user) {
          this.setState({ userId: user.id, navLink: "log out", class: "hidden" })
        } else {
          console.log("no user in session storage (from appviews)")
          this.setState(state => ({ navLink: "log in" , class: "registerlink"}))
        }
        API.getUserLocation()
        .then(user => {
          this.setState({startingLat: user.location.lat, startingLng: user.location.lng})
        })
      }

    render() {
        return (
            <>
                <TopNav userId={this.state.userId} startingLat={this.state.startingLat} startingLng={this.state.startingLng} popup={this.state.popup} address={this.state.address} navLink={this.state.navLink} class={this.state.class} logInOrOut={this.logInOrOut} />
                <ApplicationViews userId={this.state.userId} startingLat={this.state.startingLat} startingLng={this.state.startingLng} popup={this.state.popup} address={this.state.address} verifyUser={this.verifyUser} getAddress={this.getAddress} addUser={this.addUser} />
            </>
        )
    }
}

export default withRouter(ScootApp)