import * as React from 'react';

export interface ToastContextType {
  onClose?: (e?: React.MouseEvent | React.KeyboardEvent) => void;
}

const ToastContext = React.createContext<ToastContextType>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose() {},
});

export default ToastContext;
