
import React from 'react';
// import SweetAlert from 'sweetalert-react';
class ConnecterList extends React.Component{


 render() {
 	console.log("the ConnecterList")
	return (
     <div>
 
 {this.props.userdata.map(function (user,i) {
   return (
   <div key ={i}>

 <div className="col s12 m7">
    <div className="card horizontal">
      <div className="card-image">
        <img src="http://lorempixel.com/100/190/nature/6"/>
      </div>
      <div className="card-stacked">
      
        <div className="card-content">
        <p><i className="fa fa-user" aria-hidden="true">{user.name}</i></p>
         <p><i className="fa fa-envelope" aria-hidden="true">{user.email}</i></p>
        </div>
        <div className="card-action">
        <p>{user.tech}</p>
        </div>
      </div>
    </div>
  </div>

  
  

    </div>

   )
       })}
     </div>
  
    )
}
}

module.exports = ConnecterList;

