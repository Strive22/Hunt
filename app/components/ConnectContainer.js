import React from 'react';
import { browserHistory, Link} from 'react-router';
import { Jumbotron, Button, Grid, Row, Col, FormControl} from 'react-bootstrap';
import Connectlist from './ConnecterList';
import Validation from './Validation';
import { Component, PropTypes } from 'react';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';


class ConnectContainer extends React.Component {

  constructor(){
    super();
    this.state = {
      Zipcode : '',
      Distance: '',
      Technology: '',
      users: [],
      sweetAlert: false
    };
  }

  componentDidMount () {

  }

  closeSweetAlert() {
    this.setState({
      sweetAlert: false
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    let Zipcode = this.ZIP.state.value;
    let Distance = this.Distance.value;
    console.log(Distance)
    let Technology = this.Technology.value;

    this.setState({
       Zipcode:Zipcode,
       Distance: Distance,
       Technology:Technology,
    })

    let self = this;
    let newarr = []

    axios.get(`/connect/${Zipcode}/${Distance}`)
      .then((response) => {
        return response.data
      })
      .then(data => {
        if (this.state.Technology) {
          for (let i=0; i < data.length; i++) {
            if (data[i].tech[0] === this.state.Technology) {
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

        return data

      })
      .then(data1 => {
        if (data1.length === 0) {
          this.setState({
            sweetAlert: true
          })
        }
      })
      .catch(err => {
        console.log('I\'m Sorry, something went wrong', err.message)
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
        <Validation.components.Form ref={c => { this.form = c }} onSubmit = {this.handleSubmit.bind(this)}>
        <Validation.components.Input placeholder="ZIP" className="whitecolor" ref = {(value) => this.ZIP = value} validations={['required','length']}/>
        <FormControl componentClass="select" placeholder="Distance" ref={(value) => this.Distance = value}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </FormControl>
        {/* <input placeholder= "Distance" className = "whitecolor" ref = {(value) => this.Distance = value}/> */}
        <input placeholder = "Technology" className ="whitecolor" ref = {(input) => this.Technology = input}/>
        <button type = "submit"> Search For Hunters </button>
        </Validation.components.Form>
        {Techfilter }
      </div>


      )


  }

}





module.exports = ConnectContainer;
