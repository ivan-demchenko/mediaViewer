import Bacon from 'baconjs'
import R from 'ramda'
import S from './service'

const currPathBus = new Bacon.Bus();
const imageToPreview = new Bacon.Bus();

const globalKeyUp = Bacon.fromEvent(window.document.body, 'keyup').map('.which');
const escKey = globalKeyUp.filter(27);

imageToPreview.plug(escKey.map(null));

export default {
  listing: currPathBus.flatMap(R.compose(Bacon.fromPromise, S.getPath)),
  currentPath: currPathBus,
  imageToPreview: imageToPreview
}
