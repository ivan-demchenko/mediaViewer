import B from 'baconjs';
import R from 'ramda';
import S from './service';
import H from './app-history';

const isLeft = R.equals(37);
const isUp = R.equals(38);
const isRight = R.equals(39);
const isDown = R.equals(40);
const isEnter = R.equals(13);
const isEscape = R.equals(27);
const isNext = R.anyPass([isRight, isDown]);
const isPrev = R.anyPass([isLeft, isUp]);

const pathToHistoryObj = x => {
  return { pathname: '/ls', search: '?path=' + x };
};

const imageToPreview = new B.Bus();
const path = new B.Bus();
const tappedItem = new B.Bus();
const restoredPath = B.fromBinder((sink) => {
  let unlisten = H.listen(x => {
    sink(new B.Next(x.search.substr(6)));
    sink(new B.End());
    return () => unlisten();
  });
});

path.map(pathToHistoryObj).onValue(H.push);
const listing = path.merge(restoredPath).flatMapLatest(R.compose(B.fromPromise, S.getPath)).toProperty([]);

const globalKeyUp = B.fromEvent(window.document.body, 'keyup').doAction(x => x.preventDefault()).map('.which');
const escKey = globalKeyUp.filter(isEscape);
const enterKey = globalKeyUp.filter(isEnter);
const upAndDown = globalKeyUp.filter(isPrev).map(-1).merge(globalKeyUp.filter(isNext).map(1)).startWith(0);

imageToPreview.plug(escKey.map(null).startWith(null));

const selectedIndex = B.update(0,
  [listing, upAndDown], (prev, list, inc) => {
    let max = list.length;
    let curr = prev + inc;
    return (curr > max ? 0 : (curr < 0 ? max : curr));
  }
).startWith(0);

const nextItem = B.update(null,
  [listing, enterKey, selectedIndex], (prev, list, enter, idx) => list[idx]
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
