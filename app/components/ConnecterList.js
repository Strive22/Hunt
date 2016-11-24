
import React from 'react';


class ConnecterList extends React.Component {

 render() {
	return (
     <div>

 {this.props.userdata.map(function (user,i) { 
  console.log("the value of user is ", user)
   return (
   <div key ={i}>

 <div className="col s12 m7">
    <div className="card horizontal">
      <div className="card-image">
     <img src={user.image} alt="http://simpleicon.com/wp-content/uploads/user-5.png"/>
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

