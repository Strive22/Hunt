import React from 'react';
import { browserHistory } from 'react-router';
import { PageHeader } from 'react-bootstrap';
import axios from 'axios';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentUser: {}
    }
  }

  componentDidMount () {
    // check for user - if there is one, they'll go to the react router user path
    if (this.state.currentUser._id) {
      const path = `/home/${this.state.currentUser._id}`;
      browserHistory.push(path);
    } else {
      // if no user, get it
      axios.get('http://localhost:3000/login')
        .then((res) => {
          this.setState({
            currentUser: res.data
          });
          const path = `/home/${this.state.currentUser._id}`;
          browserHistory.push(path);
        });
    }
  }

  render() {
    return (
      <div>
        <PageHeader bsClass="page-header hunt">Hunt</PageHeader>
        <div>
          {this.renderChildrenWithProps()}
        </div>
      </div>
    )
  }

  //search for jobs via the 3P API calls
  searchForJobs() {

  }

  //add a job to interested
  addJobToInterested(jobData) {
    let description = jobData.description.substr(0,700) + '...';
    axios.post(`http://localhost:3000/${this.state.currentUser._id}/jobs?q=interested`, {
        api: jobData.api,
        apiSpecificId: jobData.id,
        title: jobData.title,
        company: jobData.company,
        location: jobData.location,
        link: jobData.url,
        description: description
    })
    .then(res => {
      const updateUser = Object.assign({}, this.state.currentUser);
      updateUser.interested = updateUser.interested.concat(res.data.interested)
      updateUser.jobContent = updateUser.jobContent.concat(res.data.jobContent)
      this.setState({
        currentUser: updateUser      
      })
    })
  }

  //add a job to inProgress
  addJobToInProgress() {
    axios.post()
  }

  //add a job to complete
  addJobToComplete() {
    axios.post()
  }

  //remove a job from any list
  removeJob() {

  }

  //update job content
  updateJobContent() {

  }

  renderChildrenWithProps () {
    // add props to all the children of app
    return React.Children.map(this.props.children, (child) => {
      switch (child.type.name) {
        case "Home" :
          // home needs . . . 
          return React.cloneElement(child, {
            userName: this.state.currentUser.name,
            //in case we want the google pic
            userPhoto: this.state.currentUser.image,
            //potentially for search result stuff
            interested: this.state.currentUser.interested,
            searchForJobs: this.searchForJobs.bind(this),
            addJobToInterested: this.addJobToInterested.bind(this)
          });
          break;
        case "Dashboard" :
          // dashboard needs . . . 
          return React.cloneElement(child, {
            //duh
            interested: this.state.currentUser.interested,
            inProgress: this.state.currentUser.inProgress,
            complete: this.state.currentUser.complete,
            jobContent: this.state.currentUser.jobContent,
            addJobToInterested: this.addJobToInterested.bind(this),
            addJobToInProgress: this.addJobToInProgress.bind(this),
            addJobToComplete: this.addJobToComplete.bind(this),
            removeJob: this.removeJob.bind(this)
          });
          break;
        case "EditProfile" :
          // editprofile needs . . . 
          return React.cloneElement(child, {
            currentUser: this.state.currentUser,
          });
          break;
        case "Connect" :
          // connect needs . . . 
          return React.cloneElement(child, {
            userName: this.state.currentUser.name,
            userEmail: this.state.currentUser.email,
            userTech: this.state.currentUser.tech || '',
            userLocation: this.state.currentUser.location || '',
          });
          break;        
        default :
          return child;
      }
    });
  }

}

module.exports = App;
