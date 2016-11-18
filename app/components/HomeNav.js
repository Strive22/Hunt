import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
// import ToDash from './ToDash';
// import EnterJob from './EnterJob';
import SearchNewJobs from './SearchNewJobs'

const HomeNav = (props) => {
  return (
    <Grid>
      <Row>

        <Col md={4}>
          <div className="selectbox dash">
            <h2>View Your<br/>Dashboard</h2>
            <LinkContainer to={'/dashboard'}>
              <Button bsSize="large" className="search-btn">Go!</Button>
            </LinkContainer>
          </div>
        </Col>

        <Col md={4}>
          <SearchNewJobs search={props.searchForJobs}/>
        </Col>

        <Col md={4}>
          <div className="selectbox dash">
            <h2>Enter a<br/>Job</h2>
            <LinkContainer to={'/enterJob'}>
              <Button bsSize="large" className="search-btn">Go!</Button>
            </LinkContainer>
          </div>
        </Col>

      </Row>

    </Grid>
  )
}

module.exports = HomeNav;
