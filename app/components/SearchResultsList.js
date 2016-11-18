import React from 'react';
import SearchListItem from './SearchListItem';
import { ListGroup } from 'react-bootstrap'



export default (props) => {
  let list = props.jobs.map((job, index) => 
    <SearchListItem 
      key={index} 
      job={job} 
      addIt={props.addJobToInterested.bind(null)}
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
