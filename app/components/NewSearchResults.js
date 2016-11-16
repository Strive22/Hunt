import React from 'react';
import { Grid, Row, Col, Nav, NavItem } from 'react-bootstrap';
// import


class NewSearchResults extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      results: props.searchResults
    }
  }

  handleSelect(eventKey) {
    event.preventDefault();
    alert(`selected ${eventKey}`);
  }

  render() {
    return (
      <Grid>

        <Row>

          <Col md={12}>
            <div className="selectbox">
            <Nav bsStyle="tabs" activeKey="1" onSelect={this.handleSelect}>
              <NavItem eventKey="1"> Github{/* {this.props.provider}*/} </NavItem>
              {/* this is where we will render the JobList component */}
            </Nav>
            </div>
          </Col>

        </Row>

      </Grid>
    )
  }
}

module.exports = NewSearchResults;
