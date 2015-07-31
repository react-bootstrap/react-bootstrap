import warning from 'react/lib/warning';

export default function deprecationWarning(oldname, newname, link) {
  let message = `${oldname} is deprecated. Use ${newname} instead.`;

  if (link) {
    message += `\nYou can read more about it at ${link}`;
  }

  warning(false, message);
}
