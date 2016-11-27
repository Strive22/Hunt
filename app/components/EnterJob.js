import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button, Modal } from 'react-bootstrap';
import EnterJobForm from './EnterJobForm';
import job from '../models/jobModel'

class EnterJob extends React.Component {

  constructor() {
    super();
    this.state = {
      showModal: false
    }
  }
  open() {
    this.setState({
      showModal: true
    })
  }
  close() {
    this.setState({
      showModal: false
    })
  }

  submitJob(job) {
    this.props.addJob(job)
    this.close()
  }


  render() {

    return (

      <div className="selectbox dash">
        <h2>Enter a<br/>Job</h2>
        <Button
          bsSize="large"
          className="search-btn"
          onClick={this.open.bind(this)}
        >
          Do it!
        </Button>
       
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title className="EnterJobFormText">Enter the job details.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EnterJobForm submitJob={this.submitJob.bind(this)}/>
          </Modal.Body>
        </Modal>  
     
      
      </div>
    )
  }
}

module.exports = EnterJob;
