import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import history from '../history';

export default React.createClass({

  navigate: function(to) {
    this.props.setLeftMenuState(false);
    history.push({ pathname: to });
  },

  render: function() {
    return (
      <LeftNav
        docked={false}
        width={200}
        open={this.props.menuOpened}
        onRequestChange={this.props.setLeftMenuState}
      >
        <MenuItem onTouchTap={this.navigate.bind(this, '/')}>Home</MenuItem>
        <MenuItem onTouchTap={this.navigate.bind(this, '/about')}>About</MenuItem>
      </LeftNav>
    );
  },

});
