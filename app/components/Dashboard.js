import React from 'react';
import { browserHistory, Link } from 'react-router';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interested: this.props.interested,
      inProgress: this.props.inProgress,
      complete: this.props.complete,
      jobContent: this.props.jobContent
    }
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    )
  }
  
}

module.exports = Dashboard;
