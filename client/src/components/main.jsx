import React from 'react'
import R from 'ramda'
import Service from '../service'
import AppBar from 'material-ui/lib/app-bar'
import List from 'material-ui/lib/lists/list'
import IconButton from 'material-ui/lib/icon-button'
import {NavigationArrowBack} from 'material-ui/lib/svg-icons'
import DirListItem from './dir-list-item'
import FileListItem from './file-list-item'
import Dialog from 'material-ui/lib/dialog'
import Streams from '../streams'

export default React.createClass({

  getInitialState: function() {
    return {
      imageDialogOpen: false,
      imageToPreview: ''
    }
  },

  handleDirTap: function(dir) {
    Streams.currentPath.push(this.props.currentPath + dir.fileName + '/')
  },

  handleFileTap: function(dir) {
    var imageToPreview = '/preview' + dir.filePath;
    this.setState({ imageDialogOpen: true, imageToPreview: imageToPreview });
  },

  handleBackBtn: function() {
    var ops = this.props.currentPath.split('/');
    var backPath = R.compose(R.join('/'), R.take(ops.length - 2))(ops) + '/';
    Streams.currentPath.push(backPath);
  },

  previewDialogRequestedClose: function() {
    this.setState({ imageDialogOpen: false });
  },

  render: function() {
    return (
      <div>
        <AppBar
          title={this.props.currentPath}
          iconElementLeft={
            <IconButton onTouchTap={this.handleBackBtn}>
              <NavigationArrowBack />
            </IconButton>
          } />
        <List>
          {this.props.dirs.map(function(dir, i) {
            return dir.isFile
              ? <FileListItem
                  key={i}
                  label={dir.fileName}
                  avatarPath={dir.filePath}
                  tapHandler={this.handleFileTap.bind(this, dir)} />
              : <DirListItem
                  key={i}
                  label={dir.fileName}
                  tapHandler={this.handleDirTap.bind(this, dir)} />
          }.bind(this))}
        </List>
        <Dialog
          title="Image preview"
          actions={[{ text: 'Close', ref: 'close', onTouchTap: this.previewDialogRequestedClose }]}
          actionFocus="close"
          open={this.state.imageDialogOpen}
          autoDetectWindowHeight={true}
          autoScrollBodyContent={true}
          onRequestClose={this.previewDialogRequestedClose}>
          <img src={this.state.imageToPreview} />
        </Dialog>
      </div>
    );
  },

});
