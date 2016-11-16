import React from 'react';
import { FormControl, FormGroup, HelpBlock, Button } from 'react-bootstrap';
import { Link } from 'react-router';


class SearchNewJobs extends React.Component {

  constructor() {
    super()
    this.state = {
      keyword: '',
      provider: ''
    };
  }

  handleKeyword(event) {
    this.setState({
      keyword: event.target.value
    });
  };

  handleProvider(event) {
    this.setState({
      provider: event.target.value
    });
  };

  render() {
    return (
      <div className="selectbox">

        <h2>Search<br/>for a Job</h2>

        <form>
          <FormGroup
            controlId="keyword"
          >
            <FormControl
              type="text"
              value={this.state.keyword}
              placeholder="Get Hired!"
              onChange={this.handleKeyword.bind(this)}
            />
            <FormControl.Feedback />
            <HelpBlock>Enter search terms seperated by commas.</HelpBlock>

            <FormControl
              componentClass="select"
              placeholder="select a provider"
              onChange={this.handleProvider.bind(this)}>
              <option value="gh">Github</option>
              <option value="in">Indeed</option>
              <option value="aj">Authentic Jobs</option>
            </FormControl>

            <Link to="/searchResults">
              <Button type="submit" onSubmit={e => {
                e.preventDefault()
              }}>
                Submit
              </Button>
            </Link>

          </FormGroup>
        </form>
        <Button onClick={e => {console.log(this.state)}}>Log State</Button>
      </div>
    )
  }

}

module.exports = SearchNewJobs
