import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';

export default React.createClass({

  render: function() {
    return this.props.entity.isFile
      ? <ListItem
        value={this.props.value}
        primaryText={this.props.fileName} />
      : <ListItem
        value={this.props.value}
        primaryText={this.props.label} />;
  }

});
