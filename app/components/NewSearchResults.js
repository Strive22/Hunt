import React from 'react';
import { Grid, Row, Col, Nav, NavItem, Button } from 'react-bootstrap';
// import


class NewSearchResults extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      results: this.props.searchResults
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      results: this.props.searchResults
    })
  }

  render() {
    return (
      <Grid>

        <Row>

          <Col md={12}>
            <div className="selectbox">
            <Nav bsStyle="tabs" activeKey="1">
              <NavItem eventKey="1"> Github{/* {this.props.provider}*/} </NavItem>
              {/* this is where we will render the JobList component */}
            </Nav>
            </div>
          </Col>

        </Row>

        <Button onClick={()=>{console.log(this.state)}}>Get some state</Button>
      </Grid>
    )
  }
}

module.exports = NewSearchResults;
