#Hunt:

##Features

###MVP
  * Google authentication
  * Indeed and AngelList APIs
    - Search for jobs by user keyword input
  * Allow users to save jobs to "Interested"/Favorites list
    - Users can associate notes with specific jobs
  * Move Jobs from "Interested" to "In progress"
    - Application deadline
    - Materials required
    - Uploading static PDF of application materials
  * Move jobs from "In Progress" to "Complete"
    - Input application sent date & keep realtime elapsed tracker
    - Input Interview date & export to Google calendar
    - Option to track rejection
  * Find other users in your area
    - users can opt-in for location community
    - results return name, tech skills, goals, contact,



###Stretch Goals
  * Google Docs Integration with "In Progress Jobs"
  * Map of Job location
  * Meet up Integration
  * Resume Review
  * Changing motivational message upon login
  * "Show me more" option in Dashboard, rather than all jobs shown


##Team
**Product Owner:** [Brittany Artimez](https://github.com/bartimez)

**Scrum Master:** [Scott Charles Harris Horn](https://github.com/Scotthorn0)

**Software Developer:** [Arvin Wallace](https://github.com/arvinwallace)

**Software Developer:** [Tulasi Bandi](https://github.com/TulasiBandi)

##Routes

### Users

Route  | Type  | Action
 :---: | :---: | ---

/api/users/ | GET: | all users
/api/users/ | POST: | create user

/api/users/:userid | GET: | specific user
/api/users/:userid | PUT: | update user

/api/users/:userid/jobs               | GET:    | all user's jobs
/api/users/:userid/jobs               | POST:   | save or create & save job
/api/users/:userid/jobs/:jobid/:queue | PUT:    | move job to a different queue
/api/users/:userid/jobs/:jobid/:queue | DELETE: | delete job from a queue

/api/users/:userid/jobs/:jobid/content | PUT: | update job content

## Jobs

/api/jobs/:jobid | GET: | get job
/api/jobs/:jobid | PUT: | update job

### Search

Route | Type  | Action
:---: | :---: | ---

/api/search/gh/:searchterms/ | GET: | makes API call to GitHub Jobs
/api/search/aj/:searchterms/ | GET: | makes API call to Authentic Jobs
/api/search/in/:searchterms/ | GET: | makes API call to Indeed



##Components

(R) => React Router

(B) => React Bootstrap

* APP (R)
  * HOME (R)
    * Jumbotron (B)
    * HOMELAYOUT (R)
      * NAV (R)
        * ViewDash
        * SearchJobs
        * EnterJob
      * NewSearchResults
        * JOBLIST (R)
          * JobListItem
            * Modal (B)
              * Job
                * JobContent
                  * Notes
                  * Actions
                  * Details
  * DASHBOARD (R)
    * DashLayout
      * JobList (and all assoc'd subcomponents)
  * PROFILE (R)
    * Materials
  * CONNECT (R)
    * Hunter


## Color Palette

Purple from login button: #8a7089, #d0abcf
Grayish blue from table: #555f68
Matching paleish blue: #d9edf7
Light sea green from card: #b3cece
Pale red: #e3d8da
Peachy light brown: #d6baa8

