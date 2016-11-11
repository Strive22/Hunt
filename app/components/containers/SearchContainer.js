import React from 'react';
import { browserHistory, Link} from 'react-router';
import SearchJobs from '../views/SearchJobs';

class SearchContainer extends React.Component {

  constructor() {
    super()
    this.state = {
      keyword: '',
      jobProvider: 'github'
    }
  }

  handleKeywordChange(event) {
    this.setState({
      keyword: event.target.value
    })
  }

  handleJobProviderChange(event) {
    this.setState({
      jobProvider: event.target.value
    })
  }

  logThatState(){
    console.log(this.state)
  }


  render() {
    return (
      <SearchJobs providerChange={this.handleJobProviderChange.bind(this)} keywordChange={this.handleKeywordChange.bind(this)} state={this.state} logIt={this.logThatState.bind(this)}/>
    )
  }
}

module.exports = SearchContainer;
