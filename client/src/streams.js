import B from 'baconjs';
import R from 'ramda';
import S from './service';
import H from './app-history';

const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

const pathToHistoryObj = x => {
  return { pathname: '/ls', search: '?path=' + x };
};

const imageToPreview = new B.Bus();
const path = new B.Bus();
const tappedItem = new B.Bus();

const listing = path
.map(pathToHistoryObj)
.doAction(H.push)
.map(x => x.search.substr(6))
.flatMap(R.compose(B.fromPromise, S.getPath))
.toProperty([]);

const globalKeyUp = B.fromEvent(window.document.body, 'keyup').doAction(e => e.preventDefault()).map('.which');
const escKey = globalKeyUp.filter(R.equals(27));
const enterKey = globalKeyUp.filter(R.equals(13));
const upOrDown = globalKeyUp.filter(R.equals(KEY_LEFT)).map(-1)
.merge(
  globalKeyUp.filter(R.equals(KEY_RIGHT)).map(1)
).startWith(0);

imageToPreview.plug(escKey.map(null).startWith(null));

const selectedIndex = B.update(0,
  [listing, upOrDown], (prev, list, inc) => {
    let max = list.length;
    let curr = prev + inc;
    return (curr > max ? 0 : (curr < 0 ? max : curr));
  }
).startWith(0);

const nextItem = B.update(null,
  [listing, enterKey, selectedIndex], (prev, list, enter, idx) => {
    return list[idx];
  }
).changes().merge(tappedItem).onValue((nextOne) => {
  if (nextOne) {
    if (nextOne.isFile) {
      imageToPreview.push('/api/photo?type=preview&path=' + nextOne.filePath + '/' + nextOne.fileName);
    } else {
      imageToPreview.push(null);
      path.push(nextOne.filePath + '/' + nextOne.fileName);
    }
  }
});

export default {
  listing: listing,
  selectedIndex: selectedIndex,
  imageToPreview: imageToPreview,
  nextItem: nextItem,
  path: path,
  tappedItem: tappedItem,
};
