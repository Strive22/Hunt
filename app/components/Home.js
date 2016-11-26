import React from 'react';
import { browserHistory, Link} from 'react-router';
import { Jumbotron, Button, Grid, Row, Col, Well } from 'react-bootstrap';
import HomeNav from './HomeNav';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.userName,
      userPhoto: this.props.userPhoto,
      interested: this.props.interested
    }
  }

  render() {
    let name = this.props.userName === undefined ? 'Hey' : this.props.userName.split(' ')[0];

    return (
      <div>
        <div>

          <Jumbotron bsClass="jumbotron">

            <h1 className="motivate">{name}, you've got this.<br/>
            <small>What would you like to do?</small>
            </h1>

            <Grid>
              <Row>
                <Col sm={2}/>
                <Col sm={8}>
                  <Link to="/edit">
                    <Button className="complete-profile-btn">Complete Your Profile</Button>
                  </Link>
                </Col>
                <Col sm={2}/>
              </Row>
            </Grid>

          </Jumbotron>

        </div>
        <div>
          <HomeNav addJob={this.props.addJob} userId={this.props.userId} searchForJobs={this.props.searchForJobs}/>
        </div>
        {' '}
        <Grid>
          <Row>
            <Col className="connect-navigation" sm={12}>
              <Link to="/connect">
                <Well className="home-footer">
                  <Button className="complete-profile-btn"> Connect with Other Hunters </Button>
                </Well>
              </Link>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

module.exports = Home;
