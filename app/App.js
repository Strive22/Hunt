import React from 'react';
import { browserHistory } from 'react-router';
import { PageHeader } from 'react-bootstrap';
import HomeContainer from './components/containers/HomeContainer';


class App extends React.Component {
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
