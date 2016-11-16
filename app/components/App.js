import React from 'react';
import { browserHistory } from 'react-router';
import { PageHeader } from 'react-bootstrap';
import axios from 'axios';

class App extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        currentUser: {}
      }
  }

  componentDidMount () {
    // check for user - if there is one, they'll go to the react router user path
    if (this.state.currentUser._id) {
      const path = `/home/${this.state.currentUser._id}`;
      browserHistory.push(path);
    } else {
      // if no user, get it
      axios.get('http://localhost:3000/login')
        .then((res) => {
          this.setState({
            currentUser: res.data
          });
          const path = `/home/${this.state.currentUser._id}`;
          browserHistory.push(path);
        });
    }
  }

  render() {
    return (
      <div>
        <PageHeader bsClass="page-header hunt">Hunt</PageHeader>
        <div>
          {this.renderChildrenWithProps()}
        </div>
      </div>
    )
  }

  renderChildrenWithProps () {
    // add props to all the children of app
    return React.Children.map(this.props.children, (child) => {
      switch (child.type.name) {
        case "Home" :
          // home needs . . . 
          return React.cloneElement(child, {
            currentUser: this.state.currentUser,
          });
          break;
        case "Dashboard" :
          // dashboard needs . . . 
          return React.cloneElement(child, {
            currentUser: this.state.currentUser,
          });
          break;
        case "EditProfile" :
          // editprofile needs . . . 
          return React.cloneElement(child, {
            currentUser: this.state.currentUser,
          });
          break;
        case "Connect" :
          // connect needs . . . 
          return React.cloneElement(child, {
            currentUser: this.state.currentUser,
          });
          break;        
        default :
          return child;
      }
    });
  }

}

module.exports = App;
