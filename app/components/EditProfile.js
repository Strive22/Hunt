import React from 'react';
const ReactBootstrap = require('react-bootstrap');
import axios from 'axios';

// React-Bootstrap form variables
const Grid = ReactBootstrap.Grid,
      Row = ReactBootstrap.Row,
      Col = ReactBootstrap.Col,
      Form = ReactBootstrap.Form,
      FormGroup = ReactBootstrap.FormGroup,
      ControlLabel = ReactBootstrap.ControlLabel,
      FormControl = ReactBootstrap.FormControl,
      HelpBlock = ReactBootstrap.HelpBlock;


class Profile extends React.Component {
	constructor(props){
		super(props)
		this.state = {

		}
	}

	getValidationState () {
    return 'success';
    // if (length > 0) 
    // // const length = this.state.value.length;
    // else if (length === 0) return 'error';
    // // else if (length > 0) return 'error';
  }
	render(){
		return(
      		<div>
		      <Form>
		      <h1>Edit your profile</h1>
		        <FormGroup
		            controlId="formBasicText"
		            validationState={this.getValidationState()}
		          >
		            <ControlLabel>Name</ControlLabel>
		            <FormControl
		              type="text"
		              value={this.state.value}
		              placeholder="Brittany Artimez"
		              onChange={this.handleChange}
		            />
		            <FormControl.Feedback />
		          </FormGroup>

		          <FormGroup
		            controlId="formBasicText"
		            validationState={this.getValidationState()}
		          >
		            <ControlLabel>E-mail</ControlLabel>
		            <FormControl
		              type="text"
		              value={this.state.value}
		              placeholder="Britstar@fancyMail.com"
		              onChange={this.handleChange}
		            />
		            <FormControl.Feedback />
		          </FormGroup>
		      </Form>
		      <Skills />
		      <Zip />
		    </div>
		)
	}
}

module.exports = Profile
