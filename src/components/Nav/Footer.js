import React, { Component } from "react"
import "./Nav.css"
import { Button } from 'reactstrap';
import placeholder from "./placeholder.png"



class Footer extends Component {

  state = {
    hidden: true,
    text: "+"
  }

  toggle = () => {
    const geosearch = document.querySelector('.geosearch');
    this.setState(state => ({ hidden: !state.hidden }));
    if (this.state.hidden) {
      this.setState(state => ({ text: "-" }))
      geosearch.style.display = "block";
    } else {
      this.setState(state => ({ text: "+" }))
      geosearch.style.display = "none";
    }
  }

    render() {
        return (
            <div id="footer">
                {/* <Button id="addLocationBtn" onClick={this.toggle}> */}
                  <img src={placeholder} id="buttonImg" onClick={this.toggle}></img>
                  {/* </Button> */}
            </div>
            )
    }
}

export default Footer