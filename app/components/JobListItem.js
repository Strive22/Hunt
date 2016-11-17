import React from 'react';
import { ListGroupItem, Modal, Grid, Row, Col, Button, Glyphicon, ButtonGroup } from 'react-bootstrap';

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
    return (
      <ListGroupItem>
        <Grid>
          <Row className="job-list-item">
            <Col md={6}>
              <h3>{this.state.jobTitle}</h3>
              <h4>{this.state.company}</h4>
              <h4>{this.state.location}</h4>
            </Col>
            <Col md={6}>
              <ButtonGroup className="job-list-item-btns">
                <Button bsStyle="success">Open Job Details</Button>
                <Button bsStyle="primary">Move to {this.state.nextList}</Button>
                <Button bsStyle="danger">Remove Job From Dashboard</Button>
              </ButtonGroup>
            </Col>
            {/*<Col md={1}>
              <Button className="job-list-item-btn"><Glyphicon glyph="remove-circle"/></Button>
            </Col>*/}
          </Row>
        </Grid>
      </ListGroupItem>
    )
  }
}

module.exports = JobListItem;
