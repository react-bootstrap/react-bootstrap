import styled, { css } from 'astroturf';
import classNames from 'classnames';
import qsa from 'dom-helpers/querySelectorAll';
import * as formik from 'formik';
import PropTypes from 'prop-types';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import ReactDOM from 'react-dom';
import {
  LiveContext,
  LiveEditor,
  LiveError,
  LivePreview,
  LiveProvider,
} from 'react-live';
import * as yup from 'yup';
import useIsomorphicEffect from '@restart/hooks/useIsomorphicEffect';
import useMutationObserver from '@restart/hooks/useMutationObserver';
import PlaceholderImage from './PlaceholderImage';
import Sonnet from './Sonnet';

const scope = {
  useEffect,
  useRef,
  useState,
  useContext,
  ...ReactBootstrap,
  ReactDOM,
  classNames,
  PropTypes,
  Sonnet,
  formik,
  yup,
  PlaceholderImage,
};

const StyledContainer = styled('div')`
  @import '../css/theme';

  position: relative;
  margin-bottom: 3rem;
  background-color: $body-bg;
`;

const StyledExample = styled('div')`
  @import '../css/theme';

  composes: bs-example from global;

  position: relative;
  padding: 1rem;
  border-style: solid;
  border-color: rgb(236, 236, 236);
  border-width: 0.2rem;
  border-radius: 8px;
  margin-right: 0;
  margin-left: 0;
  color: $body-color;

  &.show-code {
    border-width: 0.2rem 0.2rem 0 0.2rem;
    border-radius: 8px 8px 0 0;
  }

  :global {
    .react-live-preview::after {
      display: block;
      clear: both;
      content: '';
    }
  }
`;

const StyledError = styled(LiveError)`
  composes: alert alert-danger text-monospace from global;

  border-radius: 0;
  border-width: 0.2rem;
  margin-bottom: 0;
  white-space: pre;
`;

const { background, foreground, fontFamily } = css`
  @import '../css/theme';

  :export {
    background: $lighter;
    foreground: $subtle-on-dark;
    font-family: $font-family-base;
  }
`;

function Preview({ showCode, className }) {
  const exampleRef = useRef();
  const [hjs, setHjs] = useState(null);
  const live = useContext(LiveContext);

  useEffect(() => {
    import('holderjs').then(({ default: hjs_ }) => {
      hjs_.addTheme('gray', {
        bg: background,
        fg: foreground,
        font: fontFamily,
        fontweight: 'normal',
      });

      setHjs(hjs_);
    });
  }, []);

  useIsomorphicEffect(() => {
    if (!hjs) {
      return;
    }

    hjs.run({
      theme: 'gray',
      images: qsa(exampleRef.current, 'img'),
    });
  }, [hjs, live.element]);

  useMutationObserver(exampleRef.current, {
    childList: true, subtree: true },
    (mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          hjs.run({
            theme: 'gray',
            images: qsa(exampleRef.current, 'img'),
          });
        }
      });
    });

  const handleClick = useCallback((e) => {
    if (e.target.tagName === 'A') {
      e.preventDefault();
    }
  }, []);

  return (
    <>
      <StyledExample
        ref={exampleRef}
        role="region"
        aria-label="Code Example"
        showCode={showCode}
        className={className}
        onClick={handleClick}
      >
        <LivePreview />
      </StyledExample>
      <StyledError />
    </>
  );
}

const StyledEditor = styled(LiveEditor)`
  composes: prism from '../css/prism.module.scss';

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
  font-size: 70%;
  pointer-events: none;
`;

let uid = 0;

function Editor() {
  const [focused, setFocused] = useState(false);
  const [ignoreTab, setIgnoreTab] = useState(false);
  const [keyboardFocused, setKeyboardFocused] = useState(false);
  const mouseDownRef = useRef(false);

  const idRef = useRef(null);
  if (idRef.current === null) idRef.current = `described-by-${++uid}`;
  const id = idRef.current;

  const handleKeyDown = useCallback(
    (e) => {
      if (ignoreTab) {
        if (e.key !== 'Tab' && e.key !== 'Shift') {
          if (e.key === 'Enter') e.preventDefault();
          setIgnoreTab(false);
        }
      } else if (e.key === 'Escape') {
        setIgnoreTab(true);
      }
    },
    [ignoreTab],
  );

  const handleFocus = useCallback(() => {
    setFocused(true);
    setIgnoreTab(!mouseDownRef.current);
    setKeyboardFocused(!mouseDownRef.current);
  }, []);

  const handleBlur = useCallback(() => {
    setFocused(false);
  }, []);

  const handleMouseDown = useCallback(() => {
    mouseDownRef.current = true;
    window.setTimeout(() => {
      mouseDownRef.current = false;
    });
  }, []);

  const showMessage = keyboardFocused || (focused && !ignoreTab);

  return (
    <div className="position-relative">
      <StyledEditor
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        ignoreTabKey={ignoreTab}
        aria-describedby={showMessage ? id : null}
        aria-label="Example code editor"
        padding={20}
      />
      {showMessage && (
        <EditorInfoMessage id={id} aria-live="polite">
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

const PRETTIER_IGNORE_REGEX = /({\s*\/\*\s+prettier-ignore\s+\*\/\s*})|(\/\/\s+prettier-ignore)/gim;

const propTypes = {
  codeText: PropTypes.string.isRequired,
};

function Playground({ codeText, exampleClassName, showCode = true }) {
  // Remove Prettier comments and trailing semicolons in JSX in displayed code.
  const code = codeText
    .replace(PRETTIER_IGNORE_REGEX, '')
    .trim()
    .replace(/>;$/, '>');

  return (
    <StyledContainer>
      <LiveProvider
        scope={scope}
        code={code}
        mountStylesheet={false}
        noInline={codeText.includes('render(')}
      >
        <Preview showCode={showCode} className={exampleClassName} />
        {showCode && <Editor />}
      </LiveProvider>
    </StyledContainer>
  );
}

Playground.propTypes = propTypes;

export default Playground;
