import React from "react";
import { ListGroupItem, ButtonToolbar, Button, Modal, Grid, Row, Col } from 'react-bootstrap';


class SearchListItem extends React.Component {

  constructor() {
    super()
    this.state = {
      showModal: false
    }
  }

  closeModal() {
    this.setState({
      showModal: false
    });
  }
  openModal() {
    this.setState({
      showModal: true
    });
  }

  render() {
    let jobDesc = this.props.job.description.substr(0,1000) + "...";
    return (
      <div>
        <ListGroupItem>
          <Grid>
            <Row className="search-list-item">
              <Col md={6}>
                <h3>{this.props.job.title}</h3>
                <h4>{this.props.job.company}</h4>
                <h4>{this.props.job.location}</h4>
              </Col>
              <Col md={6}>
                <ButtonToolbar>
                  <Button
                    onClick={this.openModal.bind(this)}
                    className="search-list-item-btns"
                  >
                    See Job Details
                  </Button>
                  <Button
                    onClick={this.props.addIt}
                    className="search-list-item-btns"
                  >
                    Add Job To Interested List
                  </Button>
                </ButtonToolbar>
              </Col>
            </Row>
          </Grid>
        </ListGroupItem>

        <Modal 
          show={this.state.showModal} 
          bsSize="large" 
          onHide={this.closeModal.bind(this)}
          className="job-modal"
        >
          <Modal.Header closeButton/>
          <Modal.Body className="modal-body">
            <h3>{this.props.job.title}</h3>
            <h4>{this.props.job.company}</h4>
            <hr />
            <h4>Job Description:</h4>
            <p>{jobDesc}</p>
            <hr />
            <p><a href={this.props.job.link}>See Posting on {this.props.job.api}</a></p>
            <Button
              onClick={this.props.addIt.bind(null, this.props.job)}
              className="modal-btns"
            >
              Add Job to Interested List
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}


export default SearchListItem
