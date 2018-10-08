// reading a dimension prop will cause the browser to recalculate,
// which will let our animations work
export default function triggerBrowserReflow(node) {
  node.offsetHeight; // eslint-disable-line no-unused-expressions
}
