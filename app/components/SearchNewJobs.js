import React from 'react';
import { FormControl, ButtonToolbar, FormGroup, HelpBlock, Button } from 'react-bootstrap';
import { Link } from 'react-router';


class SearchNewJobs extends React.Component {

  constructor() {
    super()
    this.state = {
      keywords: '',
      providers: [],
      location: '',
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

  handleLocation(event) {
    this.setState({
      location: event.target.value
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

        <form className="search-form">
          <FormGroup
            controlId="keywords"
          >
            <FormControl
              className="form-text-input search"
              type="text"
              value={this.state.keywords}
              placeholder="Separate search terms with commas."
              onChange={this.handleKeyword.bind(this)}
            /><br/>
            <FormControl
              className="form-text-input search"
              type="text"
              value={this.state.location}
              placeholder="Enter location in format: Austin,TX"
              onChange={this.handleLocation.bind(this)}
            />
            <br/>
            <div className="search-btn-group">
              <Button className="search-btn" active={ this.state.active.gh } value="gh" onClick={ this.handleProvider.bind(this) }>Github</Button>
              {' '}
              <Button className="search-btn" active={ this.state.active.aj } value="aj" onClick={ this.handleProvider.bind(this) }>Authentic Jobs</Button>
              {' '}
              <Button className="search-btn" active={ this.state.active.in } value="in" onClick={ this.handleProvider.bind(this) }>Indeed</Button>
            </div>
            <div className="search-btn-enter">
              <Link to="/searchResults">
                <Button type="submit" onClick={(e) => {
                  // create the object to be passed to the function
                  let details = {}

                  // add properties to that object with the stuff in state
                  details.keywords = this.state.keywords
                  details.providers = this.state.providers
                  details.location = this.state.location

                  // call that function with the details object
                  this.props.search(details)
                }}>
                  Search
                </Button>
              </Link>
            </div>
          </FormGroup>
        </form>
      </div>
    )
  }

}

module.exports = SearchNewJobs
