import warning from 'warning';

let warned = {};

function deprecationWarning(oldname, newname, link) {
  let message;

  if (typeof oldname === 'object') {
    message = oldname.message;
  } else {
    message = `${oldname} is deprecated. Use ${newname} instead.`;

    if (link) {
      message += `\nYou can read more about it at ${link}`;
    }
  }

  if (warned[message]) {
    return;
  }

  warning(false, message);
  warned[message] = true;
}

deprecationWarning.wrapper = (Component, ...args) =>
  class DeprecatedComponent extends Component {
    UNSAFE_componentWillMount(...methodArgs) {  // eslint-disable-line
      deprecationWarning(...args);

      if (super.UNSAFE_componentWillMount) {
        super.UNSAFE_componentWillMount(...methodArgs);
      }
    }
  };

export default deprecationWarning;

export function _resetWarned() {
  warned = {};
}
