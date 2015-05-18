import React from 'react';

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
      React.findDOMNode(this).children[0]
    );
  }
}
