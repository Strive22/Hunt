import React from 'react';
import { FormControl, ButtonGroup, FormGroup, HelpBlock, Button } from 'react-bootstrap';
import { Link } from 'react-router';


class SearchNewJobs extends React.Component {

  constructor() {
    super()
    this.state = {
      keywords: '',
      providers: [],
      toggle: 'primary',
      active: {
        gh: false,
        in: false,
        aj: false
      }
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
    this.toggleButton(newProvider)

    this.setState({
      providers: providers,
    });
  };

  toggleButton(provider) {
    let newStatus = this.state.active;

    newStatus[provider] = newStatus[provider] ? false : true;

    this.setState({
      active: newStatus
    })
  }

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
              <Button active={ this.state.active.gh } bsStyle={ this.state.toggle } value="gh" onClick={ this.handleProvider.bind(this) }>Github</Button>
              <Button active={ this.state.active.in } bsStyle={ this.state.toggle } value="in" onClick={ this.handleProvider.bind(this) }>Indeed</Button>
              <Button active={ this.state.active.aj } bsStyle={ this.state.toggle } value="aj" onClick={ this.handleProvider.bind(this) }>Authentic Jobs</Button>
            </ButtonGroup>

            <Link to="/searchResults">
              <Button type="submit" onClick={(e) => {
                // create the object to be passed to the function
                let details = {}

                // add properties to that object with the stuff in state
                details.keywords = this.state.keywords
                details.providers = this.state.providers

                // call that functions with the details object
                this.props.search(details)
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
