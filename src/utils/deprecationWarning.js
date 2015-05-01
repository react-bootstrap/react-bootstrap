export default function deprecationWarning(oldname, newname, link) {
  if (process.env.NODE_ENV !== 'production') {
    if (!window.console && (typeof console.warn !== 'function')) {
      return;
    }

    let message = `${oldname} is deprecated. Use ${newname} instead.`;
    console.warn(message);

    if (link) {
      console.warn(`You can read more about it here ${link}`);
    }
  }
}
