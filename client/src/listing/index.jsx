import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Folder from 'material-ui/lib/svg-icons/file/folder';
import Avatar from 'material-ui/lib/avatar';
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';
import ListEntity from './list-entity';
import ImageViever from './image-viever';
import S from '../streams';

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
    S.tappedItem.push(this.state.files[idx-1]);
  },

  render: function() {
    const getPicPath = x => '/api/photo?type=thumb&path=' + encodeURIComponent(x.filePath + '/' + x.fileName)
    const mapEntityToListItem = value => entity => entity.isFile
      ? <ListItem
        key={value}
        value={value}
        primaryText={entity.fileName}
        leftAvatar={<Avatar src={getPicPath(entity)} />} />
      : <ListItem
        key={value}
        value={value}
        primaryText={entity.fileName}
        leftIcon={<Folder />} />

    const mapFilesToListItems = (items) => items.map(
      (x, i) => mapEntityToListItem(i+1)(x)
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
