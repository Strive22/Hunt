import React from 'react';
import { Grid, Row, Col, Nav, NavItem, Button } from 'react-bootstrap';
import JobList from './JobList'
import SearchResultsList from './SearchResultsList'

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
                  <SearchResultsList jobs={this.state.results} addJobToInterested={this.props.addJobToInterested}/>
          </Col>

        </Row>
      </Grid>
    )
  }
}

module.exports = NewSearchResults;
