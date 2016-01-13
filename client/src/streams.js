import B from 'baconjs';
import R from 'ramda';
import S from './service';
import history from './history';

const buildPath = R.compose(R.join(''), R.prepend('?'), R.join('&'), R.map(R.join('=')));

const imageToPreview = new B.Bus();
const globalKeyUp = B.fromEvent(window.document.body, 'keyup').map('.which');
const escKey = globalKeyUp.filter(27);
imageToPreview.plug(escKey.map(null));

const pathBus = new B.Bus();
const fetchedListing = pathBus.flatMap(R.compose(B.fromPromise, S.getPath));
const pathAndListing = B.combineTemplate({
  path: pathBus,
  files: fetchedListing
});
pathAndListing.map(R.identity).onValue(function(combined) {
  history.push({
    pathname: '/ls',
    search: buildPath([ ['path', combined.path] ])
  });
});

export default {
  escKey: escKey,
  listing: pathAndListing,
  pathBus: pathBus,
  imageToPreview: imageToPreview
};
