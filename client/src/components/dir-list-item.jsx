import React from 'react'
import ListItem from 'material-ui/lib/lists/list-item'
import {FileFolder} from 'material-ui/lib/svg-icons'

export default React.createClass({

  handleTap: function(e) {
    this.props.tapHandler();
  },

  render: function() {
    return (
      <ListItem
        primaryText={this.props.label}
        onTouchTap={this.handleTap}
        leftIcon={<FileFolder />} />
    );
  },

});
