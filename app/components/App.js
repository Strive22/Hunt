import React from 'react';
import { browserHistory, Link } from 'react-router';
import { PageHeader, Glyphicon } from 'react-bootstrap';
import axios from 'axios';
import querystring from 'querystring';
import job from '../models/jobModel';
import user from '../models/userModel';

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
      axios.get('/login')
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
        <PageHeader bsClass="page-header hunt">
          <Link className="main-home" to ={`/home/${this.state.currentUser._id}`}>
            Hunt
          </Link>
          <Link className="hamburger" to='/edit'>
            <Glyphicon glyph="menu-hamburger" />
          </Link>
        </PageHeader>
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

  //add job to a user, this defaults to adding it to the interested queue
  addJob(jobDetails) {
    // Pull the userId from state
    let userId = this.state.currentUser._id

    // trim down the descrption to a reasonable length NOTE: Changing this because let's add the whole description to the db and trim to render
//     jobDetails.description = jobDetails.description.substr(0,700) + '...';

    // Use our job model to add the job
    job.addJob(jobDetails, userId)
      .then(res => {
        // then our user model to pull the updated information from the database
        user.getUserById(userId)
          .then(user => {
            // and set that to state
            this.setState({
              currentUser: user
            })
          })
      })
  }

  //add a job to inProgress
  addJobToInProgress(jobData) {
    //jobData comes from the props of the JobListItem
    axios.put(`/users/${this.state.currentUser._id}/jobs/${jobData.jobId}/inProgress`)
    .then(res => {
      this.setState({
        currentUser: res.data
      })
    })
    .catch(err => {
      throw err;
    })
  }

  //add a job to complete
  addJobToComplete(jobData) {
    //jobData comes from the props of the JobListItem
    axios.put(`/users/${this.state.currentUser._id}/jobs/${jobData.jobId}/complete`)
    .then(res => {
      let updateUser = Object.assign({}, this.state.currentUser);
      updateUser.interested = res.data.interested;
      updateUser.inProgress = res.data.inProgress;
      updateUser.complete = res.data.complete;
      this.setState({
        currentUser: updateUser
      })
    })
    .catch(err => {
      throw err;
    })
  }

  //remove a job from any list
  removeJob(jobData) {
    let list = jobData.currentList;
    axios.delete(`/users/${this.state.currentUser._id}/jobs/${jobData.jobId}/${jobData.currentList}`)
    .then(res => {
      let updateUser = Object.assign({}, this.state.currentUser);
      updateUser[list] = res.data[list];
      this.setState({
        currentUser: updateUser
      })
    })
  }

  //TODO: do we need this? NOTE NOTE NOTE: I Do not know.... but my gut says no right now.
  updateUserEnteredJob(jobData) {
    axios.put(`/jobs/${jobData._id}`)
  }

  //update job content
  updateJobContent(content) {
    axios.put(`/users/${this.state.currentUser._id}/jobs/${content.job_id}/content`)
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
            addJob: this.addJob.bind(this),
            userName: this.state.currentUser.name,
            userId: this.state.currentUser._id,
            //in case we want the google pic
            userPhoto: this.state.currentUser.image,
            //potentially for search result stuff
            interested: this.state.currentUser.interested,
            searchForJobs: this.searchForJobs.bind(this)
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
            addJob: this.addJob.bind(this),
            addJobToInProgress: this.addJobToInProgress.bind(this),
            addJobToComplete: this.addJobToComplete.bind(this),
            removeJob: this.removeJob.bind(this)
          });
          break;
        case "EditProfile" :
          // editprofile needs . . .
          return React.cloneElement(child, {
            currentUser: this.state.currentUser
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
        case "NewSearchResults" :
          return React.cloneElement(child, {
            addJob: this.addJob.bind(this),
            searchResults: this.state.searchResults
          })
        default :
          return child;
      }
    });
  }

}

module.exports = App;
