import React from 'react';
import SearchListItem from './SearchListItem';
import { ListGroup } from 'react-bootstrap'

export default (props) => {

  // filter through the search results and get rid of the ones that didn't actually return a job object
    // then map them into SearchListItem components
  let list = props.jobs.filter(job => job.title !== undefined ).map((job, index) =>
    <SearchListItem
      key={index}
      job={job}
      addJob={props.addJob.bind(null)}
    />
  )

  return (
    <div className="search-results">
      <ListGroup>
        {list}
      </ListGroup>
    </div>
  )
}
