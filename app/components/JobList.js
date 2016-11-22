import React from 'react';
import { ListGroup } from 'react-bootstrap';
import JobListItem from './JobListItem'

const JobList = (props) => {
  let interested, inProgress, complete;

  //if we're rendering the interested list
  if (props.interested) {
    interested = props.interested.map((job, i) => {
      return (
        <JobListItem
          key={job._id}
          jobData={job}
          currentList="interested"
          nextList="In Progress"
          jobContent={props.jobContent}
          moveJob={props.moveJob}
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
    inProgress = props.inProgress.map((job, i) => {
      return (
        <JobListItem 
          key={job._id}
          jobData={job}
          prevList="Interested"
          currentList="inProgress"
          nextList="Complete"
          jobContent={props.jobContent}
          moveJob={props.moveJob}
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
    complete = props.complete.map((job, i) => {
      return (
        <JobListItem
          key={job._id}
          jobData={job}
          prevList="In Progress"
          currentList="complete"      
          jobContent={props.jobContent}
          moveJob={props.moveJob}
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
