/* eslint-disable react/no-multi-comp */

import classNames from 'classnames';
import styled, { css } from 'astroturf';
import qsa from 'dom-helpers/query/querySelectorAll';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import * as ReactBootstrap from 'react-bootstrap';
import * as formik from 'formik';
import * as yup from 'yup';
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
  withLive,
} from 'react-live';

import PlaceholderImage from './PlaceholderImage';
import Sonnet from './Sonnet';

const scope = {
  useEffect,
  useRef,
  useState,
  ...ReactBootstrap,
  ReactDOM,
  classNames,
  PropTypes,
  Sonnet,
  formik,
  yup,
  PlaceholderImage,
};

const StyledError = styled(LiveError)`
  composes: alert alert-danger text-monospace from global;

  border-radius: 0;
  border-width: 0.2rem;
  margin-bottom: 0;
  white-space: pre;
`;

const StyledLiveProviderChild = styled.div`
  @import '../css/theme';

  background-color: $body-bg;
  margin-bottom: 3rem;
`;

const StyledEditor = styled(LiveEditor)`
  composes: prism from '../css/prism.module.scss';
  @import '../css/theme';
  font-family: $font-family-monospace !important;

  border-radius: 0 0 8px 8px !important;
`;

const EditorInfoMessage = styled('div')`
  composes: p-2 alert alert-info from global;
  position: absolute;
  top: 0;
  right: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  pointer-events: none;
  font-size: 70%;

  *:not(:focus) + & {
    opacity: 0;
  }
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

let uid = 0;

class Editor extends React.Component {
  state = { ignoreTab: false };

  id = `described-by-${++uid}`;

  handleKeyDown = event => {
    const { key } = event;

    if (this.state.ignoreTab && key !== 'Tab' && key !== 'Shift') {
      if (key === 'Enter') event.preventDefault();
      this.setState({ ignoreTab: false });
    }
    if (!this.state.ignoreTab && key === 'Escape') {
      this.setState({ ignoreTab: true });
    }
  };

  handleFocus = e => {
    if (e.target !== e.currentTarget) return;
    this.setState({
      ignoreTab: !this.mouseDown,
      keyboardFocused: !this.mouseDown,
    });
  };

  handleMouseDown = () => {
    this.mouseDown = true;
    window.setTimeout(() => {
      this.mouseDown = false;
    }, 0);
  };

  render() {
    const { keyboardFocused, ignoreTab } = this.state;
    return (
      <div className="position-relative">
        <StyledEditor
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
          onMouseDown={this.handleMouseDown}
          ignoreTabKey={ignoreTab}
          aria-describedby={this.id}
          aria-label="Example code editor"
          padding={20}
        />
        {(keyboardFocused || !ignoreTab) && (
          <EditorInfoMessage id={this.id} aria-live="polite">
            {ignoreTab ? (
              <>
                Press <kbd>enter</kbd> or type a key to enable tab-to-indent
              </>
            ) : (
              <>
                Press <kbd>esc</kbd> to disable tab trapping
              </>
            )}
          </EditorInfoMessage>
        )}
      </div>
    );
  }
}

const prettierComment = /(\{\s*\/\*\s+prettier-ignore\s+\*\/\s*\})|(\/\/\s+prettier-ignore)/gim;

const { background, foreground } = css`
  @import '../css/theme';

  :export {
    background: $lighter;
    foreground: $subtleOnDark;
  }
`;

const Preview = withLive(
  class extends React.Component {
    constructor() {
      super();

      this.example = null;
    }

    componentDidMount() {
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

    componentDidUpdate(prevProps) {
      if (prevProps.live.element !== this.props.live.element) this.runHolder();
    }

    // prevent links in examples from navigating
    handleClick = e => {
      if (e.target.tagName === 'A') e.preventDefault();
    };

    attachRef = ref => {
      this.example = ref;
      this.runHolder();
    };

    runHolder() {
      if (!this.hjs || !this.example) return;

      this.hjs.run({
        theme: 'gray',
        images: qsa(this.example, 'img'),
      });
    }

    render() {
      const { showCode, className } = this.props;
      return (
        <>
          <StyledExample
            role="region"
            aria-label="Code Example"
            ref={this.attachRef}
            showCode={showCode}
            className={className}
            onClick={this.handleClick}
          >
            <LivePreview />
          </StyledExample>
          <StyledError />
        </>
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
    // Remove the prettier comments and the trailing semicolons in JSX in displayed code.
    const code = codeText
      .replace(prettierComment, '')
      .trim()
      .replace(/>;$/, '>');

    return (
      <LiveProvider
        scope={scope}
        code={code}
        mountStylesheet={false}
        noInline={codeText.includes('render(')}
      >
        <StyledLiveProviderChild>
          <Preview showCode={showCode} className={exampleClassName} />
          {showCode && <Editor onChange={this.handleChange} />}
        </StyledLiveProviderChild>
      </LiveProvider>
    );
  }
}
