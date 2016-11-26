import React from 'react';  
import axios from 'axios';  
import { Button } from 'react-bootstrap';
import notesModel from '../models/notesmodel';

class Notes extends React.Component{ 
	constructor(props){
		super(props); 
		this.state = {
			notes: [], 
			enterNotes: ''
		}
	}  

	componentDidMount () {
		let user = this.props.userid; 
		let job = this.props.Jobid; 
		notesModel.getNotes(user, job)
		.then(response => 
      this.setState({
        notes: response.notes
		  })
    )
  }

  addNote(e) {
		e.preventDefault() 
		let userid = this.props.userid; 
		let jobid = this.props.Jobid;
		let content = this.enterNotes.value;  
		 
		axios.post(`/users/${userid}/${jobid}/${content}`)
  	 	.then(() => 
  	 		notesModel.getNotes(userid,jobid))
      .then(response => 
  	 	  this.setState({
  		  notes: response.notes,
        enterNotes: ""
  		}))
  	 	.catch(error => {
  	 		console.log("the error", error);
  	 	})
   } 

	render() { 
		return (
      <div className="sticky">
        <div>
        <i className="pin"></i>
          <form onSubmit= {this.addNote.bind(this)}>
            <input className="sticky-note" placeholder="Enter a note." ref={(value) => this.enterNotes = value}/>
            <Button className="sticky-button" type="submit">Add Note</Button>
          </form>
        </div>
        <div>
          <ul>
            {this.state.notes.map((item, i) => {
       			  return (
                <li key={i}>
                 {item}
                 <br/>
                </li>
       				)
            })}
          </ul>
        </div>
      </div>
    )
	}
	
}
	
module.exports = Notes;

