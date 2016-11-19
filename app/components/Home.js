import React from 'react';
import { browserHistory, Link} from 'react-router';
import { Jumbotron, Button, Grid, Row, Col } from 'react-bootstrap';
import HomeNav from './components/HomeNav';


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

    const childrenWithProps = React.Children.map(this.props.children, (child) => {
      console.log(child.type.name)
      switch (child.type.name) {
        case "p" :
        return React.cloneElement(child, {
          userId: this.props.userId,
          searchForJobs: this.props.searchForJobs
        });
        case "NewSearchResults" :
        return React.cloneElement(child, {
          addJobToInterested: this.props.addJobToInterested,
          searchResults: this.props.searchResults
        })
      }
    })


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
          <HomeNav/>
        </div>
      </div>
    )
  }
}

module.exports = Home;
