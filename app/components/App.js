import React from 'react';
import { browserHistory } from 'react-router';
import { PageHeader } from 'react-bootstrap';
const axios = require('axios');

class App extends React.Component {
    constructor (props) {
    super(props);
    this.state = {
      currentUser: {}
    }
  }

  componentDidMount () {
    // check for a currently logged in user - if there is one, they'll go to the react router user path
    if (this.state.currentUser._id) {
      const path = `/users/${this.state.currentUser._id}`;
      browserHistory.push(path);
    } else {
      // if no user, get it
      axios.get('/login')
        .then((res) => {
          this.setState({
            loggedInUser: response.data
          });
          const path = `/users/${this.state.loggedInUser.fbid}`;
          browserHistory.push(path);
        });
    }
  }

  render() {
    return (
      <div>
        <PageHeader bsClass="page-header hunt">Hunt</PageHeader>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

module.exports = App;
