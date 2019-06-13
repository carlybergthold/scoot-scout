import React, { Component } from "react"
import "./Nav.css"
import { Collapse, Button, CardBody, Card } from 'reactstrap';



class Footer extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle = () => {
    this.setState(state => ({ collapse: !state.collapse }));
  }

    render() {
      console.log("footer rendr")
        return (
            <div id="footer">
                <Button id="addLocationBtn" onClick={this.toggle}>Add a Location</Button>
                {/* {!this.state.hideCard && <AddLocation />} */}
                <Collapse isOpen={this.state.collapse}>
                  <Card>
                  <CardBody>
                  Anim pariatur cliche reprehenderit,
                  enim eiusmod high life accusamus terry richardson ad squid. Nihil
                  anim keffiyeh helvetica, craft beer labore wes anderson cred
                  nesciunt sapiente ea proident.
                  </CardBody>
                  </Card>
                </Collapse>
            </div>
            )
    }
}

export default Footer