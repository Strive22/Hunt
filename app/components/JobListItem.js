import React from 'react';
import { ListGroupItem, Modal, Grid, Row, Col, Button, Glyphicon, ButtonToolbar } from 'react-bootstrap';

class JobListItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentList: props.currentList,
      nextList: props.nextList,
      prevList: props.prevList,
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
    let nextFunc = this.state.nextList === "In Progress" ? this.props.addJobToInProgress : this.props.addJobToComplete;

    let jobDesc = this.state.jobDesc.substr(0,1000) + '...';

    let jobFrom = `Link to Job Posting on ${this.state.api}` || "Link to Job Posting"

    return (
      <div>
        <ListGroupItem>
          <Grid>
            <Row className="job-list-item">
              <Col md={6}>
                <h3>{this.state.jobTitle}</h3>
                <h4>{this.state.company}</h4>
                <h4>{this.state.location}</h4>
              </Col>
              <Col md={6}>
                <ButtonToolbar className="job-list-item-btns">
                  <Button className="job-list-item-btn" onClick={this.openModal.bind(this)}>Open Job Details</Button>
                  <Button className="job-list-item-btn" onClick={() => nextFunc(this.props.jobData)}>Move to {this.state.nextList}</Button>
                  <Button className="job-list-item-btn" onClick={() => this.props.removeJob(this.props.jobData)}>Remove Job From Dashboard</Button>
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
              <hr />
              <h4>Job Description:</h4>
              <p>{jobDesc}</p>
              <hr />
              <p><a href={this.state.jobLink}>{jobFrom}</a></p>
              <Button
                onClick={() => nextFunc(this.props.jobData)}
                className="modal-btns"
              >
                Move to {this.state.nextList}
              </Button>
            </Modal.Body>
          </Modal>
        </ListGroupItem>
      </div>
    )
  }
}

module.exports = JobListItem;
