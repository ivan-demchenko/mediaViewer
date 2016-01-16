import React from 'react';
import B from 'baconjs';
import R from 'ramda';
import List from 'material-ui/lib/lists/list';
import Service from '../service';
import Streams from '../streams';
import history from '../history';
import ListEntity from './list-entity';
import ImageViever from './image-viever';

export default React.createClass({

  getInitialState: function() {
    return { imageToPreview: null, files: null };
  },

  setFilesList: function(files) {
    this.setState(R.objOf('files', files));
  },

  setImage: function(img) {
    this.setState(R.objOf('imageToPreview', img));
  },

  fetchFiles: function(path) {
    Service.getPath(path).then(this.setFilesList);
  },

  componentDidMount: function() {
    history.listen(location => this.fetchFiles(location.query.path));
    Streams.imageToPreview.onValue(this.setImage);
  },

  handleEntityTap: function(entity) {
    if (entity.isFile) {
      Streams.imageToPreview.push('/api/photo?type=preview&path=' + entity.filePath + entity.fileName);
    } else {
      Streams.pathBus.push(entity.filePath + entity.fileName + '/');
    }
  },

  closePreviewRequested: function() {
    Streams.imageToPreview.push(null);
  },

  showImageToPreview: function() {
    return this.state.imageToPreview
      ? <ImageViever imgSrc={this.state.imageToPreview} closeRequested={this.closePreviewRequested} />
      : null;
  },

  render: function() {
    var mapFilesToListItems = function(items) {
      return items.map(function(item, idx) {
        return (<ListEntity key={idx} entity={item} tapHandler={this.handleEntityTap.bind(this, item)} />);
      }.bind(this));
    }.bind(this);

    return (
      <div>
        <List>{ this.state.files ? mapFilesToListItems(this.state.files) : null }</List>
        { this.showImageToPreview() }
      </div>
    );
  },

});
