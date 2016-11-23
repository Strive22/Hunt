import React from 'react';
import { ListGroupItem, Modal, Grid, Row, Col, Button, Glyphicon, ButtonToolbar } from 'react-bootstrap';

class JobListItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentList: props.currentList,
      jobData: props.jobData,
      jobTitle: props.jobData.title,
      company: props.jobData.company,
      location: props.jobData.location,
      jobDesc: props.jobData.description,
      api: props.jobData.api || null,
      jobLink: props.jobData.link,
      showModal: false
    }
  }

  openModal() {
    this.setState({
      showModal: true
    })
  }

  closeModal() {
    this.setState({
      showModal: false
    })
  }

  render () {
    let jobDesc = this.state.jobDesc.substr(0,5000) + '...' || "test";
    let jobFrom = `Link to Job Posting on ${this.state.api}` || "Link to Job Posting"

    if (this.state.currentList == "interested") {
      return (
        <ListGroupItem className="job-list-item">
          <Grid>
            <Row>
              <Col md={6}>
                <h3>{this.state.jobTitle}</h3>
                <h4>{this.state.company}</h4>
                <h4>{this.state.location}</h4>
              </Col>
              <Col md={6}>
                <ButtonToolbar className="job-list-item-btns">
                  <Button className="job-list-item-btn" onClick={this.openModal.bind(this)}>Open Job Details</Button>
                  <Button className="job-list-item-btn" onClick={() => this.props.moveJob(this.state.jobData, "inProgress")}>Move to In Progress</Button>
                  <Button className="job-list-item-btn" onClick={() => this.props.removeJob(this.state.jobData, this.state.currentList)}>Remove Job From Dashboard</Button>
                </ButtonToolbar>
              </Col>
            </Row>
          </Grid>
          <Modal
            show={this.state.showModal}
            bsSize="large"
            onHide={this.closeModal.bind(this)}
            className="job-modal"
          >
            <Modal.Header closeButton />
            <Modal.Body className="modal-body">
              <h3>{this.state.jobTitle}</h3>
              <h4>{this.state.company}</h4>
              <h4>{this.state.location}</h4>
              <hr />
              <h4>Job Description:</h4>
              <p>{jobDesc}</p>
              <hr />
              <p><a href={this.state.jobLink}>{jobFrom}</a></p>
              <Button
                onClick={() => this.props.moveJob(this.state.jobData, "inProgress")}
                className="modal-btns"
              >
                Move to In Progress
              </Button>
            </Modal.Body>
          </Modal>
        </ListGroupItem>
      )

    } else if (this.state.currentList == "inProgress") {
      return (
        <ListGroupItem className="job-list-item">
          <Grid>
            <Row>
              <Col md={6}>
                <h3>{this.state.jobTitle}</h3>
                <h4>{this.state.company}</h4>
                <h4>{this.state.location}</h4>
              </Col>
              <Col md={6}>
                <ButtonToolbar className="job-list-item-btns">
                  <Button className="job-list-item-btn" onClick={this.openModal.bind(this)}>Open Job Details</Button>
                  <Button className="job-list-item-btn" onClick={() => this.props.moveJob(this.state.jobData, "interested")}>Move Back to Interested</Button>
                  <Button className="job-list-item-btn" onClick={() => this.props.moveJob(this.state.jobData, "complete")}>Move to Complete</Button>
                  <Button className="job-list-item-btn" onClick={() => this.props.removeJob(this.state.jobData, this.state.currentList)}>Remove Job From Dashboard</Button>
                </ButtonToolbar>
              </Col>
            </Row>
          </Grid>
          <Modal
            show={this.state.showModal}
            bsSize="large"
            onHide={this.closeModal.bind(this)}
            className="job-modal"
          >
            <Modal.Header closeButton />
            <Modal.Body className="modal-body">
              <h3>{this.state.jobTitle}</h3>
              <h4>{this.state.company}</h4>
              <h4>{this.state.location}</h4>
              <hr />
              <h4>Job Description:</h4>
              <p>{jobDesc}</p>
              <hr />
              <p><a href={this.state.jobLink}>{jobFrom}</a></p>
              <Button
                onClick={() => this.props.moveJob(this.state.jobData, "complete")}
                className="modal-btns"
              >
                Move to Complete
              </Button>
            </Modal.Body>
          </Modal>
        </ListGroupItem>
      )
    } else if (this.state.currentList == "complete") {
      return (
        <ListGroupItem className="job-list-item">
          <Grid>
            <Row>
              <Col md={6}>
                <h3>{this.state.jobTitle}</h3>
                <h4>{this.state.company}</h4>
                <h4>{this.state.location}</h4>
              </Col>
              <Col md={6}>
                <ButtonToolbar className="job-list-item-btns">
                  <Button className="job-list-item-btn" onClick={this.openModal.bind(this)}>Open Job Details</Button>
                  <Button className="job-list-item-btn" onClick={() => this.props.moveJob(this.state.jobData, "inProgress")}>Move Back to In Progress</Button>
                  <Button className="job-list-item-btn" onClick={() => this.props.removeJob(this.state.jobData, this.state.currentList)}>Remove Job From Dashboard</Button>
                </ButtonToolbar>
              </Col>
            </Row>
          </Grid>
          <Modal
            show={this.state.showModal}
            bsSize="large"
            onHide={this.closeModal.bind(this)}
            className="job-modal"
          >
            <Modal.Header closeButton />
            <Modal.Body className="modal-body">
              <h3>{this.state.jobTitle}</h3>
              <h4>{this.state.company}</h4>
              <h4>{this.state.location}</h4>
              <hr />
              <h4>Job Description:</h4>
              <p>{jobDesc}</p>
              <hr />
              <p><a href={this.state.jobLink}>{jobFrom}</a></p>
            </Modal.Body>
          </Modal>
        </ListGroupItem>
      )
    }
  }
}

module.exports = JobListItem;
