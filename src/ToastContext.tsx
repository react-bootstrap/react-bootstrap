import * as React from 'react';

export interface ToastContextType {
  onClose?: (e?: React.MouseEvent | React.KeyboardEvent) => void;
}

const ToastContext = React.createContext<ToastContextType>({
  onClose() {},
});

export default ToastContext;
