import React from 'react'
import ReactDOM from 'react-dom'
import Bacon from 'baconjs'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Main from './components/main'
import Streams from './streams'

injectTapEventPlugin();

const appState = Bacon.combineTemplate({
  dirs: Streams.dirs,
  currentPath: Streams.currentPath
});

appState.onValue((state) => {
  ReactDOM.render(<Main {...state} />, document.getElementById('app'));
});

Streams.currentPath.push('/');
