import React from 'react';
import { browserHistory, Link} from 'react-router';
import HomeNav from '../layouts/Home'

class HomeNavContainer extends React.Component {

  componentDidMount(){
    //update the store with the user's information.
    // and pass that into home somehow....
  }

  render() {
    return (
      <HomeNav />
    )
  }
}

module.exports = HomeNavContainer;
