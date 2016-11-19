import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button, Modal } from 'react-bootstrap';


class EnterJobForm extends React.Component {

  constructor() {
    super()
    this.state = {
      title: '',
      company: '',
      location: '',
      link: '',
      description: ''
    }
  }

  handleTitle(event){
    console.log(event.target.value)
    this.setState({
      title: event.target.value
    })
  }

  handleCompany(event){
    console.log(event.target.value)
    this.setState({
      company: event.target.value
    })
  }

  handleLocation(event){
    console.log(event.target.value)
    this.setState({
      location: event.target.value
    })
  }

  handleLink(event){
    console.log(event.target.value)
    this.setState({
      link: event.target.value
    })
  }

  handleDescription(event){
    console.log(event.target.value)
    this.setState({
      description: event.target.value
    })
  }

  render() {
    return (
      <form className="enter-job">
        <FormGroup controlId='jobTitle'>
          <ControlLabel className="job-label">Job Title:</ControlLabel>
          <FormControl
            type='text'
            placeholder='Click here to enter the job title.'
            value={this.state.title}
            onChange={this.handleTitle.bind(this)}
          />
        </FormGroup>
        <FormGroup controlId='company'>
          <ControlLabel className="company-label">Company:</ControlLabel>
          <FormControl
            type='text'
            placeholder='Click here to enter the company.'
            value={this.state.company}
            onChange={this.handleCompany.bind(this)}
          />
        </FormGroup>
        <FormGroup controlId='location'>
          <ControlLabel className="location-label">Location:</ControlLabel>
          <FormControl
            type='text'
            placeholder='Click here to enter the job location.'
            value={this.state.location}
            onChange={this.handleLocation.bind(this)}
          />
        </FormGroup>
        <FormGroup controlId='jobLink'>
          <ControlLabel className="link-label">Link to Job Posting:</ControlLabel>
          <FormControl
            type='text'
            placeholder='Click here to enter a link to the job posting, if any.'
            value={this.state.link}
            onChange={this.handleLink.bind(this)}
          />
        </FormGroup>
        <FormGroup controlId='jobDesc'>
          <ControlLabel className="description-label">Job Description:</ControlLabel>
          <FormControl
            componentClass='textArea'
            placeholder='Click here to describe the job.'
            value={this.state.description}
            onChange={this.handleDescription.bind(this)}
          />
        </FormGroup>
        <Button 
          onClick={this.props.submitJob.bind(null, this.state)}
          className="modal-submit-btn"
        >
          Save Job to Interested List
        </Button>
      </form>
    )
  }
}


module.exports = EnterJobForm;
