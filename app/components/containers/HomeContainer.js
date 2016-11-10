import React from 'react';
import { browserHistory, Link} from 'react-router';
import Home from '../layouts/Home'

class HomeContainer extends React.Component {

  // componentDidMount(){
  //   //update the store with the user's information.
  //   // and pass that into home somehow....
  // }

  render() {
    return (
      <Home />
    )
  }
}

module.exports = HomeContainer;
//
//
// import React from 'react';
// import { connect } from 'react-redux';
// import WidgetList from '../views/widget-list';
// import * as widgetApi from '../../api/widget-api';
// import store from '../../store';
// import { loadSearchLayout } from '../../actions/search-layout-actions';
//
// const WidgetListContainer = React.createClass({
//
//   componentDidMount: function() {
//     widgetApi.getWidgets();
//     store.dispatch(loadSearchLayout('widgets', 'Widget Results'));
//   },
//
//   render: function() {
//     return (
//       <WidgetList widgets={this.props.widgets} deleteWidget={widgetApi.deleteWidget} />
//     );
//   }
//
// });
//
// const mapStateToProps = function(store) {
//   return {
//     widgets: store.widgetState.widgets
//   };
// };
//
// export default connect(mapStateToProps)(WidgetListContainer);
