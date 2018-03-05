import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import * as ReactBootstrap from 'react-bootstrap';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

import Sonnet from './Sonnet';

import '../css/prism.css';

const scope = {
  ...ReactBootstrap,
  ReactDOM,
  classNames,
  PropTypes,
  Sonnet,
  bootstrapUtils: ReactBootstrap.utils.bootstrapUtils
};

export default class Playground extends React.Component {
  static propTypes = {
    codeText: PropTypes.string.isRequired
  };

  render() {
    const { codeText, exampleClassName } = this.props;

    return (
      <LiveProvider
        code={codeText}
        scope={scope}
        mountStylesheet={false}
        noInline={codeText.includes('render(')}
      >
        <div className={classNames('bs-example', exampleClassName)}>
          <LivePreview />
          <LiveError />
        </div>
        <div className="bs-code-editor">
          <LiveEditor />
        </div>
      </LiveProvider>
    );
  }
}
