import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
// import Avatar from 'material-ui/lib/avatar';

export default React.createClass({

  render: function() {

    const getPicPath = x => '/api/photo?type=thumb&path=' + encodeURIComponent(x.filePath + x.fileName)

    return (
      <ListItem
        value={this.props.value}
        primaryText={this.props.fileName} />
    );
  },

});
