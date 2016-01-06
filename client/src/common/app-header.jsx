import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import { NavigationMenu } from 'material-ui/lib/svg-icons';

export default React.createClass({

  handleHamburger: function() {
    this.props.toggleMenuFn();
  },

  render: function() {
    return (
      <AppBar title="Media viever" iconElementLeft={
          <IconButton onTouchTap={this.handleHamburger}>
            <NavigationMenu />
          </IconButton>
        }
      />
    );
  }

});
