const React = require('react');
import { browserHistory,Link} from 'react-router';

class Connect extends React.Component {
  render() {
    return (

      <div>
     <h1> Helloo Connect</h1>
      <Link to="Dash">View DashBoard</Link>
      <br/>
      <Link to="search">searchforJob</Link>


      </div>

    )
  }
}

module.exports = Connect;
