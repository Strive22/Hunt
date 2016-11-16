import React from 'react';
import { ListGroup } from 'react-bootstrap';
import JobListItem from './JobListItem'

const JobList = (props) => {
  let interested, inProgress, complete;

  //if we're rendering the interested list
  if (props.interested) {
    interested = props.interested.map(job => {
      return (
        <JobListItem 
          jobContent={props.jobContent}
          addJobToInProgress={props.addJobToInProgress}
          addJobToComplete={props.addJobToComplete}
          removeJob={props.removeJob}
        />
      )
    })
    return (
      <div className="job-list-box">
        <ListGroup>
          {interested}
        </ListGroup>
      </div>
    )
  }

  //if we're rendering the inProgress list
  if (props.inProgress) {
    inProgress = props.inProgress.map(job => {
      return (
        <JobListItem 
          jobContent={props.jobContent}
          addJobToComplete={props.addJobToComplete}
          removeJob={props.removeJob}
        />
      )
    })
    return (
      <div className="job-list-box">
        <ListGroup>
          {inProgress}
        </ListGroup>
      </div>
    )
  }

  //if we're rendering the complete list
  if (props.complete) {
    complete = props.complete.map(job => {
      return (
        <JobListItem
          jobContent={props.jobContent}
          removeJob={props.removeJob}
        />
      )
    })
    return (
      <div className="job-list-box">
        <ListGroup>
          {complete}
        </ListGroup>
      </div>
    )
  }
}

module.exports = JobList;
