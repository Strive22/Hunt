import React from 'react';
import { browserHistory, Link } from 'react-router';
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
    this.setState({ key });
  }

  render() {
    return (
      <Tabs activeKey={this.state.key} onSelect={this.handleSelect} class="dashtabs">
        <Tab eventKey={1} title="Jobs I'm Interested In">
          <JobList 
            jobContent={this.state.jobContent}
            interested={this.state.interested}
            addJobToInProgress={this.props.addJobToInProgress} 
            addJobToComplete={this.props.addJobToComplete} 
            removeJob={this.props.removeJob}
          />
        </Tab>
        <Tab eventKey={2} title="Job Applications In Progress">
          <JobList 
            jobContent={this.state.jobContent}
            inProgress={this.state.inProgress}
            addJobToComplete={this.props.addJobToComplete} 
            removeJob={this.props.removeJob}            
          />

        </Tab>
        <Tab eventKey={3} title="Job Applications Complete">
          <JobList 
            jobContent={this.state.jobContent}
            complete={this.state.complete}
            removeJob={this.props.removeJob}            
          />
        </Tab>
      </Tabs>
    )
  }
  
}

module.exports = Dashboard;
