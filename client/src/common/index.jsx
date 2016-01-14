import React from 'react';
import LeftMenu from './left-menu';
import AppHeader from './app-header';

export default React.createClass({

  getInitialState: function() {
    return { menuOpened: false };
  },

  toggleMenu: function() {
    this.setState({ menuOpened: !this.state.menuOpened });
  },

  setLeftNavState: function(opened) {
    this.setState({ menuOpened: opened });
  },

  render: function() {
    return (
      <div>
        <AppHeader toggleMenuFn={this.toggleMenu} />
        <LeftMenu menuOpened={this.state.menuOpened} setLeftMenuState={this.setLeftNavState} />
        {this.props.children}
      </div>
    );
  }

});
