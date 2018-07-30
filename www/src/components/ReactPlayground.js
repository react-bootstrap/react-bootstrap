import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import * as ReactBootstrap from 'react-bootstrap';
import * as formik from 'formik';
import yup from 'yup';

import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import PlaceholderImage from './PlaceholderImage';

import Sonnet from './Sonnet';

import '../css/prism.css';

const scope = {
  ...ReactBootstrap,
  ReactDOM,
  classNames,
  PropTypes,
  Sonnet,
  formik,
  yup,
  PlaceholderImage,
  bootstrapUtils: ReactBootstrap.utils.bootstrapUtils,
};

const prettierComment = /(\{\s*\/\*\s+prettier-ignore\s+\*\/\s*\})|(\/\/\s+prettier-ignore)/gim;

export default class Playground extends React.Component {
  static propTypes = {
    codeText: PropTypes.string.isRequired,
  };

  render() {
    const { codeText, exampleClassName } = this.props;

    return (
      <LiveProvider
        code={codeText.replace(prettierComment, '')}
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
