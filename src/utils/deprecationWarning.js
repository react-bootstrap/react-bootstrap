export default function deprecationWarning(oldname, newname) {
  if (process.env.NODE_ENV !== 'production') {
    let message = `${oldname} is deprecated. Use ${newname} instead.`;
    console.warn(message);
    let link = 'https://github.com/react-bootstrap/react-bootstrap/issues/425#issuecomment-97110963';
    console.warn(`You can read more about it here ${link}`);
  }
}
