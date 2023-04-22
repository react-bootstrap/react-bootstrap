import React, { useCallback, useContext, useRef, useState } from 'react';
import clsx from 'clsx';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { LiveContext, LiveProvider, LiveEditor, LiveError } from 'react-live';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { usePrismTheme } from '@docusaurus/theme-common';
import type { Props } from '@theme/Playground';
import type { ThemeConfig } from '@docusaurus/theme-live-codeblock';
import CopyButton from '@theme-original/CodeBlock/CopyButton';
import Preview from './Preview';
import EditorInfoMessage from './EditorInfoMessage';

import styles from './styles.module.css';

function Header({ children }: { children: React.ReactNode }) {
  return <div className={clsx(styles.playgroundHeader)}>{children}</div>;
}

function LivePreviewLoader() {
  // Is it worth improving/translating?
  return <div>Loading...</div>;
}

function ResultWithHeader({ className }: any) {
  return (
    <>
      <Header>
        <Translate
          id="theme.Playground.result"
          description="The result label of the live codeblocks"
        >
          Result
        </Translate>
      </Header>
      {/* https://github.com/facebook/docusaurus/issues/5747 */}
      <div className={styles.playgroundPreview}>
        <BrowserOnly fallback={<LivePreviewLoader />}>
          {() => (
            <>
              <Preview className={className} />
              <LiveError />
            </>
          )}
        </BrowserOnly>
      </div>
    </>
  );
}

let uid = 0;

function ThemedLiveEditor() {
  const { code } = useContext(LiveContext);
  const isBrowser = useIsBrowser();
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

  // Hack because LiveEditor doesn't define this type
  const props = {
    ignoreTabKey: ignoreTab,
  };

  const showMessage = keyboardFocused || (focused && !ignoreTab);

  return (
    <div className="position-relative">
      <LiveEditor
        // We force remount the editor on hydration,
        // otherwise dark prism theme is not applied
        key={String(isBrowser)}
        className={styles.playgroundEditor}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        aria-describedby={showMessage ? id : null}
        {...props}
      />
      <div className={clsx(styles.editorToolbar)}>
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
        <div className={styles.buttonGroup}>
          <CopyButton code={code} />
        </div>
      </div>
    </div>
  );
}

function EditorWithHeader() {
  return (
    <>
      <Header>
        <Translate
          id="theme.Playground.liveEditor"
          description="The live editor label of the live codeblocks"
        >
          Live Editor
        </Translate>
      </Header>
      <ThemedLiveEditor />
    </>
  );
}

export default function Playground({
  children,
  transformCode,
  previewClassName,
  ...props
}: Props & { previewClassName?: string }): JSX.Element {
  const {
    siteConfig: { themeConfig },
  } = useDocusaurusContext();
  const {
    liveCodeBlock: { playgroundPosition },
  } = themeConfig as ThemeConfig;
  const prismTheme = usePrismTheme();

  const noInline = props.metastring?.includes('noInline') ?? false;

  return (
    <div className={styles.playgroundContainer}>
      {/* @ts-expect-error: type incompatibility with refs */}
      <LiveProvider
        code={children.replace(/\n$/, '')}
        noInline={noInline}
        transformCode={transformCode ?? ((code) => `${code};`)}
        theme={prismTheme}
        {...props}
      >
        {playgroundPosition === 'top' ? (
          <>
            <ResultWithHeader
              className={clsx('bs-example', previewClassName)}
            />
            <EditorWithHeader />
          </>
        ) : (
          <>
            <EditorWithHeader />
            <ResultWithHeader
              className={clsx('bs-example', previewClassName)}
            />
          </>
        )}
      </LiveProvider>
    </div>
  );
}
