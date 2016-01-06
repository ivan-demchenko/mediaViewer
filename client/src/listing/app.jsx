import React from 'react'
import ReactDOM from 'react-dom'
import Bacon from 'baconjs'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Main from './components/main'
import Streams from './streams'

injectTapEventPlugin();

const appState = Bacon.combineTemplate({
  listing: Streams.listing,
  currentPath: Streams.currentPath,
  imageToPreview: Streams.imageToPreview.startWith(null)
});

appState.onValue((state) => {
  ReactDOM.render(<Main {...state} />, document.getElementById('app'));
});

Streams.currentPath.push('/');
