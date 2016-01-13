import React from 'react';
import R from 'ramda';
import Service from '../service';
import List from 'material-ui/lib/lists/list';
import Streams from '../streams';
import ListEntity from './list-entity';
import ImageViever from './image-viever';

export default React.createClass({

  getInitialState: function() {
    return {
      imageToPreview: null,
      files: [],
      path: {}
    };
  },

  componentDidMount: function() {
    this.props.route.dataStream.onValue(function(val) {
      this.setState({ files: val.files, path: val.path });
    }.bind(this));
  },

  handleEntityTap: function(entity) {
    if (entity.isFile) {
      Streams.imageToPreview.push(entity.fileName);
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
        <List>{ this.state.files.length ? mapFilesToListItems(this.state.files) : null }</List>
        { this.showImageToPreview() }
      </div>
    );
  },

});
