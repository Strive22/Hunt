import React from 'react';
import SearchListItem from './SearchListItem';
import { ListGroup } from 'react-bootstrap'

export default (props) => {

  let list = props.jobs.map((job, index) =>
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
