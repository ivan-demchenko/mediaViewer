import { Bus, fromEvent, fromPromise, update } from 'baconjs';
import { compose, merge, objOf, concat, equals, anyPass } from 'ramda';
import S from './service';
import H from './app-history';

const toHistoryObj = compose(merge({ pathname: '/ls' }), objOf('search'), concat('?path='));

const isEnter = equals(13);
const isEscape = equals(27);
const isNext = anyPass([equals(39), equals(40)]);
const isPrev = anyPass([equals(37), equals(38)]);

const imageToPreview = new Bus();
const path = new Bus();
const tappedItem = new Bus();
const restoredPath = new Bus();
H.listen(x => {
  if (x.pathname === '/ls') restoredPath.push(x.search.substr(6));
});

path.map(toHistoryObj).onValue(H.push);

const listing = path.merge(restoredPath).skipDuplicates().flatMapLatest(compose(fromPromise, S.getPath)).toProperty([]);
const globalKeyUp = fromEvent(window.document.body, 'keyup').doAction(x => x.preventDefault()).map('.which');
const escKey = globalKeyUp.filter(isEscape);
const enterKey = globalKeyUp.filter(isEnter);
const upAndDown = globalKeyUp.filter(isPrev).map(-1).merge(globalKeyUp.filter(isNext).map(1)).startWith(0);

imageToPreview.plug(escKey.map(null).startWith(null));

const selectedIndex = update(1,
  [listing, upAndDown], (prev, list, inc) => {
    let max = list.length;
    let curr = prev + inc;
    return (curr > max ? 1 : (curr < 1 ? max : curr));
  }
).startWith(1);

const nextItem = update(null,
  [listing, enterKey, selectedIndex], (prev, list, enter, idx) => list[idx-1]
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
