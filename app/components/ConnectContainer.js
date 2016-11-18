import React from 'react';
import { browserHistory, Link} from 'react-router';

import { Jumbotron, Button, Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

// import ConnectReducer from '../../reducers/ConnectReducer'; 
import Connectlist from './ConnecterList';  
import Validation from './Validation';
import  {Component, PropTypes} from 'react'; 
import SweetAlert from 'sweetalert-react'; 
import axios from 'axios';





class ConnectContainer extends React.Component {
  constructor(){
    super(); 
    this.state = { 
      Zipcode :'', 
      Distance: '', 
      Technology : '', 
      users :[], 
      text : false   
    };
  }
  
componentDidMount () {
      
 }
 
handlesubmit(event){ 
  console.log("Hellooo U called", event.target.value);
  event.preventDefault();  
 let Zipcode = this.ZIP.state.value;  
  let Distance = this.Distance.value; 
  let Technology = this.Technology.value; 
   console.log("Zipcode", Zipcode);
   console.log("Distance", Distance);
   console.log("Technology", Technology);
  this.setState({
     Zipcode:Zipcode,
     Distance: Distance,
     Technology:Technology,
     })

 let self = this; 
  let newarr = []

 
  axios.get(`http://localhost:3000/connect/${Zipcode}/${Distance}`)
      .then(response => {  
        return response.data
      })
      .then(data => {
        // self.setState({
        //   users: data
        // })
        console.log("hellooo Dattaaa", data);
          if(this.state.Technology){ 
          for(let i=0; i < data.length; i++){ 
             if(data[i].tech[0] === this.state.Technology){ 
             newarr.push(data[i]); 
           }
           }   
            self.setState({
               users: newarr
              })
       
             } 
           else{
          
            self.setState({
              users: data
               })
           }
      return data
      }).then(data1 => {
      if(data1.length===0){
       this.setState({
          text: true
        })

         }
      })
      .catch(err => {
        console.log('dddd', err.message)
      })  
  }
  render() {  
  let Techfilter  = (this.state.users.length) ? <Connectlist userdata={this.state.users}/> :<SweetAlert
       title="Sorry No Users Near by"
        show = {this.state.text}
        text="Please Try Again"
         onConfirm={ () => this.setState({ 
          text :false
         })
       }
        />;
    return (
       <div>
     <Validation.components.Form ref={c => { this.form = c }} onSubmit = {this.handlesubmit.bind(this)}> 
     <Validation.components.Input placeholder = "ZIP" ref = {(value) => this.ZIP = value} validations={['required','lenght']}/>
     <input placeholder = "Distance" ref = {(value) => this.Distance = value}/>
     <input placeholder = "Technology" ref = {(input) => this.Technology = input}/>
     <button type = "submit"> Search</button>
      </Validation.components.Form> 
   
    {Techfilter }
   </div>
      )
      
   
  }

}





module.exports = ConnectContainer;