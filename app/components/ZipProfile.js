import React from 'react';
import { Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import axios from 'axios';

class Zip extends React.Component {
	constructor(props) {
	  super(props)
	  this.state = {
			value: 'Tickleberries',
			toot: '',
		}
  }

  posty() {
  	// axios.put(`${this.props.currentUser}`, {
   //    name: 
   //  })
  }

  getValidationState () {
  	const length = this.state.toot.length;
  	const nump = isNaN(this.state.toot);
  	if (!nump && length === 5) return 'success';
  	else if (nump || length!== 5) return 'error';
  }

  clicky(event) {
    this.setState({
      toot: event.target.value
    });
  }

	render() {
    var check = this.getValidationState() === "success"? "Valid Zip" : "Zipcode must be 5 numbers";
		return (

	  <Form>
        <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
            >
            <ControlLabel>{check}</ControlLabel>
            <FormControl
              type="text"
              value={this.state.toot}
              placeholder="Find me!"
              onChange={this.clicky.bind(this)}
            />
            <FormControl.Feedback />
          </FormGroup>

	      <Button bsStyle="success">Submit Profile</Button>
      </Form>
		);
	}

}


module.exports = Zip
