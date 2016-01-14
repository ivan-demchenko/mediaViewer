import React from 'react';
import R from 'ramda';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import service from '../service';
import Streams from '../streams';

export default React.createClass({

  getInitialState: function() {
    return { items: [] };
  },

  componentDidMount: function() {
    service.getHomeItems().then(R.compose(this.setState.bind(this), R.objOf('items')));
  },

  navigate: function(homeItem) {
    Streams.pathBus.push(homeItem.basePath);
  },

  render: function() {

    const itemToListItems = R.map((i) => <ListItem
      key={Math.random()}
      primaryText={i.label}
      onTouchTap={this.navigate.bind(this, i)}
      secondaryText={i.basePath}/>
    );

    return (<List>{ itemToListItems(this.state.items) }</List>);

  },

});
