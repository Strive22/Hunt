import React from 'react'; 

class TaskList extends React.Component{ 

 render(){
 	return(
 		<div class="sticky"> 
 		 <i className="fa fa-sticky-note" color="yellow" aria-hidden="true">
 		
 		{this.props.notes.map(function(user,i){
 			return(

  
              <div>
         
           {user} 

             <i className="fa fa-trash-o" aria-hidden="true"> </i>

            
              </div>
              

 				)
 		})}
       
 		 </i>
 		</div>
    
      
     
 		)
 
     }

}


module.exports = TaskList ;