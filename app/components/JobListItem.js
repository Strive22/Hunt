import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

const JobListItem = (props) => {
  let job = props.jobData;
  console.log("job:", job);
  return (
    <ListGroupItem header={job.title}>
      {job.company}
      <br/>
      {job.location}
    </ListGroupItem>
  )
}

module.exports = JobListItem;
