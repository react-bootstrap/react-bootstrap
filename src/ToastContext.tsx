import * as React from 'react';

export interface ToastContextType {
  onClose?: (e?: React.MouseEvent | React.KeyboardEvent) => void;
}

const ToastContext = React.createContext<ToastContextType>({
  onClose() {},
});

ToastContext.displayName = 'ToastContext';

export default ToastContext;
