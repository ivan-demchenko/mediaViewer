import React from 'react'
import ListItem from 'material-ui/lib/lists/list-item'
import Avatar from 'material-ui/lib/avatar'

export default React.createClass({

  handleTap: function(e) {
    this.props.tapHandler();
  },

  render: function() {
    return (
      <ListItem
        primaryText={this.props.label}
        onTouchTap={this.handleTap}
        leftAvatar={
          <Avatar src={'/photo/' + this.props.avatarPath} />
        } />
    );
  },

});
