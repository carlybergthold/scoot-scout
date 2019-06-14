import React, { Component } from "react"
import "./Nav.css"
import { Button } from 'reactstrap';



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
                <Button id="addLocationBtn" onClick={this.toggle}>{this.state.text}</Button>
            </div>
            )
    }
}

export default Footer