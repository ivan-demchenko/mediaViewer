import React from 'react'
import R from 'ramda'

export default React.createClass({

  render: function() {
    return(
      <div onClick={this.props.closeRequested} className="image-viever">
        <header className="image-viever__header">
          {R.compose(R.last, R.split('/'))(this.props.imgSrc)}
        </header>
        <img src={this.props.imgSrc} className="image-viever__image" />
      </div>
    );
  }

});
