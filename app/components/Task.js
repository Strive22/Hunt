import React from 'react';  
import axios from 'axios';  
import notesModel from '../models/notesmodel';


class Task extends React.Component{ 
	constructor(){
		super(); 
		this.state ={
			items :[], 
			enterTask :''
		}
	}  

	componentDidMount () {
		let user = this.props.userid; 
		let job = this.props.Jobid; 
		notesModel.getNotes(user,job)
		.then(response => this.setState({
			items:response.notes
		}))
      
    }

     addItem(e){
		e.preventDefault() 
		let userid = this.props.userid; 
		let jobid = this.props.Jobid;
		let content = this.enterTask.value;  
		 
		 axios.post(`/users/${userid}/${jobid}/${content}`)
	 	.then(() => 
	 		notesModel.getNotes(userid,jobid)
	 	 ).then(response => 
	 	   this.setState({
			items:response.notes
		}))

	 	.catch(error => {
	 		console.log("the error", error);
	 	})

		
     } 

     buttonTest(e){ 
     	e.preventDefault()
     	console.log("helloo u r in the trash button")

     }


	render(){ 
	 console.log("the items in theee", this.state.items);
		return(
        <div className="quote-container note yellow">
        
          <div>
          <i class="pin"></i>

            <form onSubmit= {this.addItem.bind(this)}>
              <input placeholder = "enterTask"  ref = {(value) => this.enterTask = value}/>
              <button type="submit">add</button>
            </form>
          </div>
       
			{this.state.items.map(function(user,i){
 			return(
              <div>
  
           {user} 

             <i className="fa fa-trash-o" aria-hidden="true"> </i>

            
              </div>
              

 				)
 		    })}
			 </div>

	 )
	}
	
}
	

module.exports = Task;