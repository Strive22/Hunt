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

  moveJob(jobData, nextList) {
    axios.put(`/users/${this.state.currentUser._id}/jobs/${jobData._id}/${nextList}`, jobData)
    .then(res => {
      this.setState({
        currentUser: res.data
      })
    })
    .catch(err => {
      throw err;
    })
  }

  //remove a job from any list
  removeJob(jobData, currentList) {
    axios.delete(`/users/${this.state.currentUser._id}/jobs/${jobData._id}/${currentList}`)
    .then(res => {
      this.setState({
        currentUser: res.data
      })
    })
  }

  //submit user-entered profile updates
  submitProfile(profileData) {
    axios.put(`/users/${this.state.currentUser._id}`,
      {
        name: profileData.name,
        email: profileData.email,
        tech: profileData.tech,
        location: profileData.location,
        otherHunters: profileData.otherHunters
      })
    .then(res => {
      this.setState({
        currentUser: res.data
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
    return React.Children.map(this.props.children, (child, idx) => {
      switch (child.type.name) {
        case "Home" :
          // home needs . . .
          return React.cloneElement(child, {
            key: idx,
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
            key: idx,
            interested: this.state.currentUser.interested,
            inProgress: this.state.currentUser.inProgress,
            complete: this.state.currentUser.complete,
            jobContent: this.state.currentUser.jobContent,
            addJob: this.addJob.bind(this),
            moveJob: this.moveJob.bind(this),
            removeJob: this.removeJob.bind(this)
          });
          break;
        case "EditProfile" :
          // editprofile needs . . .
          return React.cloneElement(child, {
            key: idx,
            currentUser: this.state.currentUser,
            submitProfile: this.submitProfile.bind(this)
          });
          break;
        case "Connect" :
          // connect needs . . .
          return React.cloneElement(child, {
            key: idx,
            userName: this.state.currentUser.name,
            userEmail: this.state.currentUser.email,
            userTech: this.state.currentUser.tech || '',
            userLocation: this.state.currentUser.location || '',
          });
          break;
        case "NewSearchResults" :
          return React.cloneElement(child, {
            key: idx,
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
