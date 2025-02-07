import * as React from 'react';

interface ModalContextType {
  onHide: () => void;
}

const ModalContext = React.createContext<ModalContextType>({
  onHide() {},
});

export default ModalContext;
