import React from 'react';
import DirListItem from './dir-list-item';
import FileListItem from './file-list-item';

export default React.createClass({
  render: function() {
    return this.props.entity.isFile
      ? <FileListItem value={this.props.value} fileName={this.props.entity.fileName} filePath={this.props.entity.filePath} tapHandler={this.props.tapHandler} />
      : <DirListItem value={this.props.value} label={this.props.entity.fileName} tapHandler={this.props.tapHandler} />;
  },
});
