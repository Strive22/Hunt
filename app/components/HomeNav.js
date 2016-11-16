import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const HomeNav = () => {
  console.log('link container:', LinkContainer);
  return (
    <Grid>
      <Row>
        <Col md={4}>
          {/*<SearchContainer />*/}
        </Col>
        <Col md={4}>
          <div className="selectbox">
            <h2>View Your<br/>Dashboard</h2>
            <LinkContainer to={'/dashboard'}>
              <Button>Go!</Button>
            </LinkContainer>
          </div>
        </Col>
        <Col md={4}>
          {/*<EnterJob />*/}
        </Col>
      </Row>
    </Grid>
  )
}

module.exports = HomeNav;
