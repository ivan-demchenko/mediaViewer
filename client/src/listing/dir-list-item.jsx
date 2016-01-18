'use strict';

import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import {FileFolder} from 'material-ui/lib/svg-icons';

export default React.createClass({

  handleTap: function() {
    this.props.tapHandler();
  },

  render: function() {
    return (
      <ListItem
        value={this.props.value}
        primaryText={this.props.label}
        leftIcon={<FileFolder />}
        onTouchTap={this.handleTap} />
    );
  },

});
