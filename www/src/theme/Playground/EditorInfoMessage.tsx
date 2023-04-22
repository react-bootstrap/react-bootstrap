import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const EditorInfoMessage: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props,
) => (
  <div
    className={clsx('alert alert-info p-2', styles.editorInfoMessage)}
    {...props}
  />
);

EditorInfoMessage.displayName = 'EditorInfoMessage';

export default EditorInfoMessage;
