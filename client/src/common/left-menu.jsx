import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default React.createClass({

  render: function() {
    return (
      <LeftNav
        docked={false}
        width={200}
        open={this.props.menuOpened}
        onRequestChange={this.props.setLeftmenuState}
      >
        <MenuItem>Home</MenuItem>
        <MenuItem>About</MenuItem>
      </LeftNav>
    );
  }

});
