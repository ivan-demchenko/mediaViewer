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

  componentDidMount: function() {
    this.unSubListing = S.listing.onValue(x => this.setState({ files: x }));
    this.unSubSelectedIndex = S.selectedIndex.onValue(x => this.setState({ selectedIndex: x }));
    this.unSubImageToPreview = S.imageToPreview.onValue(x => this.setState({ imageToPreview: x }));
  },

  componentWillUnmount: function() {
    this.unSubListing();
    this.unSubSelectedIndex();
    this.unSubImageToPreview();
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

    const valueLinkSettings = {
      value: this.state.selectedIndex,
      requestChange: this.handleRequestChange
    };

    return (
      <div>
        { this.state.files.length
          ? <SelectableList valueLink={valueLinkSettings}>
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
