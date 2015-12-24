import Bacon from 'baconjs'
import R from 'ramda'
import S from './service'

const currPathBus = new Bacon.Bus();
const imageToPreview = new Bacon.Bus();

export default {
  listing: currPathBus.flatMap(R.compose(Bacon.fromPromise, S.getPath)),
  currentPath: currPathBus,
  imageToPreview: imageToPreview
}
