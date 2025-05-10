import * as React from 'react';

interface ModalContextType {
  onHide: () => void;
}

const ModalContext = React.createContext<ModalContextType>({
  onHide() {},
});

ModalContext.displayName = 'ModalContext';

export default ModalContext;
