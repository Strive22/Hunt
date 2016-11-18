import React from 'react';
import { browserHistory } from 'react-router';
import { PageHeader } from 'react-bootstrap';
import axios from 'axios';
import querystring from 'querystring';
import job from '../models/jobModel'

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentUser: {},
      searchResults: []
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
        })
        .catch(err => {
          browserHistory.push('/login')
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
  searchForJobs(searchDetails) {

    // searchNewJobs returns a promise that resolves into an array of job objects
    job.searchNewJobs(searchDetails)
      .then(res => {
        this.setState({
          searchResults: res
        })
      })
  }

  //add job to interested
  //TODO: way to make one function that adds a job either to interested or to inProgress
  addJobToInterested(jobData) {
    // let description = jobData.description.substr(0,700) + '...';
    axios.post(`http://localhost:3000/users/${this.state.currentUser._id}/jobs?q=interested`, querystring.stringify({
          api: jobData.api,
          apiSpecificId: jobData.apiSpecificId,
          title: jobData.title,
          company: jobData.company,
          location: jobData.location,
          link: jobData.link,
          description: jobData.description
      })
    )
    .then(res => {
      let userId = this.state.currentUser._id
      axios.get(`http://localhost:3000/users/${userId}`)
        .then(res => {
          let updateUser = Object.assign({}, this.state.currentUser);
          //assuming these return the entire array
          updateUser.interested = res.data.interested;
          updateUser.jobContent = res.data.jobContent;
          console.log('update user:', updateUser)
          this.setState({
            currentUser: updateUser
          })
        })
    })
  }



  //add a job to inProgress
  addJobToInProgress(jobData) {
    //jobData comes from the props of the JobListItem
    axios.put(`http://localhost:3000/users/${this.state.currentUser._id}/jobs/${jobData.jobId}/inProgress`)
    .then(res => {
      let updateUser = Object.assign({}, this.state.currentUser);
      updateUser.interested = res.data.interested;
      updateUser.inProgress = res.data.inProgress;
      updateUser.complete = res.data.complete;
      this.setState({
        currentUser: updateUser
      })
    })
  }

  //add a job to complete
  addJobToComplete(jobData) {
    //jobData comes from the props of the JobListItem
    axios.put(`http://localhost:3000/users/${this.state.currentUser._id}/jobs/${jobData.jobId}/complete`)
    .then(res => {
      let updateUser = Object.assign({}, this.state.currentUser);
      updateUser.interested = res.data.interested;
      updateUser.inProgress = res.data.inProgress;
      updateUser.complete = res.data.complete;
      this.setState({
        currentUser: updateUser
      })
    })
  }

  //remove a job from any list
  removeJob(jobData) {
    let list = jobData.currentList;
    axios.delete(`http://localhost:3000/users/${this.state.currentUser._id}/jobs/${jobData.jobId}/${jobData.currentList}`)
    .then(res => {
      let updateUser = Object.assign({}, this.state.currentUser);
      updateUser[list] = res.data[list];
      this.setState({
        currentUser: updateUser
      })
    })
  }

  //TODO: do we need this?
  updateUserEnteredJob(jobData) {
    axios.put(`http://localhost:3000/jobs/${jobData._id}`)
  }

  //update job content
  updateJobContent(content) {
    axios.put(`http://localhost:3000/users/${this.state.currentUser._id}/jobs/${content.job_id}/content`)
    .then(res => {
      let updateUser = Object.assign({}, this.state.currentUser);
      updateUser.jobContent = res.data.jobContent;
      this.setState({
        currentUser: updateUser
      })
    })
  }

  renderChildrenWithProps () {
    // add props to all the children of app
    return React.Children.map(this.props.children, (child) => {
      switch (child.type.name) {
        case "Home" :
          // home needs . . .
          return React.cloneElement(child, {
            userName: this.state.currentUser.name,
            userId: this.state.currentUser._id,
            //in case we want the google pic
            userPhoto: this.state.currentUser.image,
            //potentially for search result stuff
            interested: this.state.currentUser.interested,
            searchForJobs: this.searchForJobs.bind(this),
            addJobToInterested: this.addJobToInterested.bind(this),
            searchResults: this.state.searchResults
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
