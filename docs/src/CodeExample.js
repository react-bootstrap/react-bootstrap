import React from 'react';
import ReactDOM from 'react-dom';

export default class CodeExample extends React.Component {
  render() {
    return (
      <pre className="cm-s-solarized cm-s-light">
        <code>
          {this.props.codeText}
        </code>
      </pre>
    );
  }

  componentDidMount() {
    if (CodeMirror === undefined) {
      return;
    }

    CodeMirror.runMode(
      this.props.codeText,
      this.props.mode,
      ReactDOM.findDOMNode(this).children[0]
    );
  }
}
