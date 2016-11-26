import React from 'react';
import { Well } from 'react-bootstrap';

class ConnecterList extends React.Component {

  render() {
    return (
      <div>    

      {this.props.userdata.map(function (user,i) { 
        let email = `mailto:${user.email}`;
        return (
          <div key={i}>
            <div className="card horizontal">
              <div className="card-image">
                <img src={user.image} alt="http://simpleicon.com/wp-content/uploads/user-5.png"/>
              </div>
              <div className="card-content">
                <p className="fa fa-user" aria-hidden="true">{user.name}</p>
                <p className="fa fa-envelope" aria-hidden="true"><a href={email}>Send {user.name} an email</a></p>
              </div>
              <div className="card-action">
                <p>Tech: {user.tech}</p>
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

