import React from 'react';
import { Grid, Row, Col, Nav, NavItem, Button } from 'react-bootstrap';
import JobList from './JobList'


class NewSearchResults extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      results: this.props.searchResults
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      results: nextProps.searchResults
    })
  }

  render() {

    return (
      <Grid>

        <Row>

          <Col md={12}>

            <div className="search-results">
              {/* <Nav bsStyle="tabs" activeKey="1"> */}
                {/* <NavItem eventKey="1"> Pick your favorites! </NavItem> */}
                {/* <JobList /> */}
              {/* </Nav> */}
            </div>

          </Col>

        </Row>

        <Button onClick={()=>{console.log(this.state)}}>Get some state</Button>
      </Grid>
    )
  }
}

module.exports = NewSearchResults;
