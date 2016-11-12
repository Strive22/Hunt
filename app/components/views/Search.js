import React from 'react';
import { Button } from 'react-bootstrap'

export default () => {

  return (
    <div className="selectbox">
      <h2>Search<br/>for Jobs</h2>
      <form className="search">
        <input type="text" placeholder="Search" />
        <Button>Go!</Button>
      </form>
    </div>
  );

};


