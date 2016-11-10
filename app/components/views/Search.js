import React from 'react';

export default (props) => {

  return (
    <div className="selectbox">
      <h2>View Your<br/>Dashboard</h2>
      <form onSubmit={this.props.search} className="search">
        <input type="text" ref="search" placeholder="Search" />
        <Button>Go!</Button>
      </form>
    </div>
  );

};
