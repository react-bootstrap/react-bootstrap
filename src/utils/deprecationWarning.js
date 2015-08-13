import warning from 'react/lib/warning';

const warned = {};

export default function deprecationWarning(oldname, newname, link) {
  const warnKey = `${oldname}\n${newname}`;
  if (warned[warnKey]) {
    return;
  }

  let message = `${oldname} is deprecated. Use ${newname} instead.`;

  if (link) {
    message += `\nYou can read more about it at ${link}`;
  }

  warning(false, message);
  warned[warnKey] = true;
}
