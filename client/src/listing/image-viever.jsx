import React from 'react';
import { compose, last, split } from 'ramda';

export default React.createClass({

  render: function() {
    return (
      <div
        onClick={this.props.closeRequested}
        className="image-viever">
        <header className="image-viever__header">
          {compose(last, split('/'), decodeURIComponent)(this.props.imgSrc)}
        </header>
        <div className="image-viever__viewport">
          <img
            src={this.props.imgSrc}
            className="image-viever__image" />
        </div>
      </div>
    );
  },

});
