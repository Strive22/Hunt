import React from 'react';
import { FormControl, ButtonGroup, FormGroup, HelpBlock, Button } from 'react-bootstrap';
import { Link } from 'react-router';


class SearchNewJobs extends React.Component {

  constructor() {
    super()
    this.state = {
      keywords: '',
      providers: []
    };
  }

  handleKeyword(event) {
    this.setState({
      keywords: event.target.value
    });
  };

  handleProvider(event) {
    let newProvider = event.target.value;
    let providers = this.state.providers;

    if (providers.includes(newProvider)) {
      providers = providers.filter(prov => prov !== newProvider)
    } else {
      providers.push(newProvider)
    }

    this.setState({providers: providers});

  };

  render() {
    return (
      <div className="selectbox">

        <h2>Search<br/>for a Job</h2>

        <form>
          <FormGroup
            controlId="keywords"
          >
            <FormControl
              type="text"
              value={this.state.keywords}
              placeholder="Get Hired!"
              onChange={this.handleKeyword.bind(this)}
            />

            <HelpBlock>Enter search terms seperated by commas.</HelpBlock>

            <ButtonGroup>
              <Button value="gh" onClick={this.handleProvider.bind(this)}>Github</Button>
              <Button value="in" onClick={this.handleProvider.bind(this)}>Indeed</Button>
              <Button value="aj" onClick={this.handleProvider.bind(this)}>Authentic Jobs</Button>
            </ButtonGroup>

            <Link to="/searchResults">
              <Button type="submit" onClick={(e) => {
                this.props.search(this.state)
              }}>
                Submit
              </Button>
            </Link>

          </FormGroup>
        </form>
        <Button onClick={e => {console.log('State', this.state, 'Props', this.props)}}>Log stuff!</Button>
      </div>
    )
  }

}

module.exports = SearchNewJobs
