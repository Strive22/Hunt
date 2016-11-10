import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import ToDash from '../views/ToDash';
import Search from '../views/Search';
import EnterJob from '../views/EnterJob';

export default () => {

  return (
    <Grid>

      <Row>

        <Col md={4}>
          <Search />
        </Col>

        <Col md={4}>
          <ToDash />
        </Col>

        <Col md={4}>
          <EnterJob />
        </Col>

      </Row>

    </Grid>

  )
}
