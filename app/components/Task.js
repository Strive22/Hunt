import React from 'react';  
import Tasklist from './Tasklist'; 
import axios from 'axios'; 


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
		axios.get(`/users/${user}/${job}`)
      .then(response => {  
       console.log("hellooo response", response); 
        return response.data
      }).then(data =>{ 
      	this.setState({
      		items : data.notes
      	   })

      }).catch(err =>{
      	console.log("err in the",err)
      })
      
    }

     addItem(){
		event.preventDefault() 
		let userid = this.props.userid; 
		let jobid = this.props.Jobid;
		let content = this.enterTask.value;  
		console.log("the user id", userid); 
		console.log("the job id", jobid); 
		 axios.post(`/users/${userid}/${jobid}/${content}`)
	 	.then(response => {
	 		console.log("hello response", response);
	 	}).catch(error => {
	 		console.log("the error", error);
	 	})

		
     }
		


		



	render(){ 
	 console.log("the items in theee", this.state.items);
		return(
        <div className="todoListMain">
          <div className="header">
            <form onSubmit= {this.addItem.bind(this)}>
              <input placeholder = "enterTask"  ref = {(value) => this.enterTask = value}/>
              <button type="submit">add</button>
            </form>
          </div>
       
			<Tasklist notes = {this.state.items}/>
			 </div>

	 )
	}
	
}
	

module.exports = Task;