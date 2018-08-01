import classNames from 'classnames';
import { styled } from 'css-literal-loader/styled';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import * as ReactBootstrap from 'react-bootstrap';
import * as formik from 'formik';
import yup from 'yup';

import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import PlaceholderImage from './PlaceholderImage';

import Sonnet from './Sonnet';

const StyledProvider = styled(LiveProvider)`
  @import '../css/theme';

  background-color: $body-bg;
  margin-bottom: 3rem;
`;

const Example = styled('div')`
  @import '../css/theme';

  composes: bs-example from global;

  position: relative;
  color: $body-color;
  padding: 1rem;
  border-style: solid;
  border-color: rgb(236, 236, 236);
  border-width: 0.2rem 0 0;

  @include media-breakpoint-up(md) {
    margin-right: 0;
    margin-left: 0;
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

export default class Playground extends React.Component {
  static propTypes = {
    codeText: PropTypes.string.isRequired,
  };

  render() {
    const { codeText, exampleClassName } = this.props;

    return (
      <StyledProvider
        code={codeText.replace(prettierComment, '')}
        scope={scope}
        mountStylesheet={false}
        noInline={codeText.includes('render(')}
      >
        <Example className={exampleClassName}>
          <LivePreview />
          <LiveError />
        </Example>

        <CodeEditor />
      </StyledProvider>
    );
  }
}
