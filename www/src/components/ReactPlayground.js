import classNames from 'classnames';
import { css, styled } from 'css-literal-loader/styled';
import qsa from 'dom-helpers/query/querySelectorAll';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import * as ReactBootstrap from 'react-bootstrap';
import * as formik from 'formik';
import yup from 'yup';

import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
  withLive,
} from 'react-live';
import PlaceholderImage from './PlaceholderImage';

import Sonnet from './Sonnet';

const { background, foreground } = css`
  @import '../css/theme';

  :export {
    background: $lighter;
    foreground: $subtleOnDark;
  }
`;

const StyledProvider = styled(LiveProvider)`
  @import '../css/theme';

  background-color: $body-bg;
  margin-bottom: 3rem;
`;

const StyledExample = styled('div')`
  @import '../css/theme';

  composes: bs-example from global;

  position: relative;
  color: $body-color;
  padding: 1rem;
  border-style: solid;
  border-color: rgb(236, 236, 236);
  margin-right: 0;
  margin-left: 0;
  border-width: 0.2rem;
  border-radius: 8px;

  &.show-code {
    border-width: 0.2rem 0.2rem 0 0.2rem;
    border-radius: 8px 8px 0 0;
  }

  :global {
    .badge + .badge,
    .btn-toolbar > * + * {
      margin-left: 0.5em;
    }

    & .btn-toolbar + .btn-toolbar {
      margin-top: 10px;
    }

    .react-live-preview::after {
      display: block;
      clear: both;
      content: '';
    }
  }
`;

const CodeEditor = styled(LiveEditor)`
  composes: prism from '../css/prism.module.scss';

  border-radius: 0 0 8px 8px;
`;

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

const Example = withLive(
  class extends React.Component {
    constructor() {
      super();

      this.example = React.createRef();

      import('holderjs').then(({ default: hjs }) => {
        this.hjs = hjs;
        hjs.addTheme('gray', {
          bg: background,
          fg: foreground,
          font: 'Helvetica',
          fontweight: 'normal',
        });
        this.runHolder();
      });
    }

    componentDidUpdate = prevProps => {
      if (prevProps.live.element !== this.props.live.element) this.runHolder();
    };

    runHolder() {
      if (!this.hjs || !this.example.current) return;
      this.hjs.run({
        theme: 'gray',
        images: qsa(this.example.current, 'img'),
      });
    }
    // prevent links in examples from navigating
    handleClick = e => {
      if (e.target.tagName === 'A') e.preventDefault();
    };

    render() {
      const { showCode, className } = this.props;
      return (
        <StyledExample
          ref={this.example}
          showCode={showCode}
          className={className}
          onClick={this.handleClick}
        >
          <LivePreview />
          <LiveError />
        </StyledExample>
      );
    }
  },
);

// eslint-disable-next-line react/no-multi-comp
export default class Playground extends React.Component {
  static propTypes = {
    codeText: PropTypes.string.isRequired,
  };

  render() {
    const { codeText, exampleClassName, showCode = true } = this.props;

    return (
      <StyledProvider
        scope={scope}
        code={codeText.replace(prettierComment, '')}
        mountStylesheet={false}
        noInline={codeText.includes('render(')}
      >
        <Example showCode={showCode} className={exampleClassName} />
        {showCode && <CodeEditor onChange={this.handleChange} />}
      </StyledProvider>
    );
  }
}
