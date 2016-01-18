import R from 'ramda';

const toJson = R.invoker(0, 'json');

export default {

  getHomeItems: () => {
    return fetch(`/api/home-items`).then(toJson);
  },

  getPath: (path) => {
    if (path) {
      return fetch(`/api/ls?path=${path}`).then(toJson);
    }
    return new Promise((res) => res([]));
  },

};
