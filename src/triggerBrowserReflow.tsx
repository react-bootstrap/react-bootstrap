// reading a dimension prop will cause the browser to recalculate,
// which will let our animations work
export default function triggerBrowserReflow(node: HTMLElement): void {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  node.offsetHeight;
}
