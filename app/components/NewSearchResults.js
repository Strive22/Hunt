import React from 'react';
import { Grid, Row, Col, Nav, NavItem, Button, Well } from 'react-bootstrap';
import JobList from './JobList';
import SearchResultsList from './SearchResultsList';
// import Spinner from 'react-spinkit';

class NewSearchResults extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      results: this.props.searchResults,
      spinner: true
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      results: nextProps.searchResults,
      spinner: false
    })
  }

  render() {
    // let spinner = this.state.spinner ? <Spinner spinnerName="pulse" /> : null;
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <Well>
              <h1>Look at all these jobs!!</h1>
            </Well>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {/* {spinner} */}
            <SearchResultsList jobs={this.state.results} addJob={this.props.addJob}/>
          </Col>
        </Row>

      </Grid>
    )
  }
}

module.exports = NewSearchResults;
