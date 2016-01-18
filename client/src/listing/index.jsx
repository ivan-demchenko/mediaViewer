import React from 'react';
import B from 'baconjs';
import R from 'ramda';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import S from '../streams';
import ListEntity from './list-entity';
import ImageViever from './image-viever';
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';

let SelectableList = SelectableContainerEnhance(List);

export default React.createClass({

  getInitialState: function() {
    return {
      files: [],
      imageToPreview: null,
      selectedIndex: 0
    };
  },

  setFilesList: function(files) {
    this.setState(R.objOf('files', files));
  },

  setImage: function(img) {
    this.setState(R.objOf('imageToPreview', img));
  },

  setSelectedIndex: function(idx) {
    this.setState(R.objOf('selectedIndex', idx));
  },

  componentDidMount: function() {
    S.listing.onValue(this.setFilesList);
    S.selectedIndex.onValue(this.setSelectedIndex);
    S.imageToPreview.onValue(this.setImage);
  },

  closePreviewRequested: function() {
    S.imageToPreview.push(null);
  },

  handleRequestChange: function(e, idx) {
    S.tappedItem.push(this.state.files[idx]);
  },

  render: function() {
    const mapFilesToListItems = (items) => items.map(
      (x, i) => <ListItem key={i} value={i} primaryText={x.fileName} />
    );

    return (
      <div>
        { this.state.files.length
          ? <SelectableList valueLink={{value: this.state.selectedIndex, requestChange: this.handleRequestChange}}>
            { mapFilesToListItems(this.state.files) }
            </SelectableList>
          : null
        }
        { this.state.imageToPreview
          ? <ImageViever imgSrc={this.state.imageToPreview} closeRequested={this.closePreviewRequested} />
          : null
        }
      </div>
    );
  },

});
