import React from 'react'
import R from 'ramda'
import Service from '../service'
import List from 'material-ui/lib/lists/list'
import Streams from '../streams'
import ListEntity from './list-entity'
import ImageViever from './image-viever'

export default React.createClass({

  getInitialState: function() {
    return { imageToPreview: '' };
  },

  handleEntityTap: function(entity) {
    if (entity.isFile) {
      Streams.imageToPreview.push('/photo?type=preview&path=' + encodeURIComponent(entity.filePath));
    } else {
      Streams.currentPath.push(entity.filePath + '/');
    }
  },

  handleBackBtn: function() {
    var ops = this.props.currentPath.split('/');
    var backPath = R.compose(R.join('/'), R.take(ops.length - 2))(ops) + '/';
    Streams.currentPath.push(backPath);
  },

  closePreviewRequested: function() {
    Streams.imageToPreview.push(null);
  },

  render: function() {
    return (
      <div>
        <List>
          {this.props.listing.map(function(entity, idx) {
            return <ListEntity key={idx} entity={entity}
              tapHandler={this.handleEntityTap.bind(this, entity)} />
          }.bind(this))}
        </List>
        { this.props.imageToPreview
          ? <ImageViever
              imgSrc={this.props.imageToPreview}
              closeRequested={this.closePreviewRequested} />
          : null }
      </div>
    );
  },

});
