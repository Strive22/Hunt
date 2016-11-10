const React = require('react');
import { browserHistory,Link} from 'react-router';

class Hunt extends React.Component {
  render() {
    return ( 

      <div>
    <Link to="Land"> Helloo Huntinggg</Link>
    {this.props.children}


      </div>

    )
  } 
}

module.exports = Hunt;