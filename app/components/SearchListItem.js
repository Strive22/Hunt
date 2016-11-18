import React from "react";
import { ListGroupItem, Button, Modal } from 'react-bootstrap';


class SearchListItem extends React.Component {

  constructor() {
    super()
    this.state = {
      showModal: false
    }
  }

  close() {
    this.setState({
      showModal: false
    });
  }

  open() {
    this.setState({
      showModal: true
    });
  }

  getInterested(job) {
    // this.props.addIt(job)
  }


  render() {

    return (
      <ListGroupItem header={this.props.job.title}>
      {this.props.job.company}
      <Button
        bsSize="sm"
        onClick={this.open.bind(this)}
      >
        Get the deets!
      </Button>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>

          <Modal.Header closeButton>
            <Modal.Title>{this.props.job.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <h4>{this.props.job.company}</h4>

            <hr />

            <h4>Description</h4>
            <p>{this.props.job.description}</p>

            <Button
              bsSize="sm"
              onClick={this.props.addIt.bind(null, this.props.job)}
            >
              Lets do it!
            </Button>

          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>

        </Modal>

      </ListGroupItem>
    )
  }
}


export default SearchListItem
