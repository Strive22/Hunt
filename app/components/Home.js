import React from 'react';
import { browserHistory, Link} from 'react-router';
import { Jumbotron, Button, Grid, Row, Col } from 'react-bootstrap';
// import HomeNav from './HomeNav';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div>
        <div>

          <Jumbotron bsClass="jumbotron motivate">

            <h1>TEST, you've got this.<br/>
            <small>What would you like to do?</small>
            </h1>

            <Grid>
              <Row>
                <Col sm={2}/>
                <Col sm={8}> <Button bsSize="large" block>Complete Your Profile</Button>  </Col>
                <Col sm={2}/>
              </Row>
            </Grid>

          </Jumbotron>

        </div>
        <div>
          {/*<HomeNav />*/}
        </div>
      </div>
    )
  }
}

module.exports = Home;