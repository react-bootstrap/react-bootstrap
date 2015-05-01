function warn(message) {
  if (window.console && (typeof console.warn === 'function')) {
    console.warn(message);
  }
}

export default function deprecationWarning(oldname, newname, link) {
  if (process.env.NODE_ENV !== 'production') {
    let message = `${oldname} is deprecated. Use ${newname} instead.`;
    warn(message);

    if (link) {
      warn(`You can read more about it here ${link}`);
    }
  }
}
