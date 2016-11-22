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

 
  axios.get(`http://localhost:3000/connect/${zipcode}/${distance}`)
    .then(response => {  
      return response.data
    })
    .then(data => {
      if (this.state.technology) { 
        for (let i=0; i < data.length; i++) { 
          if (data[i].tech[0] === this.state.technology) { 
            newarr.push(data[i]); 
          }
        }   
        self.setState({
          users: newarr
        })
      } else {
        self.setState({
          users: data
        })
      }
      return data;
    })
    .then(data1 => {
      if (data1.length === 0) {
        this.setState({
          text: true
        })
      }
    })
    .catch(err => {
      throw err;
    })  
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
        title="Sorry, No Users Nearby"
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
