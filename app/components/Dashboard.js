import React from 'react';
import { browserHistory, Link } from 'react-router';
import { Tabs, Tab } from 'react-bootstrap';
import JobList from './JobList';
import JobListItem from './JobListItem';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interested: this.props.interested,
      inProgress: this.props.inProgress,
      complete: this.props.complete,
      jobContent: this.props.jobContent,
      key: 1
    }
  }

  handleSelect(key) {
    this.setState({
      key: key
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      interested: newProps.interested,
      inProgress: newProps.inProgress,
      complete: newProps.complete,
      jobContent: newProps.jobContent
    })
  }

  render() {
    return (
      <Tabs defaultActiveKey={this.state.key} onSelect={this.handleSelect} id="dashtabs">
        <Tab eventKey={1} title="Jobs I'm Interested In">
          <div className="job-list">
            <JobList
              userId={this.props.userId}
              jobContent={this.state.jobContent}
              interested={this.state.interested}
              moveJob={this.props.moveJob}
              removeJob={this.props.removeJob}
            />
          </div>
        </Tab>
        <Tab eventKey={2} title="Job Applications In Progress">
          <div className="job-list">
            <JobList
              userId={this.props.userId}
              jobContent={this.state.jobContent}
              inProgress={this.state.inProgress}
              moveJob={this.props.moveJob}
              removeJob={this.props.removeJob}
            />
          </div>
        </Tab>
        <Tab eventKey={3} title="Job Applications I've Completed">
          <div className="job-list">
            <JobList
              userId={this.props.userId}
              jobContent={this.state.jobContent}
              complete={this.state.complete}
              moveJob={this.props.moveJob}
              removeJob={this.props.removeJob}
            />
          </div>
        </Tab>
      </Tabs>
    )
  }

}

module.exports = Dashboard;
