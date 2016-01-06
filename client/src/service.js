export default {
  getPath: (base, path) => {
    return fetch(`/ls?basepath=${base}&path=${path}`)
      .then((res) => res.json());
  }
};
