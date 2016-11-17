import React from 'react';
const ReactBootstrap = require('react-bootstrap');
import axios from 'axios';

 const Grid = ReactBootstrap.Grid,
      Row = ReactBootstrap.Row,
      Col = ReactBootstrap.Col,
      Form = ReactBootstrap.Form,
      FormGroup = ReactBootstrap.FormGroup,
      ControlLabel = ReactBootstrap.ControlLabel,
      FormControl = ReactBootstrap.FormControl,
      HelpBlock = ReactBootstrap.HelpBlock;

class Zip extends React.Component {
		constructor(props){
		  super(props)
		  this.state = {
			value:'Tickleberries',
			toot: '',
		  }
		  this.clicky =  this.clicky.bind(this);
		  this.getValidationState = this.getValidationState.bind(this);
		  this.posty = this.posty.bind(this);
        }
posty(){
	return axios.post('http://localhost:8080/save/', this.state)
      .then(function(response){
      console.log('saved successfully')
  })
}
getValidationState () {
	const length = this.state.toot.length;
	const nump = isNaN(this.state.toot);
	if (!nump && length === 5) return 'success';

	else if (nump || length!== 5) return 'error';
}
  clicky(event){
  	console.log("target", event.target.value);
  	this.setState({toot: event.target.value});
  	console.log(this.state.count);
  }

	render(){
      var check = this.getValidationState() === "success"? "Valid Zip" : "Zipcode must be 5 numbers";
		return(

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
              onChange={this.clicky}
            />
            <FormControl.Feedback />
          </FormGroup>

	      <ReactBootstrap.Button onClick={this.posty} bsStyle="success">Submit Profile</ReactBootstrap.Button>
      </Form>

		);
	}

}


module.exports = Zip