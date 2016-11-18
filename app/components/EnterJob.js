import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';

class EnterJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <form class="enter-job">
        <FormGroup controlId='jobTitle'>
          <ControlLabel class="enter-label">Job Title:</ControlLabel>
          <FormControl
            type='text'
            help='Enter the job title.'
          />
        </FormGroup>
        <FormGroup controlId='company'>
          <ControlLabel class="enter-label">Company:</ControlLabel>
          <FormControl
            type='text'
            help='Enter the company.'
          />
        </FormGroup>
        <FormGroup controlId='location'>
          <ControlLabel class="enter-label">Location:</ControlLabel>
          <FormControl
            type='text'
            help='Enter the job location.'
          />
        </FormGroup>
        <FormGroup controlId='jobLink'>
          <ControlLabel class="enter-label">Link to Job Posting:</ControlLabel>
          <FormControl
            type='text'
            help='Enter a link to the job posting, if any.'
          />
        </FormGroup>
        <FormGroup controlId='jobDesc'>
          <ControlLabel class="enter-label">Job Description:</ControlLabel>
          <FormControl
            componentClass='textArea'
            help='Briefly describe the job.'
          />
        </FormGroup>
      </form>                         
    )
  }
}

module.exports = EnterJob;
