import React from 'react';
import { browserHistory, Link} from 'react-router';
import { Jumbotron, Button, Grid, Row, Col } from 'react-bootstrap';
import HomeNav from './HomeNav';
import axios from 'axios';

class Home extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.userName,
      userPhoto: this.props.userPhoto,
      interested: this.props.interested
    }
  }


  searchNewJobs(details) {

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
          {this.props.children}
          {/* <HomeNav /> */}
        </div>
      </div>
    )
  }
}

module.exports = Home;
