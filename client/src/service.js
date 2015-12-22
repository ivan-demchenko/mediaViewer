export default {
  getPath: (p) => fetch('/ls?path=' + p).then((res) => res.json())
}
