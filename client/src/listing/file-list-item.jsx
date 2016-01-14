import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';

export default React.createClass({

  handleTap: function() {
    this.props.tapHandler();
  },

  render: function() {
    return (
      <ListItem
        primaryText={this.props.fileName}
        onTouchTap={this.handleTap}
        leftAvatar={
          <Avatar src={'/api/photo?type=thumb&path=' + encodeURIComponent(this.props.filePath + this.props.fileName)} />
        } />
    );
  },

});
