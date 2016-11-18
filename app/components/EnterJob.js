import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button, Modal } from 'react-bootstrap';
import EnterJobForm from './EnterJobForm'

class EnterJob extends React.Component {
  constructor(props) {
    super(props);
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



  render() {
    return (

      <div className="selectbox dash">
        <h2>Enter a<br/>Job</h2>
        <Button
          bsSize="large"
          className="search-btn"
          onClick={this.open.bind(this)}
        >
          Do et!
        </Button>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Fill it out, Fill it out!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EnterJobForm />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Get outta here!</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

module.exports = EnterJob;
