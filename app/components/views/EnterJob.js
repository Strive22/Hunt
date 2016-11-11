import React from 'react';
import { Button, Modal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class EnterJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      value: ''
    }
  }

  openModal() {
    this.setState({
      showModal: true,
    })
  }

  closeModal() {
    this.setState({
      showModal: false,
    })
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div className="selectbox">
        <h2>Enter<br/>a Job</h2>
        <Button bsClass="btn" onClick={this.openModal.bind(this)}>Go!</Button>

        <Modal
          aria-labelledby='modal-label'
          show={this.state.showModal}
          onHide={this.closeModal.bind(this)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Describe the Job.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <FormControl
                type="text"
                value={this.state.value}
                placeholder="Job Title"
                onChange={this.handleChange.bind(this)}
              />
              <br/>
              <FormControl
                type="text"
                value={this.state.value}
                placeholder="Company"
              />
              <br/>
              <FormControl
                type="text"
                value={this.state.value}
                placeholder="Location"
              />
              <br/>
              <FormControl
                type="text"
                value={this.state.value}
                placeholder="Link to Job Posting"
              />
              <br/>
              <FormControl
                type="textarea"
                value={this.state.value}
                placeholder="Description"
              />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button>Submit</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

module.exports = EnterJob
