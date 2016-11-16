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
      keyword: event.target.value
    });
  };

  handleProvider(event) {
    let provider = event.target.value;
    let providersCopy = [...this.state.providers];

    let newProviders = this.state.providers.includes(provider) ? providersCopy.filter(prov => prov !== provider) : providersCopy.push(provider);

    console.log(event.target)
    this.setState({providers: newProviders});

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

            <HelpBlock>Enter search terms seperated by commas.</HelpBlock>

            <ButtonGroup>
              <Button value="gh" onClick={this.handleProvider.bind(this)}>Github</Button>
              <Button value="in" onClick={this.handleProvider.bind(this)}>Indeed</Button>
              <Button value="aj" onClick={this.handleProvider.bind(this)}>Authentic Jobs</Button>
            </ButtonGroup>

            <Link to="/searchResults">
              <Button type="submit" onSubmit={e => {
                e.preventDefault()
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
