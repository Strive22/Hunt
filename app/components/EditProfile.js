import React from 'react';
import { Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Checkbox } from 'react-bootstrap';
import { browserHistory, Link } from 'react-router';
import axios from 'axios';

class EditProfile extends React.Component {
  constructor(props){
		super(props)
		this.state = {
      name: props.currentUser.name,
      email: props.currentUser.email,
      tech: props.currentUser.tech,
      prompt: 'Tech Skills (separate by commas)',
      location: props.currentUser.location || '',
      otherHunters: props.currentUser.otherHunters || false
		}
	}

  commaCount() {
    let commas = 0;
    for (var i = 0; i<this.state.tech.length; i++) {
      if (this.state.tech[i] === ',') {
        commas++;
      }
    };
    if (commas === 1) {
      this.setState({
        prompt: "Cool, what else can you do?"
      })
    } else if (commas === 2) {
      this.setState({
        prompt: "Terrific, keep going!"
      })
    } else if (commas >= 3) {
      this.setState({
        prompt: "Wow, you've got skills!"
      })
    }
  }

  handleAllowChange (event) {
    this.setState({
      otherHunters: !this.state.otherHunters
    })
  }

  handleNameChange (event) {
    this.setState({
      name: event.target.value
    })
  }

  handleEmailChange (event) {
    this.setState({
      email: event.target.value
    })
  }

  handleSkillsChange (event) {
    this.setState({ 
      tech: event.target.value
    });
    this.commaCount();
  }

  handleZipcodeChange (event) {
    this.setState({
      location: event.target.value
    })
  }

  // getValidationState () {
  //   const length = this.state.location.length;
  //   const nump = isNaN(this.state.location);
  //   if (!nump && length === 5) return 'success';
  //   else if (nump || length!== 5) return 'error';
  // }

	render() {
    let otherHuntersBox = this.state.otherHunters ? 
      <Checkbox onChange={this.handleAllowChange.bind(this)} checked>Allow Other Hunters to Find Me?</Checkbox>
      :
      <Checkbox onChange={this.handleAllowChange.bind(this)}>Allow Other Hunters to Find Me?</Checkbox>

		return (
    	<div className="editProfile">
	      <Form>
          <h1>Edit Your Profile</h1>
	        <FormGroup controlId="formBasicText">
            <ControlLabel>Name</ControlLabel>
            <FormControl
              type="text"
              className="edit-profile-input"
              value={this.state.name}
              placeholder="Enter your name."
              onChange={this.handleNameChange.bind(this)}
            />
          </FormGroup>

          <FormGroup controlId="formBasicText">
            <ControlLabel>E-mail</ControlLabel>
            <FormControl
              type="text"
              className="edit-profile-input"
              value={this.state.email}
              placeholder="Enter your email."
              onChange={this.handleEmailChange.bind(this)}
            />
          </FormGroup>

          <FormGroup controlId="formBasicText">
            <ControlLabel>{this.state.prompt}</ControlLabel>
            <FormControl
              type="text"
              className="edit-profile-input"
              value={this.state.tech}
              placeholder="List your tech skills."
              onChange={this.handleSkillsChange.bind(this)}
            />
          </FormGroup>
          <FormGroup 
            controlId="formBasicText"
          >
            <ControlLabel>Zipcode</ControlLabel>
            <FormControl
              type="text"
              className="edit-profile-input"
              value={this.state.location}
              placeholder="Enter your zipcode, if you wish."
              onChange={this.handleZipcodeChange.bind(this)}
            />
          </FormGroup>
          {otherHuntersBox}
          <HelpBlock className='edit-profile-help'>If this box is checked and you enter your zipcode, other hunters in your area will be shown your name, email address, and tech skills in our Connect with Other Hunters page. Connect with others in your area and get networking!</HelpBlock>
          <Button 
            className='search-btn'
            onClick={() => this.props.submitProfile({
              name: this.state.name,
              email: this.state.email,
              tech: this.state.tech,
              location: this.state.location,
              otherHunters: this.state.otherHunters
            })}
          >
            Submit Profile</Button>
	      </Form>	     
      </div>
		)
	}
}

module.exports = EditProfile;
