import R from 'ramda';

const toJson = R.invoker(0, 'json');

export default {

  getHomeItems: () => {
    return fetch(`/home-items`).then(toJson);
  },

  getPath: (path) => {
    return fetch(`/ls?path=${path}`).then(toJson);
  }

};
