import * as React from 'react';

// TODO: check
export interface ToastContextType {
  onClose?: (e: Event) => void;
}

const ToastContext = React.createContext<ToastContextType>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose() {},
});

export default ToastContext;
