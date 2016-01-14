import React from 'react';
import DirListItem from './dir-list-item';
import FileListItem from './file-list-item';

export default React.createClass({
  render: function() {
    return this.props.entity.isFile
      ? <FileListItem {...this.props.entity} />
      : <DirListItem label={this.props.entity.fileName} tapHandler={this.props.tapHandler} />;
  },
});
