import React from 'react';
import { browserHistory, Link} from 'react-router';
import { Jumbotron, Button, Grid, Row, Col, FormControl, ControlLabel } from 'react-bootstrap';
import Connectlist from './ConnecterList';
import Validation from './Validation';
import { Component, PropTypes } from 'react';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';
import connect from '../models/connectModel';

class ConnectContainer extends React.Component {

  constructor(){
    super();
    this.state = {
      zipcode : '',
      distance: '5',
      technology: '',
      users: [],
      sweetAlert: false
    };
  }

  closeSweetAlert() {
    this.setState({
      sweetAlert: false
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    // Grab the data we need from state
    let zipcode = this.state.zipcode;
    let distance = this.state.distance;
    let technology = this.state.technology;

    // call our function to get nearby users
      // this function handles searching by technology
    connect.getNearbyUsers(distance, zipcode, technology)
      .then(users => {
        this.setState({
          users: users
        })
        return users
      })
      .then(users => {
        // if there are no nearby users, alert the user with SOME SWEETNESS!!!!!
        if (!users.length) {
          this.setState({
            sweetAlert: true
          })
        }
      })
      .catch(err => { throw err })

  }

  handleDistance(e) {
    let newDistance = e.target.value;

    this.setState({
      distance: newDistance
    })
  }

  handleZip(e) {
    let zip = e.target.value;

    this.setState({
      zipcode: zip
    })
  }

  render() {
    let Techfilter = (this.state.users.length) ? (
      <Connectlist userdata={this.state.users}/>
    ) : (
      <SweetAlert
        title="Sorry No Users Near by"
        show = {this.state.sweetAlert}
        text="Please Try Again"
        onConfirm={this.closeSweetAlert.bind(this)}
      />
    )

    return (
      <div>
        <Validation.components.Form ref={c => { this.form = c }} onSubmit={this.handleSubmit.bind(this)}>
        <Grid>
          <Row>
            <Col sm={2}>
              <Validation.components.Input className="form-text-input connect" placeholder="ZIP" value={this.state.zipcode} onChange={this.handleZip.bind(this)} validations={['required','length']}/>
            </Col>
            <Col sm={2}>
              <input value={this.state.technology} placeholder="Technology" className="form-text-input connect" ref={(input) => this.Technology = input}/>
            </Col>
            <Col sm={2}>
              <ControlLabel>Within</ControlLabel>
              <FormControl componentClass="select" onChange={this.handleDistance.bind(this)}>
                <option value="5">5 Miles</option>
                <option value="10">10 Miles</option>
                <option value="20">20 Miles</option>
                <option value="50">50 Miles</option>
              </FormControl>
            </Col>
            <Col sm={6}>
              <button className="search-btn btn btn-default" type="submit"> Search For Hunters </button>
            </Col>
          </Row>
        </Grid>

        </Validation.components.Form>
        {Techfilter}
      </div>
    )
  }
}


module.exports = ConnectContainer;
