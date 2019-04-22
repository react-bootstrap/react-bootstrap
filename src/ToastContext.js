import React from 'react';

const ToastContext = React.createContext({
  onClose() {},
  hiddenByAutohide: false,
});

export default ToastContext;
